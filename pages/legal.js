// pages/legal.js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import styles from "../styles/LegalPage.module.css";
import prisma from "../lib/prisma";

const LegalPage = ({ legalData }) => {
  const { t, i18n } = useTranslation("common");
  const isEnglish = i18n.language === "en";

  const content = isEnglish ? legalData.content_en : legalData.content;

  // Den Text in Absätze aufteilen
  const paragraphs = content ? content.split("\n").filter(Boolean) : [];

  return (
    <>
      <Head>
        <title>{t("legal_notice")} | Lysius</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={t("legal_notice_description")} />
        <meta property="og:title" content={`${t("legal_notice")} | Lysius`} />
        <meta
          property="og:description"
          content={t("legal_notice_description")}
        />
        <meta property="og:url" content="https://www.lysius.org/legal" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dmpiogwyy/image/upload/f_auto,q_auto/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t("legal_notice")} | Lysius`} />
        <meta
          name="twitter:description"
          content={t("legal_notice_description")}
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dmpiogwyy/image/upload/f_auto,q_auto/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg"
        />
      </Head>

      <div className={styles.container}>
        {/* <h1>{t("legal_notice")}</h1> */}
        <div className={styles.text}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
};

// Server-side Daten holen
export const getServerSideProps = async ({ locale }) => {
  const legalData = await prisma.legal.findFirst({
    where: { type: "Impressum" },
  });

  if (legalData) {
    legalData.createdAt = legalData.createdAt.toISOString();
  }

  return {
    props: {
      legalData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default LegalPage;
