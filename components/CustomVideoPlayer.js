import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/CustomVideoPlayer.module.css";

const CustomVideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube-Video-ID extrahieren
  const videoId = videoUrl.split("embed/")[1];

  // Vorschaubild-URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className={styles.videoContainer}>
      {!isPlaying ? (
        <div className={styles.thumbnailContainer} onClick={handlePlayClick}>
          <Image
            src={thumbnailUrl}
            alt="Video thumbnail"
            fill
            style={{ objectFit: "cover" }}
            className={styles.thumbnail}
          />
          <div className={styles.playButtonOverlay}>
            <div className={styles.playButton}></div>
          </div>
        </div>
      ) : (
        <iframe
          src={`${videoUrl}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.videoIframe}
        ></iframe>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
