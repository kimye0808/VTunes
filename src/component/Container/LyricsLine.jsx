import {useSelector} from "react-redux";

const LyricsLine = ({time, children}) => {
  const musicPlayer = useSelector(state => state.musicController.musicPlayerRef);

  const handleClick = (event) => {
    if (!time) return;
    event.stopPropagation();
    musicPlayer.current.audio.current.currentTime = time;
  }

  return (
    <div style={{width: '100%', height: '60%', marginBottom: '15px'}}>
      <span onClick={handleClick}>{children}</span>
    </div>
  )
}

export default LyricsLine;