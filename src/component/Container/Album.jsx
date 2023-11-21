import React, {useState, useEffect} from "react";
import styles from "../../styles/Album.module.css";
import ScrollList from "../common/ScrollList/ScrollList";
import DefaultAlbum from "../../assets/base/default_album.png";

const Album = ({currentMusic}) =>{
  const [imgFile, setImgFile] = useState(null);
  const [lyricsFile, setLyricsFile] = useState(null);
  const [isAlbumClick, setIsAlbumClick] = useState(false);

  useEffect(() => {
    //음악이 이미지파일이 있고 음악의 이미지 파일의 경로에 대한 정보가 있으면 불러온다
    async function fetchMusicFile() {
      if (currentMusic && currentMusic.imgPath && currentMusic.imgPath !== "") {
        try {
          const tmpImg = await window.electronApi.loadImgFile(currentMusic.imgPath);
          setImgFile(tmpImg);
        } catch (error) {
          console.error("Error loading image:", error);
        }
      }
    }
    //음원 파일이 있는 폴더에 같은 이름의 lrc파일이 존재하면 가져와서 lyrics로 설정
    async function fetchLyricsFile(){
      if(currentMusic && currentMusic.path && currentMusic.path !==""){
        try{
          const fileNameWithExtension = currentMusic.path.split("/").pop();
          const fileName = fileNameWithExtension.slice(0, fileNameWithExtension.lastIndexOf("."));
          
          // 확장자를 ".lrc"로 변경한 새로운 경로 생성
          const lrcFilePath = `${currentMusic.path.slice(0, currentMusic.path.lastIndexOf("/"))}/${fileName}.lrc`;

          const lyricsFile = await window.electronApi.loadLyricsFile(lrcFilePath);
          setLyricsFile(lyricsFile);
        }catch(error){
          console.error("Error loading lyrics:", error);
        }
      }
    }
    fetchMusicFile(); 
    fetchLyricsFile();
  }, [currentMusic]);
  
  const toggleIsAlbumClick = () => {
    if(currentMusic&&currentMusic.lyrics !== null && currentMusic.lyrics !== "" && currentMusic.lyrics !== undefined){
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
          <div className={styles.lyrics} onClick = {toggleIsAlbumClick}>
            <ScrollList>
              {lyricsFile !== null ? (
                lyricsFile
              ) : (
                currentMusic &&
                currentMusic.lyrics !== undefined &&
                currentMusic.lyrics
              )}
            </ScrollList>
          </div>
        ) : (
          <div className={styles["mini-album"]} onClick ={toggleIsAlbumClick}>
            {
              imgFile === null || imgFile === undefined ? (
                <img src ={DefaultAlbum} alt="앨범 이미지" />
              ):(
                <img src={imgFile} alt="앨범 이미지" />
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default Album;