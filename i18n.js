const NextI18Next = require("next-i18next").default;
const path = require("path");

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "de",
  otherLanguages: ["en"],
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",
});

module.exports = NextI18NextInstance;
module.exports.default = NextI18NextInstance;
