import React, { useState , useRef} from "react";
import styles from "../../../../styles/SideContainerHeader.module.css";

const SideContainerHeader = ({selectedPlaylist, currentPlaylist, isCurrentPlaylistViewed, onPlaylistName}) =>{
  const playlistToRender = isCurrentPlaylistViewed ? currentPlaylist : selectedPlaylist;
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);
  
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setUserInput(inputText);
  };
  
  //입력하다가 다른데 클릭하면 초기화
  const handleInputBlur = () => {
    if (playlistToRender && playlistToRender.name) {
      setUserInput("");
    }
  };

  const handleChangeName = (event)=>{
    if (event.key === "Enter" && userInput !== "") {
      if(userInput.trim() !== "현재재생목록"){
        onPlaylistName(selectedPlaylist, userInput);
      }
      setUserInput("");
      inputRef.current.blur(); // Enter 키를 눌렀을 때 포커스 해제
    }
  }

  return (
    <div className={styles["side-container-header"]}>
      {playlistToRender && playlistToRender.name&&!isCurrentPlaylistViewed ? (
        <input
        ref={inputRef}
        type="text"
        placeholder={playlistToRender.name}
        maxLength={16}
        value={userInput}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleChangeName}
        />
      ):(<span>현재재생목록</span>)}
    </div>
  );
};

export default SideContainerHeader;