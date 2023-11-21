import styles from './VTunes.module.css';
import Container from './component/Container';
import ControlBarContainer from './containers/ControlBarContainer';
//나도 이게 맞는지 모르겠다
import TimerBox from "./TimerBox.jsx";
import {useSelector} from "react-redux";

const VTunes = () => {
    //여기에 타이머 박스 등장 조건 boolean 추가
    //showTimerBox boolean은 TimerSetting.jsx 파일에 있다
    const showTimerBox = useSelector(({musicController})=> musicController.showTimerBox);
  return (
    <div className={styles.vtunes}>
        {showTimerBox ? <TimerBox/> : null}
      <Container />
      <ControlBarContainer />
    </div>
  );
};

export default VTunes;
