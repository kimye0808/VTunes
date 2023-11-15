//reducer
//action 설정
const SET_PLAYLIST = 'musicController/SET_PLAYLIST';
const SET_MUSIC = 'musicController/SET_MUSIC';
const PREVIOUS_MUSIC = 'musicController/PREVIOUS_MUSIC';
const NEXT_MUSIC = 'musicController/NEXT_MUSIC';
const MOD_SHUFFLE_STATUS = 'musicController/MOD_SHUFFLE_STATUS';
const MOD_REPEAT_STATUS = 'musicController/MOD_REPEAT_STATUS';

//컴포넌트들에서 dispatch될 액션들
export const changeCurrentPlaylist = playlist => ({
  type : SET_PLAYLIST,
  playlist
});
export const changeCurrentMusic = music => ({
  type : SET_MUSIC,
  music
});
export const previousMusic = () => ({
  type : PREVIOUS_MUSIC,
});
export const nextMusic = () => ({
  type : NEXT_MUSIC,
});
export const modShuffleStatus = (input) => ({
  type : MOD_SHUFFLE_STATUS,
  input
});
export const modRepeatStatus = (input) => ({
  type : MOD_REPEAT_STATUS,
  input
});

//repeatStatue와 shuffleStatus
const repeatStatus = {
  REPEAT_ON: 2, 
  REPEAT_CURRENT: 1,
  REPEAT_OFF: 0,
};
Object.freeze(repeatStatus);
const shuffleStatus = {
  SHUFFLE_ON: 1,
  SHUFFLE_OFF: 0,
};
Object.freeze(shuffleStatus);


//initial state
const initialState = {
  currentPlaylist : null,
  currentMusic : null,
  repeatStatus : repeatStatus.REPEAT_OFF,
  shuffleStatus : shuffleStatus.SHUFFLE_OFF,
}

//reducer function
function musicController(state = initialState, action){
  var currentPlaylist;
  var currentMusic;
  
  switch(action.type){

    case SET_PLAYLIST:
      return {
        ...state,
        currentPlaylist : action.playlist
      };

    case SET_MUSIC:
      return {
        ...state,
        currentMusic : action.music
      };

    case PREVIOUS_MUSIC:
      currentPlaylist = state.currentPlaylist;
      currentMusic = state.currentMusic;
    
      if (currentPlaylist && currentPlaylist.listOfMusic.length > 0) {
        let currentIndex = currentPlaylist.listOfMusic.findIndex(music => music === currentMusic);
    
        if (currentIndex !== -1) {
          let newIndex = (currentIndex - 1 + currentPlaylist.listOfMusic.length) % currentPlaylist.listOfMusic.length;
          const newMusic = currentPlaylist.listOfMusic[newIndex];//플레이리스트 내의 이전 음악(맨처음이면 맨끝으로)
    
          return {
            ...state,
            currentMusic: newMusic,
          };

        }
      }
      return state;

    case NEXT_MUSIC:
      currentPlaylist = state.currentPlaylist;
      currentMusic = state.currentMusic;
    
      if (currentPlaylist && currentPlaylist.listOfMusic.length > 0) {
        let currentIndex = currentPlaylist.listOfMusic.findIndex(music => music === currentMusic);
    
        if (currentIndex !== -1) {
          let newIndex = (currentIndex + 1) % currentPlaylist.listOfMusic.length;
          const newMusic = currentPlaylist.listOfMusic[newIndex];//플레이리스트 내의 다음 음악(맨끝이면 맨처음으로)
    
          return {
            ...state,
            currentMusic: newMusic,
          };
        } 
      }
      return state;

    case MOD_SHUFFLE_STATUS:
      return {
        ...state,
        shuffleStatus : action.input
      };

    case MOD_REPEAT_STATUS:
      return {
        ...state,
        repeatStatus : action.input
      };

    default :
      return state;
  }
}
export default musicController;