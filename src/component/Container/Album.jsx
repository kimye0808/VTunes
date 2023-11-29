import React, {useState, useEffect} from "react";
import styles from "../../styles/Album.module.css";
import ScrollList from "../common/ScrollList/ScrollList";
import DefaultAlbum from "../../assets/base/default_album.png";
import LyricsLine from "./LyricsLine";

const Album = ({currentMusic}) => {
  const [imgFile, setImgFile] = useState(null);
  const [lyricsFile, setLyricsFile] = useState(null);
  const [isAlbumClick, setIsAlbumClick] = useState(false);

  const fetchMusicFile = async () => {
    if (currentMusic && currentMusic.imgPath && currentMusic.imgPath !== "") {
      try {
        const tmpImg = await window.electronApi.loadImgFile(currentMusic.imgPath);
        setImgFile(tmpImg);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    } else {
      setImgFile(null);
    }
  };

  const fetchLyricsFile = async () => {
    if (currentMusic && currentMusic.path && currentMusic.path !== "") {
      try {
        // 확장자를 ".lrc"로 변경한 새로운 경로 생성
        const lrcFilePath = `${currentMusic.path.slice(0, currentMusic.path.lastIndexOf("."))}.lrc`;
        console.log(lrcFilePath);
        const lyricsFile = await window.electronApi.loadLyricsFile(lrcFilePath);
        setLyricsFile(lyricsFile);
      } catch (error) {
        console.error("Error loading lyrics:", error);
      }
    }
  }

  useEffect(() => {
    //음악이 이미지파일이 있고 음악의 이미지 파일의 경로에 대한 정보가 있으면 불러온다
    fetchMusicFile();
    fetchLyricsFile();
    setIsAlbumClick(false);
  }, [currentMusic]);

  const toggleIsAlbumClick = () => {
    const hasLyricsInMusic = () => {
      return currentMusic && currentMusic.lyrics !== null && currentMusic.lyrics !== undefined
        && currentMusic.lyrics !== '' && currentMusic.lyrics.length !== 0;
    }

    if (lyricsFile || hasLyricsInMusic()) {
      setIsAlbumClick(prev => (!prev));
    }
  }

  return (
    <div
      className={styles.album}
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${imgFile || DefaultAlbum})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {
        isAlbumClick ? (
          <div className={styles.lyrics} onClick={toggleIsAlbumClick} data-testid='lyrics-div' cypress-testid ="show_album_button">
            <ScrollList>
              {lyricsFile !== null ? (
                Object.entries(lyricsFile)
                  .map(([time, lyrics]) => <LyricsLine time={time}>{lyrics}</LyricsLine>)
              ) : (
                currentMusic.lyrics
                  .map(lyrics => <LyricsLine>{lyrics}</LyricsLine>)
              )}
            </ScrollList>
          </div>
        ) : (
          <div className={styles["mini-album"]} onClick={toggleIsAlbumClick} data-testid='album-div' cypress-testid ="show_lyrics_button">
            {
              imgFile === null || imgFile === undefined ? (
                <img src={DefaultAlbum} alt="앨범 이미지"/>
              ) : (
                <img src={imgFile} alt="앨범 이미지"/>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default Album;