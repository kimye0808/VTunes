import React from "react";
import styles from "../../../../styles/SideContainerFooter.module.css";
import Adder from "./SideContainerFooter/Adder";
import TimerSettingContainer from "../../../../containers/TimerSettingContainer";

const SideContainerFooter = ({ 
  isDeleteClick, //deleter (-) 뜨게 하는지 안뜨게 하는지
  onIsDeleteClick, 
  currentPlaylist, 
  currentMusic, 
  selectedPlaylist, 
  isCurrentPlaylistViewed, 
  onCurrentPlaylist,
  onAddMusic
}) =>{
  return (
    <div className={styles["side-container-footer"]}>
      <Adder 
      isDeleteClick={isDeleteClick} 
      onIsDeleteClick={onIsDeleteClick} 
      currentPlaylist={currentPlaylist}
      currentMusic={currentMusic}
      selectedPlaylist = {selectedPlaylist} 
      isCurrentPlaylistViewed = {isCurrentPlaylistViewed}
      onCurrentPlaylist = {onCurrentPlaylist}
      onAddMusic={onAddMusic} 
      />
      <TimerSettingContainer />
    </div>
  );
};

export default SideContainerFooter;