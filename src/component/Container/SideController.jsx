import React, { useEffect, useState } from "react";
import styles from "../../styles/SideController.module.css";

import SideContainer from "./SideController/SideContainer";
import PlaylistSetContainer from "../../containers/PlaylistSetContainer";
import SearchEngineContainer from "../../containers/SearchEngineContainer";

const SideController = () =>{
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
  
  return (
    <div className={styles["side-controller"]}>
      <SearchEngineContainer
        isPlMenuClick = {isPlaylistMenuClick}
        onPlMenuClick = {handleIsPlaylistMenuClick}
        userInput = {userInput}
        onUserInput = {handleUserInput} 
      />
      {isPlaylistMenuClick && (
        <PlaylistSetContainer isPlMenuClick={isPlaylistMenuClick} onPlMenuClick={handleIsPlaylistMenuClick}/>
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