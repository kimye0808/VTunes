//react-redux store에서 SideContainer 으로 정보 받아오기
import {useSelector, useDispatch} from 'react-redux';
import SideContainer from '../component/Container/SideController/SideContainer';
import { changeCurrentMusic, changeCurrentPlaylist } from '../modules/musicController';

const SideContainerContainer = ({ isDeleteClick, onIsDeleteClick, isSearch, searchResult, selectedPlaylist}) =>{
  const currentPlaylist = useSelector(({musicController})=> musicController.currentPlaylist);//useSelector로 상태조회
  const currentMusic = useSelector(({musicController})=> musicController.currentMusic);//useDispatch로 액션 디스패치
  const dispatch = useDispatch();

  return (
    <SideContainer
      currentPlaylist={currentPlaylist}
      currentMusic={currentMusic}
      onCurrentPlaylist={()=>dispatch(changeCurrentPlaylist())}
      onCurrentMusic={()=>dispatch(changeCurrentMusic())} 
      
      isDeleteClick={isDeleteClick}
      onIsDeleteClick={onIsDeleteClick}
      isSearch={isSearch}
      searchResult={searchResult}
      selectedPlaylist={selectedPlaylist}
     />
  );
};

export default SideContainerContainer;