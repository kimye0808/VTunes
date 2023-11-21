import React, { useState } from "react";
import styles from "../../../../../styles/TimerSetting.module.css";
import timerBase from "../../../../../assets/base/timer.png";
import timerHover from "../../../../../assets/hover/timer.png";
import timerClick from "../../../../../assets/onClick/timer.png";
import binBase from "../../../../../assets/base/trashbin.png";
import binClick from "../../../../../assets/onClick/trashbin.png";
import {useDispatch, useSelector} from "react-redux";
import {modShowTimerBox} from "../../../../../modules/musicController";



const TimerSetting = () =>{
    const dispatch = useDispatch();

    const modTimerBox = () => dispatch(modShowTimerBox(true));
    //For timer icon
    const [imgTimerClick, setImgTimerClick] = useState(false);
    const [imgTimerHover, setImgTimerHover] = useState(false);
    //For reset-time
    const [imgResetClick, setImgResetClick] = useState(false);
    const [imgResetHover, setImgResetHover] = useState(false);
    //timer icon image
    const timerImage = imgTimerClick ? timerClick : imgTimerHover ? timerHover : timerBase;
    //Reset-time value
    const timeString = "00:14";
    //Reset-time trashBin image
    const binImage = imgResetClick ? binClick : binBase;

    return (
        <div className={styles["timer-setting"]}>
            <div className={styles["button-area"]}>
                <div className={styles["timer"]}>
                    <img
                        src={timerImage}
                        alt="timerImage"
                        onClick={() => {
                            setImgTimerClick(true);
                            modTimerBox();
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
                    <div className={styles["reset"]}>
                        {imgResetHover ? <img
                            src={binImage}
                            alt="reset"
                            onClick={() => {
                                setImgResetClick(true);
                                setTimeout(() => {
                                    setImgResetClick(prev=>!prev);
                                }, 250);
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
                            >{timeString}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimerSetting;