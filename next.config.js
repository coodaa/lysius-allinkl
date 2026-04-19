module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/plays", destination: "/", permanent: true },
      { source: "/plays/:slug", destination: "/:slug", permanent: true },
    ];
  },
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "de",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};
