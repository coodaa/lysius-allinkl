module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "de",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
