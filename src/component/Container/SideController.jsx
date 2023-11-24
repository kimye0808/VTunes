import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/SideController.module.css";

import SideContainer from "./SideController/SideContainer";
import PlaylistSetContainer from "../../containers/PlaylistSetContainer";
import SearchEngineContainer from "../../containers/SearchEngineContainer";

const SideController = () =>{
  const searchInputRef = useRef(null);
  const playlistSetInputRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [isPlaylistMenuClick, setIsPlaylistMenuClick] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);//음악 삭제 위한 버튼 플래그
  
  const handleIsDeleteClick = () =>{
    setIsDeleteClick(prev=>!prev);
  }
  const handleIsPlaylistMenuClick = () =>{
    if(isPlaylistMenuClick&&isDeleteClick) setIsDeleteClick(false);
    setIsPlaylistMenuClick(prev=>!prev);
  }
  const handleUserInput = (input) =>{
    setUserInput(input);

  }
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'p' && event.target !== searchInputRef.current) {
        if(isPlaylistMenuClick&&isDeleteClick) setIsDeleteClick(false);
        setIsPlaylistMenuClick(true);
      }
    };
  
    window.addEventListener('keypress', handleKeyPress);
  
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleIsPlaylistMenuClick, searchInputRef]);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'p' && event.target !== playlistSetInputRef.current) {
        if(isPlaylistMenuClick&&isDeleteClick) setIsDeleteClick(false);
        setIsPlaylistMenuClick(false);
      }
    };
  
    window.addEventListener('keypress', handleKeyPress);
  
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleIsPlaylistMenuClick, playlistSetInputRef]);
  
  return (
    <div className={styles["side-controller"]}>
      <SearchEngineContainer
        isPlMenuClick = {isPlaylistMenuClick}
        onPlMenuClick = {handleIsPlaylistMenuClick}
        userInput = {userInput}
        onUserInput = {handleUserInput} 
        inputRef={searchInputRef}
      />
      {isPlaylistMenuClick && (
        <PlaylistSetContainer isPlMenuClick={isPlaylistMenuClick} onPlMenuClick={handleIsPlaylistMenuClick} inputRef={playlistSetInputRef}/>
      )}
      <SideContainer
        isDeleteClick= {isDeleteClick} 
        onIsDeleteClick={handleIsDeleteClick} 
        userInput={userInput}
      />
    </div>
  );
};

export default SideController;