/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.lysius.org", // Deine Website-URL
  generateRobotsTxt: false,
  sitemapSize: 7000, // Optionale Begrenzung der Anzahl von URLs pro Sitemap
  changefreq: "weekly", // Gibt die Häufigkeit der Updates an
  priority: 0.7, // Priorität der Seiten im Vergleich zu anderen
  exclude: ["/admin/*"], // Seiten oder Pfade, die von der Sitemap ausgeschlossen werden sollen
};
