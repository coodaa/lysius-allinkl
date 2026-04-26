import React, { useState, useMemo } from "react";
import Image from "next/image";
import styles from "../styles/SecondCarousel.module.css";

const SecondCarousel = ({
  images,
  credits = [], // Allgemeine Credits, immer anzeigen
  credits_de = [], // Deutsche Credits
  credits_en = [], // Englische Credits
  language = "de", // Sprache, standardmäßig "de"
  onImageClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Bestimmen der angezeigten Credits basierend auf der aktuellen Sprache
  const currentCredits = useMemo(() => {
    switch (language) {
      case "en":
        return credits.map((credit, index) => {
          const enCredit = credits_en[index];
          return enCredit && enCredit !== credit
            ? `${credit}\n${enCredit}`
            : credit;
        });
      case "de":
        return credits.map((credit, index) => {
          const deCredit = credits_de[index];
          return deCredit && deCredit !== credit
            ? `${credit}\n${deCredit}`
            : credit;
        });
      default:
        return credits;
    }
  }, [credits, credits_de, credits_en, language]);

  // Kein Rendering, wenn keine Bilder vorhanden sind
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselWrapper}>
      {/* Bild-Anzeige */}
      <div
        className={styles.carousel}
        onClick={() => onImageClick(currentImageIndex)}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.carouselImage} ${
              index === currentImageIndex ? styles.show : ""
            }`}
          >
            <Image
              src={image}
              alt={
                (language === "en" ? credits_en[index] : credits_de[index]) ||
                credits[index] ||
                `Image ${index + 1}`
              }
              fill
              style={{ objectFit: "contain" }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigationspunkte */}
      <div className={styles.carouselDots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={
              index === currentImageIndex ? styles.activeDot : styles.dot
            }
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>

      {/* Credits anzeigen, wenn sie vorhanden sind */}
      {currentCredits.length > 0 && (
        <div className={styles.carouselCredits} style={{ minHeight: "2rem" }}>
          {currentCredits[currentImageIndex] &&
            currentCredits[currentImageIndex]
              .split("\n")
              .map((credit, index) => (
                <div key={index} className={styles.creditLine}>
                  {credit.trim() || "\u00A0"}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default SecondCarousel;
