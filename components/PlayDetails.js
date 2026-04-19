import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Modal from "./Modal";
import PlayDetailsList from "./PlayDetailsList";
import SecondCarousel from "./SecondCarousel";
import CustomVideoPlayer from "./CustomVideoPlayer";
import styles from "../styles/PlayPage.module.css";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

const PlayDetails = ({ play, setCurrentTitle }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const topRef = useRef(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalImages, setModalImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEnglish = useMemo(() => i18n.language === "en", [i18n.language]);
  const isMobile = useIsMobile();

  const title = useMemo(
    () =>
      isEnglish
        ? play?.title_en || play?.title || t("untitled")
        : play?.title || t("untitled"),
    [isEnglish, play, t]
  );

  const subtitles = useMemo(() => {
    const defaultSubtitles = [
      play?.subtitle1,
      play?.subtitle2,
      play?.subtitle3,
    ].filter(Boolean);

    if (isEnglish) {
      const englishSubtitles = [
        play?.subtitle1_en,
        play?.subtitle2_en,
        play?.subtitle3_en,
      ].filter(Boolean);
      return englishSubtitles.length > 0 ? englishSubtitles : defaultSubtitles;
    }

    return defaultSubtitles;
  }, [isEnglish, play]);

  const topImages = useMemo(
    () =>
      [
        { url: play?.topImage1, credit: play?.topImageCredit1 || "" },
        { url: play?.topImage2, credit: play?.topImageCredit2 || "" },
        { url: play?.topImage3, credit: play?.topImageCredit3 || "" },
        { url: play?.topImage4, credit: play?.topImageCredit4 || "" },
        { url: play?.topImage5, credit: play?.topImageCredit5 || "" },
        { url: play?.topImage6, credit: play?.topImageCredit6 || "" },
      ].filter((image) => image.url && image.url.trim() !== ""),
    [play]
  );

  const desktopImages = useMemo(() => {
    const images = [];
    for (let i = 1; i <= 10; i++) {
      images.push({
        url: play?.[`imageUrl${i}`],
        credit: play?.[`imageCredit${i}`] || "",
        credit_de:
          play?.[`imageCredit${i}_de`] || play?.[`imageCredit${i}`] || "",
        credit_en:
          play?.[`imageCredit${i}_en`] || play?.[`imageCredit${i}`] || "",
      });
    }
    return images.filter((image) => image.url);
  }, [play]);

  const mobileImages = useMemo(() => {
    const images = [];
    for (let i = 1; i <= 6; i++) {
      images.push({
        url: play?.[`topMobileImage${i}`] || play?.[`imageUrl${i}`],
        credit: play?.[`imageCredit${i}`] || "",
        credit_de:
          play?.[`imageCredit${i}_de`] || play?.[`imageCredit${i}`] || "",
        credit_en:
          play?.[`imageCredit${i}_en`] || play?.[`imageCredit${i}`] || "",
      });
    }
    return images.filter((image) => image.url);
  }, [play]);

  const deCredits = desktopImages.map((img) => img.credit_de);
  const enCredits = desktopImages.map((img) => img.credit_en);
  const activeImages = isMobile ? mobileImages : topImages;

  const logos = [
    play?.logo1,
    play?.logo2,
    play?.logo3,
    play?.logo4,
    play?.logo5,
    play?.logo6,
  ].filter(Boolean);

  useEffect(() => {
    if (play?.title) setCurrentTitle(title);

    if (activeImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % activeImages.length
        );
      }, 7000);
      return () => clearInterval(interval);
    } else {
      setCurrentImageIndex(0);
    }
  }, [title, play, activeImages, setCurrentTitle]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const preloadImages = [
        ...desktopImages.map((img) => img.url),
        ...mobileImages.map((img) => img.url),
      ];
      preloadImages.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
      });
    }
  }, [desktopImages, mobileImages]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleImageClick = useCallback(
    (index, imagesArray) => {
      if (isMobile) return;
      setModalImages(imagesArray);
      setModalImageIndex(index);
      setIsModalOpen(true);
    },
    [isMobile]
  );

  const videoUrl =
    play?.videoUrl1
      ?.replace("youtu.be/", "www.youtube.com/embed/")
      ?.split("?")[0] || "";

  useEffect(() => {
    const container = document.querySelector(`.${styles.textContainer}`);
    const strich = container?.querySelector("::before");

    if (container && strich) {
      strich.style.height = `${container.clientHeight}px`;
    }
  }, []);

  useEffect(() => {
    const addLineClasses = () => {
      const subtitleElements = document.querySelectorAll(
        `.${styles.subtitle} span`
      );
      if (subtitleElements.length === 0) return;

      // Entferne vorherige Klassen falls vorhanden
      subtitleElements.forEach((span) => {
        span.classList.remove(styles.lastInLine);
        span.classList.remove(styles.firstInLine);
      });

      let previousTopOffset = subtitleElements[0].getBoundingClientRect().top;
      let firstSpanInRow = subtitleElements[0];
      let lastSpanInRow = subtitleElements[0];

      // Durchlaufen und Klassen für erste und letzte Elemente jeder Zeile zuweisen
      subtitleElements.forEach((span, index) => {
        const currentTopOffset = span.getBoundingClientRect().top;

        if (currentTopOffset !== previousTopOffset) {
          // Die letzte und erste Klasse für die vorherige Zeile zuweisen
          lastSpanInRow.classList.add(styles.lastInLine);
          firstSpanInRow.classList.add(styles.firstInLine);

          // Setze die neuen Referenzen für die aktuelle Zeile
          firstSpanInRow = span;
          previousTopOffset = currentTopOffset;
        }
        lastSpanInRow = span;
      });

      // Letztes Element in der letzten Zeile und erstes Element in der letzten Zeile hinzufügen
      lastSpanInRow.classList.add(styles.lastInLine);
      firstSpanInRow.classList.add(styles.firstInLine);
    };

    // Füge Eventlistener für Resize hinzu
    addLineClasses();
    window.addEventListener("resize", addLineClasses);

    // Cleanup Eventlistener
    return () => {
      window.removeEventListener("resize", addLineClasses);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subtitles[0]} />
        {activeImages.map((image, index) => (
          <meta key={index} property="og:image" content={image.url} />
        ))}
        {activeImages.map((image, index) => (
          <meta
            key={index}
            name={`image-credit-${index + 1}`}
            content={image.credit}
          />
        ))}
      </Head>

      <div className={styles.pageContainer} ref={topRef}>
        {isMobile && mobileImages.length > 0 && (
          <div className={`${styles.imageContainer} ${styles.mobileImages}`}>
            {mobileImages.map((image, index) =>
              image.url ? (
                <div
                  key={index}
                  className={`${styles.image} ${
                    index === currentImageIndex ? styles.show : ""
                  }`}
                  onClick={() =>
                    handleImageClick(
                      index,
                      mobileImages.map((img) => img.url)
                    )
                  }
                >
                  <NextImage
                    src={image.url}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              ) : null
            )}
          </div>
        )}

        {!isMobile && topImages.length > 0 && (
          <div className={`${styles.imageContainer} ${styles.desktopImages}`}>
            {topImages.map((image, index) =>
              image.url ? (
                <div
                  key={index}
                  className={`${styles.image} ${
                    index === currentImageIndex ? styles.show : ""
                  }`}
                >
                  <NextImage
                    src={image.url}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 1000px) 100vw, 50vw"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              ) : null
            )}
          </div>
        )}

        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.subtitle}>
              {subtitles.map((subtitle, i) => (
                <p key={i}>
                  {subtitle.split(" ").map((word, index) => (
                    <span key={index}>{word} </span>
                  ))}
                </p>
              ))}
            </div>
            <div className={styles.playDesktop}>
              <PlayDetailsList play={play} />
            </div>
            <div className={styles.description}>
              {[1, 2, 3, 4].map((i, index) => {
                const description = isEnglish
                  ? play?.[`descriptionleft${i}_en`] ||
                    play?.[`descriptionleft${i}`] ||
                    ""
                  : play?.[`descriptionleft${i}`] || "";

                if (!description) return null;

                return (
                  <React.Fragment key={i}>
                    {index > 0 && <hr className={styles.horizontalLine} />}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className={styles.carouselVideoContainer}>
            <h1 className={styles.titleDesktop}>{title}</h1>
            {subtitles.map((subtitle, i) => (
              <p key={i} className={styles.subtitleDesktop}>
                {subtitle.split(" ").map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </p>
            ))}

            {desktopImages.length > 0 && (
              <SecondCarousel
                images={desktopImages.map((img) => img.url)}
                credits={i18n.language === "de" ? deCredits : enCredits}
                credits_de={deCredits}
                credits_en={enCredits}
                language={i18n.language}
                onImageClick={(index) =>
                  handleImageClick(
                    index,
                    desktopImages.map((img) => img.url)
                  )
                }
              />
            )}

            {videoUrl && <CustomVideoPlayer videoUrl={videoUrl} />}

            {(play?.videoCredit1_de || play?.videoCredit1_en) && (
              <div className={styles.videoCredit}>
                <p>
                  {isEnglish
                    ? play?.videoCredit1_en || play?.videoCredit1_de
                    : play?.videoCredit1_de || play?.videoCredit1_en}
                </p>
              </div>
            )}

            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.textright}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: isEnglish
                      ? play?.[`textright${i}_en`] || t(``)
                      : play?.[`textright${i}`] || t(``),
                  }}
                />
              </div>
            ))}

            {logos.length > 0 && (
              <div className={styles.logoSection}>
                <div className={styles.logoContainer}>
                  {logos.map((logo, index) => (
                    <div key={index} className={styles.logoWrapper}>
                      <img
                        src={logo}
                        alt={`Logo ${index + 1}`}
                        className={styles.logoImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <Modal
            images={modalImages}
            initialIndex={modalImageIndex}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default PlayDetails;
