import React from "react";
import styles from "../../../../styles/SideContainerHeader.module.css";

const SideContainerHeader = ({selectedPlaylist, currentPlaylist, isCurrentPlaylistViewed}) =>{
  const playlistToRender = isCurrentPlaylistViewed ? currentPlaylist : selectedPlaylist;
  return (
    <div className={styles["side-container-header"]}>
      {playlistToRender && playlistToRender.name ? (<span>{playlistToRender.name}</span> ):(<span></span>)}
    </div>
  );
};

export default SideContainerHeader;