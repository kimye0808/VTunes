import {useState} from "react";
import Controller from "../domain/Controller";
import H5AudioPlayer from "react-h5-audio-player";
import Playlist from "../domain/Playlist";

const ControlBar = () => {
  const [controller, setController] = useState(new Controller(new Playlist()));
  const [curr, setCurr] = useState("local://C:\\Users\\LEE\\Downloads\\Quick Share\\1.mp3");

  return (
    <>
      <button onClick={()=> setCurr(controller.prev())}>이전곡</button>
      <H5AudioPlayer autoPlay src={curr}
                     onEnded={() => setCurr(controller.next())}/>
      <button onClick={()=> setCurr(controller.next())}>다음곡</button>
    </>
  );
};

export default ControlBar;