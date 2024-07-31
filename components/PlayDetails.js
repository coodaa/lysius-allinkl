import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Modal from "./Modal";
import styles from "../styles/PlayPage.module.css";

const PlayDetails = ({ play, setCurrentTitle }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentTitle(play.title);

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
  }, [play, setCurrentTitle]);

  const goBack = () => {
    router.push("/");
  };

  const handleCarouselImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
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

  const videoUrl =
    play.videoUrl
      ?.replace("youtu.be/", "www.youtube.com/embed/")
      .split("?")[0] || "";

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
        <h1 className={styles.title}>{play.title}</h1>
        <p className={styles.subtitle}>
          {play.subtitle
            ? play.subtitle
                .split(" ")
                .map((word, index) => <span key={index}>{word} </span>)
            : ""}
        </p>
        <div className={styles.details}>
          {play.productionDirector && (
            <>
              <p className={styles.label}>{t("production_director")}</p>
              <p className={styles.value}>{play.productionDirector}</p>
            </>
          )}
          {play.artisticSupervision && (
            <>
              <p className={styles.label}>{t("artistic_supervision")}</p>
              <p className={styles.value}>{play.artisticSupervision}</p>
            </>
          )}
          {play.musicalDirector && (
            <>
              <p className={styles.label}>{t("musical_director")}</p>
              <p className={styles.value}>{play.musicalDirector}</p>
            </>
          )}
          {play.regie && (
            <>
              <p className={styles.label}>{t("regie")}</p>
              <p className={styles.value}>{play.regie}</p>
            </>
          )}
          {play.produktion && (
            <>
              <p className={styles.label}>{t("produktion")}</p>
              <p className={styles.value}>{play.produktion}</p>
            </>
          )}
          {play.kuenstlerischeBegleitung && (
            <>
              <p className={styles.label}>{t("kuenstlerische_begleitung")}</p>
              <p className={styles.value}>{play.kuenstlerischeBegleitung}</p>
            </>
          )}
          {play.musikalischeLeitung && (
            <>
              <p className={styles.label}>{t("musikalische_leitung")}</p>
              <p className={styles.value}>{play.musikalischeLeitung}</p>
            </>
          )}
          {play.mit && (
            <>
              <p className={styles.label}>{t("mit")}</p>
              <p className={styles.value}>{play.mit}</p>
            </>
          )}
          {play.sopranistin && (
            <>
              <p className={styles.label}>{t("sopranistin")}</p>
              <p className={styles.value}>{play.sopranistin}</p>
            </>
          )}
          {play.sopranist && (
            <>
              <p className={styles.label}>{t("sopranist")}</p>
              <p className={styles.value}>{play.sopranist}</p>
            </>
          )}
          {play.bass && (
            <>
              <p className={styles.label}>{t("bass")}</p>
              <p className={styles.value}>{play.bass}</p>
            </>
          )}
          {play.chor && (
            <>
              <p className={styles.label}>{t("chor")}</p>
              <p className={styles.value}>{play.chor}</p>
            </>
          )}
          {play.orchester && (
            <>
              <p className={styles.label}>{t("orchester")}</p>
              <p className={styles.value}>{play.orchester}</p>
            </>
          )}
          {play.foerderung && (
            <>
              <p className={styles.label}>{t("foerderung")}</p>
              <p className={styles.value}>{play.foerderung}</p>
            </>
          )}
        </div>
        {videoUrl && (
          <div className={styles.videoContainer}>
            <iframe
              src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <div className={styles.carousel}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.carouselImage} ${
                index === currentImageIndex ? styles.show : ""
              }`}
              onClick={() => handleCarouselImageClick(index)}
            >
              <Image
                src={image}
                alt={play.title}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          ))}
          <div className={styles.carouselDots}>
            {images.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentImageIndex ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className={styles.description}>
          <p>{play.description}</p>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          images={images}
          initialIndex={currentImageIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PlayDetails;


