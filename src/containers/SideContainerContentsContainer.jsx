//react-redux store에서 SideContainerContents 으로 정보 받아오기
import {useSelector, useDispatch} from 'react-redux';
import SideContainerContents from '../component/Container/SideController/SideContainer/SideContainerContents';
import { changeCurrentMusic, changeCurrentPlaylist, changeSelectedPlaylist, deleteMusic, setIsCurrentPlaylistViewed, addPlaylist, addMusic } from '../modules/musicController';

const SideContainerContentsContainer = ({ isDeleteClick, userInput}) =>{
  const listOfPlaylist = useSelector(state => state.musicController.listOfPlaylist);
  const currentPlaylist = useSelector(state =>state.musicController.currentPlaylist);//useSelector로 상태조회
  const currentMusic = useSelector(state=> state.musicController.currentMusic);
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);
  const isCurrentPlaylistViewed = useSelector(state=>state.musicController.isCurrentPlaylistViewed);

  const dispatch = useDispatch();//useDispatch로 액션 디스패치

  return (
    <SideContainerContents
    isDeleteClick={isDeleteClick}
    userInput={userInput}
      
      listOfPlaylist={listOfPlaylist}
      selectedPlaylist={selectedPlaylist}
      currentPlaylist={currentPlaylist}
      currentMusic={currentMusic}
      isCurrentPlaylistViewed={isCurrentPlaylistViewed}

      onSelectedPlaylist={(playlist)=>dispatch(changeSelectedPlaylist(playlist))}
      onCurrentPlaylist={(playlist)=>dispatch(changeCurrentPlaylist(playlist))}
      onCurrentMusic={(music)=>dispatch(changeCurrentMusic(music))}
      onDeleteMusic={(playlist, music)=>dispatch(deleteMusic(playlist, music))}
      onIsCurrentPlaylistViewed={(input)=>dispatch(setIsCurrentPlaylistViewed(input))}
      onAddPlaylist={(playlist)=>dispatch(addPlaylist(playlist))}
      onAddMusic={(playlist, music)=>dispatch(addMusic(playlist, music))}
     />
  );
};

export default SideContainerContentsContainer;