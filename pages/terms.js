// src/pages/terms.js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TermsPage = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1>{t("terms")}</h1>
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default TermsPage;
