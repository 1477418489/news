/**
 * ============================================================
 *  今日读世界 · 常用配置（优先改这个文件）
 * ------------------------------------------------------------
 *  改动频率最高的两项：
 *    1) VERSION   前端版本号（侧栏 + 浏览器标题展示）
 *    2) RSS_FEEDS RSS 订阅源列表（改完后重新部署 Cloudflare 生效）
 *
 *  可选：
 *    3) API_BASE  60s API 根地址
 * ============================================================
 */
window.APP_CONFIG = {
  /** 版本号：每次发版手动改，如 "1.1.1" */
  VERSION: "1.7.0",

  /** 60s API 根地址（一般不用动） */
  API_BASE: "https://60.newday.cc.cd/v2",

  /**
   * RSS 订阅源（仅源码配置）
   * 新增：复制一条，改 id/name/url 即可
   * 删除：去掉对应对象
   * 字段说明：
   *   id   - 唯一标识（英文/数字/连字符）
   *   name - 页面 Tab 显示名
   *   url  - Feed 地址（Atom / RSS 2.0）
   *   home - 来源站点首页（可选）
   *   desc - 说明（可选）
   */
  RSS_FEEDS: [
    {
      id: "githubweekly",
      name: "GitHub 一周热点",
      url: "https://itcoffee66.github.io/githubweekly/feed.xml",
      home: "https://itcoffee66.github.io/githubweekly/",
      desc: "IT咖啡馆 · 每周 GitHub 热门开源",
    },
    {
      id: "60s-rss",
      name: "60s 每日新闻",
      url: "https://60.newday.cc.cd/v2/60s/rss",
      home: "https://github.com/vikiboss/60s",
      desc: "60s 每日资讯 RSS",
    },
    {
      id: "every-github-rss",
      name: "每日开源热榜",
      url: "https://www.gdufe888.top/api/rss.xml",
      home: "https://www.gdufe888.top",
      desc: "每日开源热榜",
    },
    {
      id: "sspai",
      name: "少数派",
      url: "https://sspai.com/feed",
      home: "https://sspai.com",
      desc: "数字生活与产品体验",
    },
    {
      id: "solidot",
      name: "Solidot",
      url: "https://www.solidot.org/index.rss",
      home: "https://www.solidot.org",
      desc: "中文科技新闻与行业动态",
    },
    {
      id: "npr-news",
      name: "NPR 新闻",
      url: "https://feeds.npr.org/1001/rss.xml",
      home: "https://www.npr.org/sections/news/",
      desc: "美国公共媒体综合新闻",
    },
    {
      id: "hacker-news",
      name: "Hacker News",
      url: "https://hnrss.org/frontpage",
      home: "https://news.ycombinator.com",
      desc: "Hacker News 热门讨论精选",
    },
    {
      id: "ruanyifeng",
      name: "阮一峰",
      url: "https://www.ruanyifeng.com/blog/atom.xml",
      home: "https://www.ruanyifeng.com/blog/",
      desc: "技术趋势与开发实践",
    },
    {
      id: "simon-willison",
      name: "Simon Willison",
      url: "https://simonwillison.net/atom/everything/",
      home: "https://simonwillison.net",
      desc: "AI、LLM 与数据工程实践",
    },
    {
      id: "mit-tech-review",
      name: "MIT 科技评论",
      url: "https://www.technologyreview.com/feed/",
      home: "https://www.technologyreview.com",
      desc: "前沿科技与产业研究",
    },
    {
      id: "nasa-news",
      name: "NASA",
      url: "https://www.nasa.gov/news-release/feed/",
      home: "https://www.nasa.gov/news/",
      desc: "NASA 官方科学与航天动态",
    },
  ],
};
