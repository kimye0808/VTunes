import React, { useState, useEffect} from "react";
import styles from "../../../styles/SearchEngine.module.css";
import search from '../../../assets/base/search.png';
import plMenu from '../../../assets/base/playlist_menu.png';
import searchHover from '../../../assets/hover/search.png';
import plMenuHover from '../../../assets/hover/playlist_menu.png';
import searchClick from '../../../assets/onClick/search.png';
import plMenuClick from '../../../assets/onClick/playlist_menu.png';

const SearchEngine = ({ onPlMenuClick, onIsSearch, onSearchResult, selectedPlaylist}) => {
  const [userInput, setUserInput] = useState("");
  const [imgSearchClick, setImgSearchClick] = useState(false);
  const [imgPlMenuClick, setImgPlMenuClick] = useState(false);
  const [imgSearchHover, setImgSearchHover] = useState(false);
  const [imgPlMenuHover, setImgPlMenuHover] = useState(false);
  
  const searchImage = imgSearchClick ? searchClick : imgSearchHover ? searchHover : search;
  const plMenuImage = imgPlMenuClick ? plMenuClick : imgPlMenuHover ? plMenuHover : plMenu;

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setUserInput(inputText);
    
    // 입력값이 존재하는지 여부에 따라 onIsSearch 호출
    onIsSearch(!!inputText); // !!inputText를 사용하여 불리언 값으로 변환
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // input에 enter쳐도 실행되게 할건데 아직 구현x
    }
  };

  const filterPlaylist = () => {
    if(selectedPlaylist){
      const filtered = selectedPlaylist.musics.filter((music) =>
        music.musicName.includes(userInput)
      );
      onSearchResult({musics: filtered}); // 필터된 배열을 콜백으로 전달
    }else{
      onSearchResult({musics: []});
    }

  };

  useEffect(() => {
    // userInput이 변경될 때마다 필터된 플레이리스트 업데이트
    filterPlaylist();
  }, [userInput]);


  return (
    <div className={styles["search-engine-wrapper"]}>
      <div className={styles["search-engine-area"]}>
          <div className={styles["search-engine"]}>
          <input
            type="text"
            placeholder="            Search Music in Playlist"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {!userInput && (
            <div className={styles["search-icon"]}>
              <img
                src={searchImage}
                alt="search"
                onClick={() => {
                  setImgSearchClick(prev=>!prev);
                  setTimeout(() => setImgSearchClick(false), 200);
                }}
                onMouseEnter={() => setImgSearchHover(true)}
                onMouseLeave={() => setImgSearchHover(false)}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles["playlist-menu"]} onClick={onPlMenuClick}>
        <img
          src={plMenuImage}
          alt="playlistMenu"
          onClick={() => {
            setImgPlMenuClick(true);
            setTimeout(() => setImgPlMenuClick(false), 100);
          }}
          onMouseEnter={() => setImgPlMenuHover(true)}
          onMouseLeave={() => setImgPlMenuHover(false)}
        />
      </div>
    </div>
  );
};

export default SearchEngine;
