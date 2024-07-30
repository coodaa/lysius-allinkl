// src/pages/members.js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MembersPage = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1>{t("legal")}</h1>
    </div>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default MembersPage;
