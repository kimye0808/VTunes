import React from "react";
import styles from "../styles/Container.module.css";
import AlbumContainer from "../containers/AlbumContainer";
import SideController from "./Container/SideController";

const Container = () =>{
  return (
    <div className={styles.container}>
      <AlbumContainer />
      <SideController />
    </div>
  );
};

export default Container;