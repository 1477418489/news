(function initThemeModule(globalScope, factory) {
  const theme = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = theme;
  }

  if (typeof document === "undefined") return;

  let storage = null;
  try {
    storage = globalScope.localStorage;
  } catch {}

  theme.applyTheme(
    document.documentElement,
    theme.readStoredTheme(storage),
    document
  );

  const bind = () => theme.bindThemeToggle(document, storage);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})(typeof window !== "undefined" ? window : globalThis, function createThemeController() {
  const STORAGE_KEY = "news-theme";
  const THEME_COLORS = {
    light: "#f4f6f5",
    dark: "#181b1a",
  };

  function normalizeTheme(value) {
    return value === "dark" ? "dark" : "light";
  }

  function readStoredTheme(storage) {
    try {
      return normalizeTheme(storage?.getItem(STORAGE_KEY));
    } catch {
      return "light";
    }
  }

  function writeStoredTheme(storage, theme) {
    try {
      storage?.setItem(STORAGE_KEY, normalizeTheme(theme));
    } catch {}
  }

  function applyTheme(root, value, doc) {
    const theme = normalizeTheme(value);
    if (root) {
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
    }

    const meta = doc?.querySelector?.('meta[name="theme-color"]');
    meta?.setAttribute?.("content", THEME_COLORS[theme]);
    return theme;
  }

  function bindThemeToggle(doc, storage) {
    const toggle = doc?.getElementById?.("themeToggle");
    if (!toggle) return null;

    const current = applyTheme(doc.documentElement, readStoredTheme(storage), doc);
    toggle.checked = current === "dark";
    toggle.addEventListener("change", () => {
      const next = toggle.checked ? "dark" : "light";
      applyTheme(doc.documentElement, next, doc);
      writeStoredTheme(storage, next);
    });
    return toggle;
  }

  return {
    STORAGE_KEY,
    normalizeTheme,
    readStoredTheme,
    applyTheme,
    bindThemeToggle,
  };
});
