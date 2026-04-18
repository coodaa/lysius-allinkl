import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import NextImage from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";

export async function getServerSideProps({ locale }) {
  let images = [];
  let news = null;

  try {
    // Fetch images from the landingpageimg table
    images = await prisma.landingpageimg.findMany();

    news = await prisma.News.findFirst();
  } catch (error) {
    console.error("Error fetching data from database:", error);
  }

  return {
    props: {
      images,
      news,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const HomePage = ({ images, news }) => {
  const { t, i18n } = useTranslation("common");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Überwache die Bildschirmbreite und setze den Zustand für mobile Geräte
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  // Image rotation logic
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Head>
        <title>Lysius</title>
        <meta
          name="description"
          content={
            i18n.language === "en"
              ? "Lysius e.V. – a Berlin-based cultural association for theatre, music and intercultural dialogue, founded in 2019."
              : "Lysius e.V. – ein Berliner Kulturverein für Theater, Musik und interkulturelle Verständigung, gegründet 2019."
          }
        />
        <meta
          name="keywords"
          content="Lysius, Lysius e.V., Kultur, Kunst, Theater, Musik, Berlin, Kulturverein, Fabiane Kemmann"
        />
        <link rel="canonical" href="https://www.lysius.org/" />
        <link rel="alternate" hrefLang="de" href="https://www.lysius.org/" />
        <link rel="alternate" hrefLang="en" href="https://www.lysius.org/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.lysius.org/" />
        <meta property="og:title" content="Lysius e.V." />
        <meta
          property="og:description"
          content={
            i18n.language === "en"
              ? "Lysius e.V. – a Berlin-based cultural association for theatre, music and intercultural dialogue."
              : "Lysius e.V. – ein Berliner Kulturverein für Theater, Musik und interkulturelle Verständigung."
          }
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dmpiogwyy/image/upload/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg"
        />
        <meta property="og:url" content="https://www.lysius.org/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lysius" />
        <meta property="og:locale" content={i18n.language === "en" ? "en_US" : "de_DE"} />
        <meta property="og:locale:alternate" content={i18n.language === "en" ? "de_DE" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lysius e.V." />
        <meta
          name="twitter:description"
          content={
            i18n.language === "en"
              ? "Lysius e.V. – a Berlin-based cultural association for theatre, music and intercultural dialogue."
              : "Lysius e.V. – ein Berliner Kulturverein für Theater, Musik und interkulturelle Verständigung."
          }
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dmpiogwyy/image/upload/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg"
        />

        {/* Preload-Links für Bilder */}
        {images.map((image, index) => (
          <link
            key={index}
            rel="preload"
            href={
              isMobile && image.mobileImageUrl
                ? image.mobileImageUrl
                : image.url
            }
            as="image"
          />
        ))}

        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lysius e.V.",
              url: "https://www.lysius.org",
              logo: "https://res.cloudinary.com/dmpiogwyy/image/upload/v1722353263/Landingpage/egbmhvzu33mdjswom7iq.jpg",
              description:
                i18n.language === "en"
                  ? "Cultural association for theatre, music and intercultural dialogue, founded in 2019 in Berlin."
                  : "Kulturverein für Theater, Musik und interkulturelle Verständigung, gegründet 2019 in Berlin.",
              foundingDate: "2019",
              areaServed: "Berlin",
              contactPoint: {
                "@type": "ContactPoint",
                email: "kemmann@lysius.org",
                contactType: "customer service",
              },
              member: [
                {
                  "@type": "Person",
                  name: "Fabiane Kemmann",
                  jobTitle: i18n.language === "en" ? "Director" : "Leitung",
                },
              ],
              sameAs: ["https://www.lysius.org"],
            }),
          }}
        />
      </Head>

      <div className={styles.container}>
        {news ? (
          <div className={styles.newsBanner}>
            <div className={styles.marqueeWrapper}>
              <div className={styles.marqueeContent}>
                {i18n.language === "de" ? news.news_de : news.news_en}{" "}
                {i18n.language === "de" ? news.news_de : news.news_en}{" "}
                {i18n.language === "de" ? news.news_de : news.news_en}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.newsBanner}>
            <div className={styles.marqueeWrapper}>
              <div className={styles.marqueeContent}>
                {t("noNewsAvailable")} {t("noNewsAvailable")}{" "}
                {t("noNewsAvailable")}
              </div>
            </div>
          </div>
        )}

        <div className={styles.overlayContainer}>
          <div className={styles.imageWrapper}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${styles.image} ${
                  index === currentImageIndex ? styles.show : ""
                }`}
              >
                <NextImage
                  src={
                    isMobile && image.mobileImageUrl
                      ? image.mobileImageUrl
                      : image.url
                  }
                  alt={image.description || image.name || `Lysius – Bild ${index + 1}`}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            ))}
          </div>
          <h1 className={styles.title}>Lysius</h1>
        </div>
      </div>
    </>
  );
};

export default HomePage;
