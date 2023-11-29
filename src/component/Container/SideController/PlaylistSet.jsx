import React,{useEffect, useState} from "react";
import styles from "../../../styles/PlaylistSet.module.css";
import ScrollList from "../../common/ScrollList/ScrollList";
import PlaylistItem from "./PlaylistItem";

const PlaylistSet = ({
  isPlMenuClick, 
  onPlMenuClick, 
  listOfPlaylist, 
  onLoadAllPlaylists, 
  onSelectedPlaylist, 
  onAddPlaylist, 
  onDeletePlaylist,
  onIsCurrentPlaylistViewed,
  inputRef,
}) => {
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [isAddClick, setIsAddClick] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  
  useEffect(()=>{
    onLoadAllPlaylists();//listOfPlaylist를 로드한다
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isPlMenuClick])
  
  const handleDeleteClick = ()=>{
    setIsDeleteClick(prev=>!prev);
  }
  const handleAddClick = () =>{
    setIsAddClick(prev=>!prev);
  }
  const handleAddPlaylist = () => {//playlist json 파일 추가
    setIsAddClick(false);
  
    const playlistExists = listOfPlaylist&&listOfPlaylist.some(playlist => playlist.name === userInput);
  
    if (playlistExists || userInput === "") {
      setUserInput("");
      setIsAlert(true);
      setIsAddClick(true);
    } else {
      onAddPlaylist({ name: userInput, list: [] }); //redux store에 추가
      setUserInput("");
    }
  };
  
  const handleDeletePlaylist = ()=>{
    setIsDeleteClick(false);
  }
  const handleInputChange = (event) => { //adder-modal에서 입력시
    setUserInput(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddPlaylist();
    }
  };

  const buttonStyle = {
    fontSize: "20px",
    height: "70%",
    width: "35%",
  };

  return (

    <div className={styles["playlist-set-wrapper"]}>
      {isAddClick&&(//new playlist클릭시 뜨는 창 : adder-modal
        <div className={styles["adder-modal"]}>
          <span>{isAlert ? "Invalid Playlist Name" : "New Playlist"}</span>
          <div className={styles["search-engine"]} cypress-testid="playlist_name_input">
            <input ref = {inputRef}
              type="text"
              placeholder="       Enter the name for the New Playlist :)"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={styles["adder-modal-button-area"]}>
            <button className={styles["confirm-button"]} onClick={handleAddPlaylist} cypress-testid="confirm_button">Confirm</button>
            <button className={styles["cancel-button"]} onClick={() => { setIsAddClick(false); setIsAlert(false); }} cypress-testid="cancel_button">Cancel</button>
          </div>
        </div>
      )}
      <div className={styles["header"]} />{/*본문*/}
      <div className={styles["playlist-adder"]}>
        <button style={buttonStyle} onClick={handleAddClick} cypress-testid="new_playlist_button">New Playlist</button>
        <button style={buttonStyle} onClick={handleDeleteClick} cypress-testid="delete_playlist_button">Delete Playlist</button>
      </div>
      <div className={styles["playlist-set"]}>
        <ScrollList>
        {listOfPlaylist &&
          Array.isArray(listOfPlaylist) &&
          listOfPlaylist
            .filter(playlist => playlist.name !== "현재재생목록")
            .map((playlist, index) => (
              <div className={styles["playlist-wrapper"]} key={index}>
                <PlaylistItem 
                  buttonFlag={isDeleteClick}
                  playlistData={playlist}
                  onPlMenuClick={onPlMenuClick}//플레이리스트 선택하면 sideContainerContents보여주는 용도
                  onSelectedPlaylist={onSelectedPlaylist}
                  onDeletePlaylist={onDeletePlaylist}
                  onIsCurrentPlaylistViewed={onIsCurrentPlaylistViewed}
                />
              </div>
            ))
        }
        </ScrollList>
      </div>
    </div>
  );
};

export default PlaylistSet;
