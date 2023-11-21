import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import styles from "./styles/TimerBox.module.css";
import timerIcon from "./assets/base/Timer_Icon.png";
import {modShowTimerBox} from "./modules/musicController";



const TimerBox = () =>{
    //TimerSetting 한테 박스 끄라고 전할 방법이 필요하다
    //const showTimerBox = useSelector(({musicController})=> musicController.showTimerBox);
    const dispatch = useDispatch();

    const modTimerBox = () => dispatch(modShowTimerBox(false));
    //contents of the timer box
    return(
        <div className={styles["timerBox_container"]}>
            <div className={styles["timerBox_header"]}>
                <img
                    src={timerIcon}
                    alt="Timer Icon"
                />
                <span className={styles["text"]}>
                    Sleep Timer
                </span>
            </div>
            <div className={styles["timerBox_body"]}>
                <div className={styles["timer_button-area"]}>
                    <button className={styles["five-button"]}>5 minutes</button>
                    <button className={styles["fifteen-button"]}>15 minutes</button>
                    <button className={styles["thirty-button"]}>30 minutes</button>
                    <button className={styles["sixty-button"]}>60 minutes</button>
                </div>

            </div>
            <div className={styles["timerBox_footer"]}>
                <div className={styles["button-area"]}>
                    <button className={styles["confirm-button"]}>Confirm</button>
                    <button className={styles["cancel-button"]}
                        onClick={modTimerBox}>Cancel</button>
                </div>
            </div>
        </div>
    );

}

export default TimerBox;
