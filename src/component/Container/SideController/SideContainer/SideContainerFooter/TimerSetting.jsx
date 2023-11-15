import React from "react";
import styles from "../../../../../styles/TimerSetting.module.css";
import timer from "../../../../../assets/base/timer.png";

const TimerSetting = () =>{
  return (
    <div className={styles["timer-setting"]}>
      <div className={styles["timer"]}>
        <img 
          src={timer}
          alt="timer"
        />
      </div>
      <div className={styles["rest-time"]}>
        <span>00:00</span>
      </div>
    </div>
  );
};

export default TimerSetting;