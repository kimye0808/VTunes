//react-redux store에서 TimerBox으로 정보 받아오기
import {useDispatch, useSelector} from 'react-redux';
import { modShowTimerBox, setIsStartReduceTime, setRestTime } from '../modules/musicController';
import TimerBox from '../TimerBox';

const TimerBoxContainer = () => {
  const isShowTimerBox = useSelector(state=> state.musicController.isShowTimerBox);
  const dispatch = useDispatch();
  return (
  <TimerBox 
    isShowTimerBox={isShowTimerBox}  
    onShowTimerBox={(flag)=>dispatch(modShowTimerBox(flag))}
    onIsStartReduceTime={(flag)=>dispatch(setIsStartReduceTime(flag))}
    onRestTime={(time)=>dispatch(setRestTime(time))}
  />
  );
};

export default TimerBoxContainer;