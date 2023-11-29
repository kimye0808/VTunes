import React, { useState, useEffect } from "react";
import styles from "../../../../../styles/TimerSetting.module.css";
import timerBase from "../../../../../assets/base/timer.png";
import timerHover from "../../../../../assets/hover/timer.png";
import timerClick from "../../../../../assets/onClick/timer.png";
import binBase from "../../../../../assets/base/trashbin.png";
import binClick from "../../../../../assets/onClick/trashbin.png";
import { secondsToMinutes } from "../../../../common/durationHelper";

const TimerSetting = ({
    isShowTimerBox, 
    isStartReduceTime,  
    restTime,
    musicPlayerRef, 
    onRestTime, 
    onShowTimerBox, 
    onReduceRestTime,
    onIsStartReduceTime
}) =>{
    //For timer icon
    const [imgTimerClick, setImgTimerClick] = useState(false);
    const [imgTimerHover, setImgTimerHover] = useState(false);
    //For reset-time
    const [imgResetClick, setImgResetClick] = useState(false);
    const [imgResetHover, setImgResetHover] = useState(false);
    //timer icon image
    const timerImage = imgTimerClick ? timerClick : imgTimerHover ? timerHover : timerBase;
    //Reset-time trashBin image
    const binImage = imgResetClick ? binClick : binBase;

    useEffect(() => {
        let intervalId;
      
        if (isStartReduceTime && restTime > 0) {
          intervalId = setInterval(() => {
            onReduceRestTime();
          }, 1000);
        }
        if (restTime === 0 && musicPlayerRef.current) {
            musicPlayerRef.current.audio.current.pause();
            onIsStartReduceTime(false);
            onReduceRestTime(0);
          }
        return () => clearInterval(intervalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isStartReduceTime, restTime, onReduceRestTime]);
    return (
        <div className={styles["timer-setting"]}>
            <div className={styles["button-area"]}>
                <div className={styles["timer"]} cypress-testid="timer_button">
                    <img
                        src={timerImage}
                        alt="timerImage"
                        onClick={() => {
                            setImgTimerClick(true);
                            onShowTimerBox(!isShowTimerBox);
                            setTimeout(() => {
                                setImgTimerClick(prev=>!prev);
                            }, 250);
                        }}
                        onMouseEnter={() => setImgTimerHover(true)}
                        onMouseLeave={() => setImgTimerHover(false)}
                    />
                </div>
            </div>
            <div className={styles["reset-time"]}>
                <div className={styles["button-area"]}>
                    <div className={styles["reset"]} cypress-testid="time_left">
                        {imgResetHover&&restTime !== -1 &&restTime !== 0? <img
                            src={binImage}
                            alt="reset"
                            onClick={() => {
                                setImgResetClick(true);
                                setTimeout(() => {
                                    setImgResetClick(prev=>!prev);
                                }, 250);
                                onIsStartReduceTime(false);
                                onRestTime(-1);
                            }}

                            onMouseEnter={() => setImgResetHover(true)}
                            onMouseLeave={() => setImgResetHover(false)}
                            />
                            : <span
                                onClick={() => {
                                    setImgResetClick(prev=>!prev);
                                }}
                                onMouseEnter={() => setImgResetHover(true)}
                                onMouseLeave={() => setImgResetHover(false)}
                            >{restTime === -1 || restTime === 0 ? "00:00" :
                            secondsToMinutes(restTime)}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimerSetting;