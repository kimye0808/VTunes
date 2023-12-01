import React from "react";
import styles from "./ScrollList.module.css";

const ScrollList = ({ children }) => {
  return (
    <div className={styles["scroll-list-container"] } data-testid = "scrollList">
      <div className={styles["scroll-list"]}>{children}</div>
    </div>
  );
};

export default ScrollList;
