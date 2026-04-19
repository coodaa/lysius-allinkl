/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.lysius.org",
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/en/legal", "/en/terms", "/legal", "/terms"],
  alternateRefs: [
    { href: "https://www.lysius.org", hreflang: "de" },
    { href: "https://www.lysius.org/en", hreflang: "en" },
  ],
  additionalPaths: async () => {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();
    try {
      const plays = await prisma.play.findMany({ select: { slug: true } });
      return plays
        .filter((play) => play.slug)
        .map((play) => ({
          loc: `/${play.slug}`,
          changefreq: "weekly",
          priority: 0.8,
          alternateRefs: [
            { href: `https://www.lysius.org/${play.slug}`, hreflang: "de" },
            { href: `https://www.lysius.org/en/${play.slug}`, hreflang: "en" },
          ],
        }));
    } finally {
      await prisma.$disconnect();
    }
  },
};
