//react-redux store에서 Album 으로 정보 받아오기
import {useSelector} from 'react-redux';
import Album from "../component/Container/Album";

const AlbumContainer = () => {
  const currentMusic = useSelector(state=> state.musicController.currentMusic);
  return <Album currentMusic = {currentMusic} />;
};

export default AlbumContainer;
