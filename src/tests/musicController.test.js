import musicController, {
  loadAllSuccess,
  loadAllFailure,
  addPlaylistSuccess,
  addPlaylistFailure,
  deletePlaylistSuccess,
  deletePlaylistFailure,
  addMusicSuccess,
  addMusicFailure,
  deleteMusicSuccess,
  deleteMusicFailure,
  changeSelectedPlaylistSuccess,
  changeSelectedPlaylistFailure,
  previousMusic,
  nextMusic,
  repeatCurrentMusic,
  modShowTimerBox,
  setIsCurrentPlaylistViewed,
  setMusicPlayerRef,
  setRestTime,
  setIsStartReduceTime,
  reduceRestTime,
} from "../modules/musicController"; 

describe('musicController reducer', () => {
  it('should handle LOAD_ALL_SUCCESS', () => {
    const initialState = { listOfPlaylist: [] };
    const playlists = [{ name: 'Playlist1', list: [] }];
    const action = loadAllSuccess(playlists);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual(playlists);
  });

  it('should handle LOAD_ALL_FAILURE', () => {
    const initialState = { listOfPlaylist: [] };
    const action = loadAllFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual([]);
  });


  it('should handle ADD_PLAYLIST_SUCCESS', () => {
    const initialState = { listOfPlaylist: [] };
    const newPlaylist = { name: 'New Playlist', list: [] };
    const action = addPlaylistSuccess(newPlaylist);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual([newPlaylist]);
  });

  it('should handle ADD_PLAYLIST_FAILURE', () => {
    const initialState = { listOfPlaylist: [] };
    const action = addPlaylistFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual([]);
  });

  it('should handle DELETE_PLAYLIST_SUCCESS', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
    };
    const action = deletePlaylistSuccess('Playlist1');
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist.length).toBe(1);
    expect(newState.listOfPlaylist[0].name).toBe('Playlist2');
    expect(newState.selectedPlaylist).toEqual({ name: '', list: [] });
  });

  it('should handle DELETE_PLAYLIST_FAILURE', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
    };
    const action = deletePlaylistFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual(initialState.listOfPlaylist);
  });

  it('should handle CHANGE_SELECTED_PLAYLIST_SUCCESS', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
    };
    const action = changeSelectedPlaylistSuccess({ name: 'Playlist2', list: [] });
    const newState = musicController(initialState, action);
    expect(newState.selectedPlaylist.name).toBe('Playlist2');
  });

  it('should handle CHANGE_SELECTED_PLAYLIST_FAILURE', () => {
    const initialState = { selectedPlaylist: { name: 'Playlist1', list: [] } };
    const action = changeSelectedPlaylistFailure();
    const newState = musicController(initialState, action);
    expect(newState.selectedPlaylist.name).toBe('Playlist1');
  });

  it('should handle PREVIOUS_MUSIC when current music is not the first in the playlist', () => {
    const currentMusic = { name: 'Song2' };
    const initialState = {
      currentPlaylist: { list: [{ name: 'Song1' }, currentMusic, { name: 'Song3' }] },
      currentMusic: currentMusic,
    };
    const action = previousMusic();
    const newState = musicController(initialState, action);
    expect(newState.currentMusic).toEqual({ name: 'Song1' });
  });

  it('should handle PREVIOUS_MUSIC when current music is the first in the playlist', () => {
    const currentMusic = { name: 'Song1' };
    const initialState = {
      currentPlaylist: { list: [currentMusic, { name: 'Song2' }, { name: 'Song3' }] },
      currentMusic: currentMusic,
    };
    const action = previousMusic();
    const newState = musicController(initialState, action);
    expect(newState.currentMusic).toEqual({ name: 'Song3' });
  });

  it('should handle NEXT_MUSIC when current music is not the last in the playlist', () => {
    const currentMusic = { name: 'Song2' };
    const initialState = {
      currentPlaylist: { list: [{ name: 'Song1' }, currentMusic, { name: 'Song3' }] },
      currentMusic: currentMusic,
    };
    const action = nextMusic();
    const newState = musicController(initialState, action);
    expect(newState.currentMusic).toEqual({ name: 'Song3' });
  });

  it('should handle NEXT_MUSIC when current music is the last in the playlist', () => {
    const currentMusic = { name: 'Song3' };
    const initialState = {
      currentPlaylist: { list: [{ name: 'Song1' }, { name: 'Song2' }, currentMusic] },
      currentMusic: currentMusic,
    };
    const action = nextMusic();
    const newState = musicController(initialState, action);
    expect(newState.currentMusic).toEqual({ name: 'Song1' });
  });

  it('should handle ADD_MUSIC_SUCCESS', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [] },
    };
    const newMusic = { name: 'NewSong', artist: 'NewArtist', duration: 180, path: '/path/to/new_song.mp3' };
    const action = addMusicSuccess(initialState.listOfPlaylist[0], newMusic);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist[0].list).toContain(newMusic);
  });

  it('should handle ADD_MUSIC_FAILURE', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [] },
    };
    const action = addMusicFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual(initialState.listOfPlaylist);
  });

  it('should handle DELETE_MUSIC_SUCCESS', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentMusic: { name: 'Song1' },
    };
    const musicToDelete = initialState.listOfPlaylist[0].list[0];
    const action = deleteMusicSuccess(initialState.listOfPlaylist[0], musicToDelete);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist[0].list).not.toContain(musicToDelete);
    expect(newState.selectedPlaylist.list).not.toContain(musicToDelete);
    expect(newState.currentPlaylist.list).not.toContain(musicToDelete);
  });

  it('should handle DELETE_MUSIC_FAILURE', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentMusic: { name: 'Song1' },
    };
    const action = deleteMusicFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual(initialState.listOfPlaylist);
  });
  
  // 
  it('should handle REPEAT_CURRENT_MUSIC', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentMusic: { name: 'Song1' },
      repeatStatus: 0,
    };
    const action = repeatCurrentMusic({ name: 'Song1' });
    const newState = musicController(initialState, action);
    expect(newState.currentMusic).toEqual({ name: 'Song1' }); 
  });

  it('should handle MOD_SHOW_TIMER_BOX', () => {
    const initialState = {
      isShowTimerBox: false,
    };
    const action = modShowTimerBox(true);
    const newState = musicController(initialState, action);
    expect(newState.isShowTimerBox).toBe(true);
    const action2 = setIsCurrentPlaylistViewed(false);
    const newState2 = musicController(initialState, action2);
    expect(newState2.isCurrentPlaylistViewed).toBe(false);
  });

  it('should handle SET_IS_CURRENT_PLAYLIST_VIEWED', () => {
    const initialState = {
      isCurrentPlaylistViewed: false,
    };
    const action = setIsCurrentPlaylistViewed(true);
    const newState = musicController(initialState, action);
    expect(newState.isCurrentPlaylistViewed).toBe(true);
    const action2 = setIsCurrentPlaylistViewed(false);
    const newState2 = musicController(initialState, action2);
    expect(newState2.isCurrentPlaylistViewed).toBe(false);
  });

  it('should handle SET_MUSIC_PLAYER_REF', () => {
    const initialState = {
      musicPlayerRef: null,
    };
    const newRef = { current: {} };
    const action = setMusicPlayerRef(newRef);
    const newState = musicController(initialState, action);
    expect(newState.musicPlayerRef).toEqual(newRef);
  });

  it('should handle SET_REST_TIME', () => {
    const initialState = {
      restTime: -1,
    };
    const newRestTime = 60;
    const action = setRestTime(newRestTime);
    const newState = musicController(initialState, action);
    expect(newState.restTime).toEqual(newRestTime);
  });

  it('should handle SET_IS_START_REDUCE_TIME', () => {
    const initialState = {
      isStartReduceTime: false,
    };
    const action = setIsStartReduceTime(true);
    const newState = musicController(initialState, action);
    expect(newState.isStartReduceTime).toBe(true);
  });

  it('should handle REDUCE_REST_TIME', () => {
    const initialState = {
      restTime: 60,
    };
    const action = reduceRestTime();
    const newState = musicController(initialState, action);
    expect(newState.restTime).toBe(59); // 60에서 1 감소해서 59가 됨
  });

  it('should handle DELETE_MUSIC_SUCCESS with music not in playlist', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentMusic: { name: 'Song3' }, // Not in the playlist
    };
    const musicToDelete = { name: 'Song3' };
    const action = deleteMusicSuccess(initialState.listOfPlaylist[0], musicToDelete);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist[0].list).not.toContain(musicToDelete);
    expect(newState.selectedPlaylist.list).not.toContain(musicToDelete);
    expect(newState.currentPlaylist.list).not.toContain(musicToDelete);
    expect(newState.currentMusic).toEqual(initialState.currentMusic);
  });

});