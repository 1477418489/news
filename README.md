# 今日读世界

静态资讯聚合页，对接 [60s API](https://github.com/vikiboss/60s)。

## 最常改：`config.js`

**版本号** 和 **RSS 源** 已集中到仓库根目录的 [`config.js`](./config.js)，改完推送后 Cloudflare Pages 自动部署即可。

```js
window.APP_CONFIG = {
  VERSION: "1.1.0",          // 侧栏 + 标题展示
  API_BASE: "https://...",   // 一般不用动
  RSS_FEEDS: [ /* 订阅源 */ ],
};
```

### 改版本号

打开 `config.js`，修改：

```js
VERSION: "1.1.1",
```

### 增删 RSS

在 `config.js` 的 `RSS_FEEDS` 数组里增删对象：

```js
{
  id: "my-feed",
  name: "示例源",
  url: "https://example.com/feed.xml",
  home: "https://example.com",
  desc: "说明",
}
```

> 不要再去改 `index.html` 找这两项。

## 功能

- 今日概览 / 全网热榜 / 科技资讯
- RSS 订阅（源码配置于 `config.js`）
- 每日一刻 / 影音娱乐 / 财经生活 / 天气 / 实用工具


## RSS 与 CORS

浏览器无法直接读取多数第三方 RSS（无 CORS）。部署到 Cloudflare Pages 后，页面会走同源代理：

- 前端请求：`/api/rss-proxy?url=...`
- 实现文件：`functions/api/rss-proxy.js`（Pages Functions，无需额外配置）

本地用 `python -m http.server` 预览时没有该函数，RSS 可能仍因 CORS 失败；以 Cloudflare 线上为准。

## 本地预览

```bash
npx --yes serve .
# 或
python -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 部署到 Cloudflare Pages（GitHub）

1. 将本仓库推送到 GitHub
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选择本仓库，构建配置：
   - **Framework preset**: None
   - **Build command**: 留空
   - **Build output directory**: `/`（仓库根目录）
4. 保存并部署

后续每次 push 到默认分支会自动发布。

### 可选：自定义域名

Pages 项目 → **Custom domains** 绑定域名并按提示配置 DNS。

## 版本记录

| 版本 | 说明 |
|------|------|
| 1.1.1 | RSS 同源代理，修复第三方 Feed CORS
| 1.1.0 | 配置外置到 `config.js`；主题优化；天气图标；翻译下拉；精简 RSS |
| 1.0.0 | 初版单页资讯聚合 |
