import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from "../styles/Modal.module.css";

const Modal = ({ images, initialIndex, onClose }) => {
  const { t } = useTranslation("common");
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            {t("close")}
          </button>
        </div>
        <button className={styles.prevButton} onClick={handlePrev}>
          {"<"}
        </button>
        <div className={styles.modalImageWrapper}>
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="contain"
            className={styles.modalImage}
          />
        </div>
        <button className={styles.nextButton} onClick={handleNext}>
          {">"}
        </button>
        <div className={styles.carouselDots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.activeDot : ""
              }`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
