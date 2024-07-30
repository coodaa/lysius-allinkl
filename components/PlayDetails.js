import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styles from "../styles/PlayPage.module.css";

const PlayDetails = ({ play }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const images = [
      play.imageUrl,
      play.imageUrl1,
      play.imageUrl2,
      play.imageUrl3,
      play.imageUrl4,
      play.imageUrl5,
      play.imageUrl6,
      play.imageUrl7,
      play.imageUrl8,
      play.imageUrl9,
      play.imageUrl10,
    ].filter(Boolean);

    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [play]);

  const goBack = () => {
    router.push("/");
  };

  const images = [
    play.imageUrl,
    play.imageUrl1,
    play.imageUrl2,
    play.imageUrl3,
    play.imageUrl4,
    play.imageUrl5,
    play.imageUrl6,
    play.imageUrl7,
    play.imageUrl8,
    play.imageUrl9,
    play.imageUrl10,
  ].filter(Boolean);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.image} ${
              index === currentImageIndex ? styles.show : ""
            }`}
          >
            <Image
              src={image}
              alt={play.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        ))}
      </div>
      <div className={styles.contentContainer}>
        <button onClick={goBack} className={styles.backButton}>
          {t("back")}
        </button>
        <h1 className={styles.title}>{play.title}</h1>
        <p className={styles.subtitle}>{play.subtitle}</p>
        <div className={styles.details}>
          {play.productionDirector && (
            <p>
              {t("production_director")}: {play.productionDirector}
            </p>
          )}
          {play.artisticSupervision && (
            <p>
              {t("artistic_supervision")}: {play.artisticSupervision}
            </p>
          )}
          {play.musicalDirector && (
            <p>
              {t("musical_director")}: {play.musicalDirector}
            </p>
          )}
          {play.regie && (
            <p>
              {t("regie")}: {play.regie}
            </p>
          )}
          {play.produktion && (
            <p>
              {t("produktion")}: {play.produktion}
            </p>
          )}
          {play.kuenstlerischeBegleitung && (
            <p>
              {t("kuenstlerische_begleitung")}: {play.kuenstlerischeBegleitung}
            </p>
          )}
          {play.musikalischeLeitung && (
            <p>
              {t("musikalische_leitung")}: {play.musikalischeLeitung}
            </p>
          )}
          {play.mit && (
            <p>
              {t("mit")}: {play.mit}
            </p>
          )}
          {play.sopranistin && (
            <p>
              {t("sopranistin")}: {play.sopranistin}
            </p>
          )}
          {play.sopranist && (
            <p>
              {t("sopranist")}: {play.sopranist}
            </p>
          )}
          {play.bass && (
            <p>
              {t("bass")}: {play.bass}
            </p>
          )}
          {play.chor && (
            <p>
              {t("chor")}: {play.chor}
            </p>
          )}
          {play.orchester && (
            <p>
              {t("orchester")}: {play.orchester}
            </p>
          )}
          {play.foerderung && (
            <p>
              {t("foerderung")}: {play.foerderung}
            </p>
          )}
        </div>
        <div className={styles.description}>
          <p>{play.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayDetails;
