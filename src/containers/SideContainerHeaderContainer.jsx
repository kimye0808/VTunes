//react-redux store에서 SideContainerHeader으로 정보 받아오기 
import {useSelector} from 'react-redux';
import SideContainerHeader from "../component/Container/SideController/SideContainer/SideContainerHeader";

const SideContainerHeaderContainer = () => {
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);
  const currentPlaylist = useSelector(state =>state.musicController.currentPlaylist);//useSelector로 상태조회
  const isCurrentPlaylistViewed  = useSelector(state=>state.musicController.isCurrentPlaylistViewed);
  return <SideContainerHeader 
  selectedPlaylist = {selectedPlaylist} 
  currentPlaylist={currentPlaylist} 
  isCurrentPlaylistViewed={isCurrentPlaylistViewed}
  />;
};

export default SideContainerHeaderContainer;