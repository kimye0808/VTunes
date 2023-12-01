//react-redux store에서 SideContainerContents 으로 정보 받아오기
import {useSelector, useDispatch} from 'react-redux';
import { addMusic, changeCurrentPlaylist } from '../modules/musicController';
import SideContainerFooter from '../component/Container/SideController/SideContainer/SideContainerFooter';

const SideContainerFooterContainer = ({isDeleteClick, onIsDeleteClick}) =>{
  const currentPlaylist = useSelector(state =>state.musicController.currentPlaylist);//useSelector로 상태조회
  const currentMusic = useSelector(state=> state.musicController.currentMusic);
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);
  const isCurrentPlaylistViewed = useSelector(state=>state.musicController.isCurrentPlaylistViewed);
  const dispatch = useDispatch();//useDispatch로 액션 디스패치

  return (
    <SideContainerFooter
    isDeleteClick={isDeleteClick}
    onIsDeleteClick={onIsDeleteClick}

      currentPlaylist={currentPlaylist}
      currentMusic={currentMusic}
      selectedPlaylist={selectedPlaylist}
      isCurrentPlaylistViewed={isCurrentPlaylistViewed}
      onCurrentPlaylist={(playlist) => dispatch(changeCurrentPlaylist(playlist))}
      onAddMusic={(playlist, music, isCurrent)=>dispatch(addMusic(playlist, music))}
     />
  );
};

export default SideContainerFooterContainer;