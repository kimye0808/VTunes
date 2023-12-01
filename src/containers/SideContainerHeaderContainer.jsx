//react-redux store에서 SideContainerHeader으로 정보 받아오기 
import {useSelector, useDispatch} from 'react-redux';
import SideContainerHeader from "../component/Container/SideController/SideContainer/SideContainerHeader";
import { changePlaylistName } from '../modules/musicController';

const SideContainerHeaderContainer = () => {
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);
  const currentPlaylist = useSelector(state =>state.musicController.currentPlaylist);//useSelector로 상태조회
  const isCurrentPlaylistViewed  = useSelector(state=>state.musicController.isCurrentPlaylistViewed);
  const dispatch = useDispatch();//useDispatch로 액션 디스패치

  return <SideContainerHeader 
  selectedPlaylist = {selectedPlaylist} 
  currentPlaylist={currentPlaylist} 
  isCurrentPlaylistViewed={isCurrentPlaylistViewed}

  onPlaylistName={(playlist, newName)=>dispatch(changePlaylistName(playlist, newName))}
  />;
};

export default SideContainerHeaderContainer;