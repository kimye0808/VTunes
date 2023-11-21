import React from "react";
import styles from "../../../styles/SideContainer.module.css";
import SideContainerFooter from "./SideContainer/SideContainerFooter";
import SideContainerHeaderContainer from "../../../containers/SideContainerHeaderContainer";
import SideContainerContentsContainer from "../../../containers/SideContainerContentsContainer";
import SideContainerFooterContainer from "../../../containers/SideContainerFooterContainer";

const SideContainer = ({isDeleteClick, onIsDeleteClick, userInput }) =>{
  return (
    <div className={styles["side-container"]}>
      <SideContainerHeaderContainer/>
      <SideContainerContentsContainer
        isDeleteClick={isDeleteClick}
        userInput={userInput}
      />
      <SideContainerFooterContainer
        isDeleteClick={isDeleteClick}
        onIsDeleteClick={onIsDeleteClick}
      />
    </div>
  );
};

export default SideContainer;