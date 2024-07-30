import { useEffect, useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Home.module.css';

export async function getServerSideProps({ locale }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  let images = [];

  try {
    const res = await fetch(`${apiUrl}/api/landingpageimg`);
    if (res.ok) {
      images = await res.json();
    } else {
      console.error("Failed to fetch images:", res.status);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }

  return {
    props: {
      images,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const HomePage = ({ images }) => {
  const { t } = useTranslation("common");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.container}>
      <div className={styles.overlayContainer}>
        <div className={styles.imageWrapper}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.image} ${
                index === currentImageIndex ? styles.show : ""
              }`}
            >
              <img
                src={image.url}
                alt={image.name}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
        <h1 className={styles.title}>Lysius</h1>
      </div>
    </div>
  );
};

export default HomePage;
