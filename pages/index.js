import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  console.log("getServerSideProps called"); // Debugging-Ausgabe

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  console.log("API URL:", apiUrl); // Debugging-Ausgabe
  let images = [];

  try {
    const res = await fetch(`${apiUrl}/api/landingpageimg`);
    console.log("Fetch images response status:", res.status); // Debugging-Ausgabe
    if (res.ok) {
      images = await res.json();
      console.log("Images fetched successfully:", images); // Debugging-Ausgabe
    } else {
      console.error("Failed to fetch images:", res.status);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }

  console.log("Images in getServerSideProps:", images); // Debugging-Ausgabe

  return {
    props: {
      images,
    },
  };
}

export default function HomePage({ images = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log("Images in component:", images); // Debugging-Ausgabe

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

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
}
