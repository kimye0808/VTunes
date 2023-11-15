import React, {useState} from "react";
import styles from "../../styles/Album.module.css";
import ScrollList from "../common/ScrollList/ScrollList";

const Album = ({currentMusic}) =>{
  const [isAlbumClick, setIsAlbumClick] = useState(false);

  const curMusic = { //테스트용 임시
    musicName: "아뤼스트2",
    lyrics: "는 인생이 예술이어야 한다2",
    artist: "김영현2",
    albumTitle: "음잘알 앨범2",
    duration: "2:23",
    sourceOfPath: "/images/baby.jpg",
  }
  
  const toggleIsAlbumClick = () => {
    setIsAlbumClick(prev => (!prev));
  }
  return (
    <div
      className={styles.album}
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${curMusic.sourceOfPath})`,
      }}
    >
      {
        isAlbumClick ? (  
          <div className={styles.lyrics} onClick = {toggleIsAlbumClick}>
            <ScrollList>
            {curMusic.lyrics}
            </ScrollList>
          </div>
        ) : (
          <div className={styles["mini-album"]} onClick ={toggleIsAlbumClick}>
              <img src={curMusic.sourceOfPath} alt="앨범 이미지" />
          </div>
        )
      }
    </div>
  );
};

export default Album;