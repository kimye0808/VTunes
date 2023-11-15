import React from "react";
import styles from "../../../../styles/SideContainerFooter.module.css";
import TimerSetting from "./SideContainerFooter/TimerSetting";
import Adder from "./SideContainerFooter/Adder";

const SideContainerFooter = ({currentPlaylist, onCurrentPlaylist, onIsDeleteClick}) =>{
  return (
    <div className={styles["side-container-footer"]}>
      <Adder onIsDeleteClick={onIsDeleteClick}/>
      <TimerSetting />
    </div>
  );
};

export default SideContainerFooter;