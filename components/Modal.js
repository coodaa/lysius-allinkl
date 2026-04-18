import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from "../styles/Modal.module.css";

const Modal = ({ images, initialIndex, onClose }) => {
  const { t } = useTranslation("common");
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

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

  // Focus auf Close-Button wenn Modal öffnet
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Keyboard: Escape schließt, Pfeiltasten navigieren, Tab bleibt im Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        return;
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        return;
      }
      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Bildergalerie"
    >
      <div
        ref={modalRef}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Galerie schließen"
        >
          X
        </button>

        <div className={styles.modalImageWrapper}>
          <Image
            src={images[currentIndex]}
            alt={`Bild ${currentIndex + 1} von ${images.length}`}
            fill
            style={{ objectFit: "contain" }}
            className={styles.modalImage}
          />
          <button
            className={styles.arrowLeft}
            onClick={handlePrev}
            aria-label="Vorheriges Bild"
          >
            &lt;
          </button>
          <button
            className={styles.arrowRight}
            onClick={handleNext}
            aria-label="Nächstes Bild"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
