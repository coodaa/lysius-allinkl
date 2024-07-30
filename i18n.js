// src/i18n.js
import NextI18Next from "next-i18next";

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "de",
  otherLanguages: ["en"],
  localePath: typeof window === "undefined" ? "public/locales" : "/locales",
});

export default NextI18NextInstance;
export const { appWithTranslation, withTranslation } = NextI18NextInstance;
