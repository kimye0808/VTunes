import {useRef, useState, useEffect} from "react";
import Controller from "../domain/Controller";
import Playlist from "../domain/Playlist";
import styles from "../styles/Footer.module.css";
import MusicPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import '../styles/ControlBar.css';
import currentPl from '../assets/base/currentPl.png';
import shuffleIcon from '../assets/base/shuffle.png';
import currentPlHover from '../assets/hover/currentPl.png';
import shuffleIconHover from '../assets/hover/shuffle.png';
import currentPlClick from '../assets/onClick/currentPl.png';
import shuffleIconClick from '../assets/onClick/shuffle.png';
import repCurrBase from "../assets/base/Repeat_Current.png"
import repOnBase from "../assets/base/Repeat_On.png"
import repOffBase from "../assets/base/Repeat_Off.png"

  //Enum for repeat states
  const repeatStates = Object.freeze({
    OFF: 0,
    CURRENT: 1,
    ON: 2
  })

const RepeatButton = ({repeatStatus, modRepeatStatus}) => {

  // State of Repeat button
  const [repeatImage, setRepeatImage] = useState(repOffBase);
  const handleRepeatClick = ()=>{
  switch (repeatStatus) {
    case repeatStates.OFF:
      setRepeatImage(repCurrBase);
      modRepeatStatus(repeatStates.CURRENT);
      break;
    case repeatStates.CURRENT:
      setRepeatImage(repOnBase);
      modRepeatStatus(repeatStates.ON);
      break;
    case repeatStates.ON:
      setRepeatImage(repOffBase);
      modRepeatStatus(repeatStates.OFF);
      break;
    default:
      modRepeatStatus(repeatStatus);
      break;
    };
  };

  //Return as button
  return (
    <img
      src={repeatImage}
      alt="repeat"
      cypress-testid="repeat_button"
      onClick={() => {
        handleRepeatClick();
      }}
    />
  );
};//RepeatButton

const ControlBar = ({
  selectedPlaylist, 
  currentPlaylist, 
  currentMusic, 
  repeatStatus,
  onPrevMusic, 
  onNextMusic,
  onRepeatCurrentMusic, 
  isCurrentPlaylistViewed, 
  onIsCurrentPlaylistViewed,
  modRepeatStatus,
  onShuffle,
  onMusicPlayerRef,
}) => {
  const musicPlayerRef = useRef();
  useEffect(() => {
    onMusicPlayerRef(musicPlayerRef);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicPlayerRef]);
  const [imgCurrentPlClick, setImgCurrentPlClick] = useState(false);
  const [imgCurrentPlHover, setImgCurrentPlHover] = useState(false);
  const [imgShuffleClick, setImgShuffleClick] = useState(false);
  const [imgShuffleHover, setImgShuffleHover] = useState(false);

  const currentPlImage = imgCurrentPlClick ? currentPlClick : imgCurrentPlHover ? currentPlHover : currentPl;
  const shuffleIconImage = imgShuffleClick ? shuffleIconClick : imgShuffleHover ? shuffleIconHover : shuffleIcon;
  const shouldDisableClick = !selectedPlaylist.list || selectedPlaylist.list.length === 0;

  const handleClickControlBar = () =>{
    if(isCurrentPlaylistViewed) onIsCurrentPlaylistViewed(false);
    else onIsCurrentPlaylistViewed(true);
  }
  return (
    <div className={styles["footer"]} >
      <div className={styles["button-area"]}>
        <RepeatButton repeatStatus={repeatStatus} modRepeatStatus={modRepeatStatus}/>
        <img 
          src={shuffleIconImage}
          alt={"셔플"}
          cypress-testid="shuffle_button"
          onClick={() => {
            setImgShuffleClick(prev => !prev);
            setTimeout(() => setImgShuffleClick(false), 200);
            onShuffle();
          }}
          onMouseEnter={() => setImgShuffleHover(true)}
          onMouseLeave={() => setImgShuffleHover(false)}
        />
        <div className={styles["current-playlist-menu"]}>
        {shouldDisableClick ? (
          <img
            src={currentPl}
            alt={"현재재생목록 보기"}
            cypress-testid="current_playlist_button_inactive"
          />
        ) : (
          <img 
            src={currentPlImage}
            alt={"현재재생목록 보기"}
            cypress-testid="current_playlist_button_active"
            onClick={() => {
            setImgCurrentPlClick(prev => !prev);
            setTimeout(() => setImgCurrentPlClick(false), 200);
            handleClickControlBar();
            }}
            onMouseEnter={() => setImgCurrentPlHover(true)}
            onMouseLeave={() => setImgCurrentPlHover(false)}
          />
        )}
        </div>
      </div>
      <MusicPlayer ref = {musicPlayerRef}
        autoPlay src={currentMusic? "local://".concat(currentMusic.path) : ""}
        showJumpControls={false}
        showSkipControls={true}
        onClickPrevious={() => {
          onPrevMusic();
        }}
        onClickNext={() => {
          onNextMusic();
        }}
        onEnded={() => {//음악이 끝나면 자동으로 무엇을 할것인가
          switch(repeatStatus){
            case 0://반복 없음
              break;
            case 1://한곡 반복
              // 현재 시간을 0으로 설정하고 노래를 다시 시작
              if (musicPlayerRef.current) {
                const audioElement = musicPlayerRef.current.audio.current;
                audioElement.currentTime = 0;
                audioElement.play();
              }
              break;
            case 2://플리 반복
              onNextMusic();
              break;
            default:
              onNextMusic();
          }
        }}
        showFiledVolumn={true} 
      />
    </div>
  );
};

export default ControlBar;