import React from "react";
import ScrollList from "../../../common/ScrollList/ScrollList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MusicItem from "./MusicItem";
import styles from "../../../../styles/SideContainerContents.module.css";

const SideContainerContents = ({
  isDeleteClick,
  userInput,
  listOfPlaylist,
  selectedPlaylist,
  currentPlaylist,
  currentMusic,
  isCurrentPlaylistViewed,
  onSelectedPlaylist,
  onCurrentPlaylist,
  onCurrentMusic,
  onDeleteMusic,
  onIsCurrentPlaylistViewed,
  onAddPlaylist,
  onAddMusic,
}) => {
  //보여줄 플레이리스트는 현재재생목록 이거나 selected Playlist
  const playlistToRender = isCurrentPlaylistViewed
    ? currentPlaylist
    : selectedPlaylist;
    
  /*뮤직 아이템을 클릭하면 해당 음악으로 현재 음악 설정 + 현재 플레이리스트 설정*/
  const handleCurrent = async(musicData) => {
    const result = await window.electronApi.deletePl("현재재생목록");
    console.log(result);
    //빈 현재재생목록 추가 -> selectPlaylist 내용을 현재재생목록에 카피
    const playlistExists = listOfPlaylist.some(
      (playlist) => playlist.name === "현재재생목록"
    );
    if (!playlistExists) {
      onAddPlaylist({ name: "현재재생목록", list: [] });
    }
    onCurrentPlaylist(selectedPlaylist);
    onCurrentMusic(musicData);
  };
  
  /*플레이리스트 내부에서 드래그 앤 드랍 처리*/
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(playlistToRender.list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // 플레이리스트 항목의 순서를 업데이트합니다.
    if (isCurrentPlaylistViewed) {
      onCurrentPlaylist({ ...playlistToRender, list: items });
    } else {
      onSelectedPlaylist({ ...playlistToRender, list: items });
    }
  };

  /*VTunes 바깥에서 드래그 앤 드랍 했을시*/
  const handleDrop = async(event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(files);
    // 파일을 playlistToRender에 추가, files는 복수개 가능하며 file 하나는 {name: , path: }이런 구조
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 파일 확장자 확인
      const allowedExtensions = ["mp3", "ogg", "wav"];
      const fileExtension = file.path.split('.').pop().toLowerCase();
  
      if (allowedExtensions.includes(fileExtension)) {
        //현재재생목록에 추가할지, selected Playlist에서 추가할지
        const currentWorkingPlaylist = isCurrentPlaylistViewed? currentPlaylist : selectedPlaylist;
        // loadMusicFile 함수 실행
        const music = await window.electronApi.loadMusicFile(currentWorkingPlaylist, file.path);
        
        // 받아온 music을 onAddMusic을 통해서 추가
        console.log(music);
        if (music) {

          // Check if the music already exists in the playlist
          const isDuplicate = currentWorkingPlaylist.list.some(existingMusic => existingMusic.path === music.path);

          if (isDuplicate) {
            alert("이미 추가된 음악입니다.");
          } else {
            onAddMusic(currentWorkingPlaylist, music);
          }
        } else {
          alert("음악 파일의 정보를 읽어오는데 실패했습니다.");
        }
      } else {
        alert("파일 확장자가 다릅니다. 음악 파일을 선택해주세요.");
      }
      
    }
  };


  return (
    <div className={styles["side-container-contents"]} 
      onDrop={handleDrop}//이건 electron외부 파일에서 드래그 앤 드랍했을시 
      onDragOver={(e) => e.preventDefault()}
      >
      <ScrollList>
        <DragDropContext onDragEnd={handleDragEnd}>
          {/*드래그 가능 영역, 플레이리스트 내부에서 드래그 앤 드랍했을시*/}
          <Droppable droppableId="playlist">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {userInput &&
                playlistToRender.list.filter((musicData) =>
                  musicData.name.toLowerCase().includes(userInput.toLowerCase())
                ).length === 0 ? (
                  <div className={styles["music-wrapper"]}>
                    <span
                      style={{
                        width: "100%",
                        height: "100%",
                        fontSize: "20px",
                      }}
                    >
                      No Results Found (｡•́︿•̀｡)
                    </span>
                  </div>
                ) : (
                  playlistToRender.list
                    .filter(
                      (musicData) =>
                        !userInput || musicData.name.toLowerCase().includes(userInput.toLowerCase())
                    )
                    .map((musicData, index) => (
                      <Draggable //드래그 가능한 컴포넌트
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={styles["music-wrapper"]}
                              key={index}
                            >
                              <MusicItem
                                buttonFlag={isDeleteClick}
                                musicData={musicData}
                                isPlaying={
                                  isCurrentPlaylistViewed &&
                                  currentMusic &&
                                  currentMusic.name === musicData.name&&
                                  currentMusic.artist === musicData.artist
                                }
                                playlistToRender={playlistToRender}
                                onDeleteMusic={onDeleteMusic}
                                onCurrent={handleCurrent} //이건 selectedPlaylist에서 선택시 처리하는 용도
                                onCurrentMusic={onCurrentMusic} //이건 currentPlaylist에서 선택시 처리
                                onIsCurrentPlaylistViewed={
                                  onIsCurrentPlaylistViewed
                                }
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollList>
    </div>
  );
};

export default SideContainerContents;
