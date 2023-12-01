import React from "react";
import {useSelector} from 'react-redux';
import styles from './VTunes.module.css';
import Container from './component/Container';
import ControlBarContainer from './containers/ControlBarContainer';
import TimerBoxContainer from "./containers/TimerBoxContainer.jsx";
import { Helmet } from 'react-helmet';
const VTunes = () => {
    const isShowTimerBox = useSelector(state=> state.musicController.isShowTimerBox);
    const currentMusic = useSelector(state=> state.musicController.currentMusic);

  return (
      <div className={styles.vtunes}>
        <Helmet>
        {
          (currentMusic&&currentMusic.name&&currentMusic.name!=="")? (
            <title>
              {currentMusic.name}
            </title>
          ):(
            <title>
              VTunes              
            </title>
          )
        }
        </Helmet>

          {isShowTimerBox && 
            <TimerBoxContainer />
          }
        <Container />
        <ControlBarContainer />
      </div>
  );
};

export default VTunes;
