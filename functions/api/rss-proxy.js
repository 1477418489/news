/**
 * Cloudflare Pages Function · RSS 同源代理
 * 路由：/api/rss-proxy?url=<encodeURIComponent(feedUrl)>
 */
const MAX_BYTES = 2 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 12000;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=120",
      "access-control-allow-origin": "*",
    },
  });
}

function isPrivateHost(hostname) {
  const h = String(hostname || "").toLowerCase();
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local")) return true;
  const m = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (m) {
    const a = +m[1], b = +m[2];
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }
  if (h === "::1" || h.startsWith("fc") || h.startsWith("fd") || h.startsWith("fe80")) return true;
  return false;
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "Content-Type",
      "access-control-max-age": "86400",
    },
  });
}

export async function onRequestGet(context) {
  try {
    const reqUrl = new URL(context.request.url);
    const raw = reqUrl.searchParams.get("url") || "";
    if (!raw) return json(400, { ok: false, message: "missing url" });

    let target;
    try { target = new URL(raw); } catch { return json(400, { ok: false, message: "invalid url" }); }

    if (target.protocol !== "http:" && target.protocol !== "https:") {
      return json(400, { ok: false, message: "only http/https allowed" });
    }
    if (isPrivateHost(target.hostname)) {
      return json(400, { ok: false, message: "private/local hosts blocked" });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let upstream;
    try {
      upstream = await fetch(target.href, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
          "User-Agent": "news-rss-proxy/1.0 (+Cloudflare Pages)",
        },
      });
    } finally {
      clearTimeout(timer);
    }

    const buf = await upstream.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) return json(413, { ok: false, message: "feed too large" });

    const contentType = upstream.headers.get("content-type") || "application/xml; charset=utf-8";
    return new Response(buf, {
      status: upstream.ok ? 200 : upstream.status,
      headers: {
        "content-type": contentType.includes("json") ? contentType : "application/xml; charset=utf-8",
        "cache-control": "public, max-age=120",
        "access-control-allow-origin": "*",
        "x-proxy-status": String(upstream.status),
        "x-proxy-url": target.href,
      },
    });
  } catch (e) {
    const msg = e?.name === "AbortError" ? "upstream timeout" : (e?.message || "proxy failed");
    return json(502, { ok: false, message: msg });
  }
}
