//react-redux store에서 TimerSetting으로 정보 받아오기
import {useDispatch, useSelector} from 'react-redux';
import { modShowTimerBox, reduceRestTime, setIsStartReduceTime, setRestTime } from '../modules/musicController';
import TimerSetting from '../component/Container/SideController/SideContainer/SideContainerFooter/TimerSetting';

const TimerSettingContainer = () => {
  const isShowTimerBox = useSelector(state=> state.musicController.isShowTimerBox);
  const isStartReduceTime = useSelector(state=>state.musicController.isStartReduceTime);
  const musicPlayerRef = useSelector(state=>state.musicController.musicPlayerRef);
  const restTime = useSelector(state=> state.musicController.restTime);
  const dispatch = useDispatch();
  return (
  <TimerSetting 
    isShowTimerBox={isShowTimerBox} 
    isStartReduceTime={isStartReduceTime}
    restTime={restTime} 
    musicPlayerRef={musicPlayerRef}
    onRestTime={(time)=>dispatch(setRestTime(time))}
    onShowTimerBox={(flag)=>dispatch(modShowTimerBox(flag))}
    onReduceRestTime={()=>dispatch(reduceRestTime())}
    onIsStartReduceTime={(flag)=>dispatch(setIsStartReduceTime(flag))}
  />
  );
};

export default TimerSettingContainer;