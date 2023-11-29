import React, { useEffect, useState} from "react";
import styles from "../../../../../styles/Adder.module.css";
import adder from "../../../../../assets/base/adder.png";
import remover from "../../../../../assets/base/remover.png";
import adderHover from "../../../../../assets/hover/adder.png";
import removerHover from "../../../../../assets/hover/remover.png";
import adderClick from "../../../../../assets/onClick/adder.png";
import removerClick from "../../../../../assets/onClick/remover.png";

const Adder = ({
  isDeleteClick, 
  onIsDeleteClick, 
  currentPlaylist,
  currentMusic,
  selectedPlaylist, 
  isCurrentPlaylistViewed,
  onAddMusic 
}) => {
  const [imgAdderClick, setImgAdderClick] = useState(false);
  const [imgRemoverClick, setImgRemoverClick] = useState(false);
  const [imgAdderHover, setImgAdderHover] = useState(false);
  const [imgRemoverHover, setImgRemoverHover] = useState(false);
  
  const handleFileInputChange = async (e) => {
    if(isDeleteClick){//추가 버튼을 누를시 deleter는 안보이게 한다
      onIsDeleteClick();
    }
    try {
      //파일을 메인 프로세스를 통해 읽어옴 <- 그래야 로컬 경로를 저장할 수 있다
      const result = await window.electronApi.selectMusicFile();
  
      // 사용자가 파일 선택을 취소한 경우
      if (result.canceled) {
        return;
      }
  
      const selectedFilePath = result.filePaths[0];
  
      // 파일 확장자 확인
      const allowedExtensions = ["mp3", "ogg", "wav"];
      const fileExtension = selectedFilePath.split('.').pop().toLowerCase();
  
      if (allowedExtensions.includes(fileExtension)) {
        // 선택된 파일이 허용된 확장자인 경우에만 경로 설정
        console.log("Selected music file path:", selectedFilePath);
        //현재재생목록에 추가할지, selected Playlist에서 추가할지
        const currentWorkingPlaylist = isCurrentPlaylistViewed? currentPlaylist : selectedPlaylist;
        // loadMusicFile 함수 실행
        const music = await window.electronApi.loadMusicFile(currentWorkingPlaylist, selectedFilePath);
        
        // 받아온 music을 onAddMusic을 통해서 selectedPlaylist에 추가함
        console.log(music);
        if (music) {

          // Check if the music already exists in the playlist
          const isDuplicate = currentWorkingPlaylist.list.some(existingMusic => existingMusic.path === music.path);

          if (isDuplicate) {
            alert("이미 추가된 음악입니다.");
          } else {
            onAddMusic(currentWorkingPlaylist, music);
          }
        } else {
          alert("음악 파일의 정보를 읽어오는데 실패했습니다.");
        }
      } else {
        alert("파일 확장자가 다릅니다. 음악 파일을 선택해주세요.");
      }
    } catch (error) {
      console.error("Error selecting music file:", error);
    }
  };

  //현재재생목록 창 <-> selected Playlist 창 오갈때는 deleter가 안보이게 한다
  useEffect(()=>{
    if(isDeleteClick){
      onIsDeleteClick();
    }
  },[isCurrentPlaylistViewed])
  
  return (
    <div className={styles["adder-wrapper"]}>
      <div className={styles["button-area"]}>
        <div className={styles["adder"]}>
            <img
              src={imgAdderClick ? adderClick : imgAdderHover ? adderHover : adder}
              alt="adder"
              cypress-testid="adder_button"
              onClick={() => {
                setImgAdderClick(true);
                handleFileInputChange();
                setTimeout(()=>{
                  setImgAdderClick(prev=>!prev);
                }, 250);
              }}
              onMouseEnter={() => setImgAdderHover(true)}
              onMouseLeave={() => setImgAdderHover(false)}
            />
        </div>
        <div className={styles["remover"]}>
          <img
            src={imgRemoverClick ? removerClick : imgRemoverHover ? removerHover : remover}
            alt="remover"
            cypress-testid="remover_button"
            onClick={() => {//실제 음악 별 삭제 기능은 SideContianerContents에서 구현한다
              setImgRemoverClick((prev) => !prev);
              onIsDeleteClick();
            }}
            onMouseEnter={() => setImgRemoverHover(true)}
            onMouseLeave={() => setImgRemoverHover(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Adder;
