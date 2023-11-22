import React from "react";
import {useSelector} from 'react-redux';
import styles from './VTunes.module.css';
import Container from './component/Container';
import ControlBarContainer from './containers/ControlBarContainer';
import TimerBoxContainer from "./containers/TimerBoxContainer.jsx";

const VTunes = () => {
    const isShowTimerBox = useSelector(state=> state.musicController.isShowTimerBox);
  return (
    <div className={styles.vtunes}>
        {isShowTimerBox && 
          <TimerBoxContainer />
        }
      <Container />
      <ControlBarContainer />
    </div>
  );
};

export default VTunes;
