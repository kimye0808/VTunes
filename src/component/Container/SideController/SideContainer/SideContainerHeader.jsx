import React from "react";
import styles from "../../../../styles/SideContainerHeader.module.css";

const SideContainerHeader = ({selectedPlaylist}) =>{
  return (
    <div className={styles["side-container-header"]}>
      {selectedPlaylist && selectedPlaylist.playlistName ? (<span>{selectedPlaylist.playlistName}</span> ):(<span></span>)}
    </div>
  );
};

export default SideContainerHeader;