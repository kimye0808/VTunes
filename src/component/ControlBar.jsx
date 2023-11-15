import {useState} from "react";
import Controller from "../domain/Controller";
import Playlist from "../domain/Playlist";
import styles from "../styles/Footer.module.css";
import MusicPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';

const ControlBar = () => {
  const [controller, setController] = useState(new Controller(new Playlist()));
  const [curr, setCurr] = useState("local://C:\\Users\\LEE\\Downloads\\Quick Share\\1.mp3");

  const next = () => setCurr(controller.next());
  const prev = () => setCurr(controller.prev());

  return (
    <div className={styles.footer}>
      <MusicPlayer autoPlay src={curr}
                   showJumpControls={false}
                   showSkipControls={true}
                   onClickPrevious={prev}
                   onClickNext={next}
                   onEnded={next}
                   showFiledVolumn={true} />
    </div>
  );
};

export default ControlBar;