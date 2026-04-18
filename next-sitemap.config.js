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
      const plays = await prisma.play.findMany({ select: { id: true } });
      return plays.map((play) => ({
        loc: `/plays/${play.id}`,
        changefreq: "weekly",
        priority: 0.8,
        alternateRefs: [
          { href: `https://www.lysius.org/plays/${play.id}`, hreflang: "de" },
          { href: `https://www.lysius.org/en/plays/${play.id}`, hreflang: "en" },
        ],
      }));
    } finally {
      await prisma.$disconnect();
    }
  },
};
