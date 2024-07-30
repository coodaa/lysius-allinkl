import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; // Importieren der Funktion
import styles from "../../styles/PlayPage.module.css";

const PlayPage = ({ play, setCurrentTitle }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  useEffect(() => {
    setCurrentTitle(play.title);
    return () => setCurrentTitle("LYSIUS");
  }, [play.title, setCurrentTitle]);

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={play.imageUrl}
          alt={play.title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className={styles.contentContainer}>
        <button onClick={goBack} className={styles.backButton}>
          {t("back")}
        </button>
        <h1 className={styles.title}>{play.title}</h1>
        <p className={styles.subtitle}>{play.subtitle}</p>
        <div className={styles.details}>
          <p>{t("production_director")}: {play.productionDirector}</p>
          <p>{t("artistic_supervision")}: {play.artisticSupervision}</p>
          <p>{t("musical_director")}: {play.musicalDirector}</p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/plays/${id}`);
  const play = await res.json();

  return {
    props: {
      play,
      ...(await serverSideTranslations(context.locale, ["common"])), // Aufrufen der Funktion
    },
  };
}

export default PlayPage;
