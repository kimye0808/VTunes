//react-redux store에서 SearchEngine 으로 정보 받아오기
import {useSelector, useDispatch} from 'react-redux';
import SearchEngine from '../component/Container/SideController/SearchEngine';
import { setIsCurrentPlaylistViewed } from '../modules/musicController';

const SearchEngineContainer = ({ isPlMenuClick, onPlMenuClick, userInput, onUserInput}) => {
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);
  const isCurrentPlaylistViewed = useSelector(state=> state.musicController.isCurrentPlaylistViewed);
  const dispatch = useDispatch();

  return(
    <SearchEngine 
    selectedPlaylist={selectedPlaylist}
    isPlMenuClick={isPlMenuClick}
    onPlMenuClick={onPlMenuClick}
    userInput={userInput}
    onUserInput={onUserInput}
    isCurrentPlaylistViewed={isCurrentPlaylistViewed}
    onIsCurrentPlaylistViewed = {(input)=>dispatch(setIsCurrentPlaylistViewed(input))}
    />
  );
};

export default SearchEngineContainer;