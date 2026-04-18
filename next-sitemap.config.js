/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.lysius.org",
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/en/legal", "/en/terms", "/legal", "/terms"],
  alternateRefs: [
    {
      href: "https://www.lysius.org",
      hreflang: "de",
    },
    {
      href: "https://www.lysius.org/en",
      hreflang: "en",
    },
  ],
};
