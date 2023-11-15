import React, { useState } from "react";
import styles from "../../../../styles/SideContainerContents.module.css";
import deleter from "../../../../assets/base/deleter.png";
import deleterHover from "../../../../assets/hover/deleter.png";
import deleterClick from "../../../../assets/onClick/deleter.png";

const MusicItem = ({buttonFlag, musicData }) => {
  const [imgDeleterClick, setImgDeleterClick] = useState(false);
  const [imgDeleterHover, setImgDeleterHover] = useState(false);

  const deleterImage = imgDeleterClick ? deleterClick : imgDeleterHover ? deleterHover : deleter;

  return (
    <div className={styles["music-wrapper"]}>
      <div className={styles["delete-button-area"]}>
        {buttonFlag&&(
          <img
            src={deleterImage}
            alt="deleter"
            onClick={() => {
              setImgDeleterClick(true);
              setTimeout(() => setImgDeleterClick(false), 100);
            }}
            onMouseEnter={() => setImgDeleterHover(true)}
            onMouseLeave={() => setImgDeleterHover(false)}
          />
        )}
      </div>
      <div className={styles["music-album"]}>
        <img src={musicData.sourceOfPath} alt="앨범 이미지" />
      </div>
      <div className={styles["music-info"]}>
        <div className={styles["name"]}>
          <span>{musicData.musicName}</span>
        </div>
        <div className={styles["artist"]}>
          <span>{musicData.artist}</span>
        </div>
      </div>
      <div className={styles["music-duration"]}>
        <span>{musicData.duration}</span>
      </div>
    </div>
  );
};

export default MusicItem;
