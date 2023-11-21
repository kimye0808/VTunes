const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronApi", {
  selectMusicFile: ()=>ipcRenderer.invoke("select-music-file"),
  loadAll: ()=> ipcRenderer.invoke("load-all"),
  addPl: (playlist) => ipcRenderer.invoke("add-playlist", playlist),
  deletePl: (name) => ipcRenderer.invoke("delete-playlist", name),
  loadMusicFile: (playlist, path)=>ipcRenderer.invoke("load-music-file", playlist, path),
  addMusic: (playlist, music) => ipcRenderer.invoke("add-music", playlist, music),
  deleteMusic: (playlist, music)=>ipcRenderer.invoke("delete-music", playlist, music),
  changeSelectedPlaylist: (playlist) => ipcRenderer.invoke("change-selected-playlist", playlist),
  changeCurrentPlaylist: (playlist) => ipcRenderer.invoke("change-current-playlist", playlist),
  loadImgFile: (imgPath) => ipcRenderer.invoke("load-img-file", imgPath),
  loadLyricsFile: (lyricsPath) => ipcRenderer.invoke("load-lyrics-file", lyricsPath),
});

ipcRenderer.on('savePlaylistResponse', (event, success) => {
  // 저장 결과에 대한 처리를 여기에 추가
  if (success) {
    console.log('Playlist saved successfully.');
  } else {
    console.error('Failed to save playlist.');
  }
});