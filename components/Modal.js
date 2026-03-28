import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from "../styles/Modal.module.css";

const Modal = ({ images, initialIndex, onClose }) => {
  const { t } = useTranslation("common");
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Aktualisiere currentIndex, wenn initialIndex sich ändert
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Bilder vorab laden
  useEffect(() => {
    images.forEach((imageSrc) => {
      const img = new window.Image();
      img.src = imageSrc;
    });
  }, [images]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>

        <div className={styles.modalImageWrapper}>
          <Image
            src={images[currentIndex]}
            alt={`Bild ${currentIndex + 1}`}
            fill
            style={{ objectFit: "contain" }}
            className={styles.modalImage}
          />
          <button className={styles.arrowLeft} onClick={handlePrev}>
            &lt;
          </button>
          <button className={styles.arrowRight} onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
