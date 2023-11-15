import PlaylistFileManager from "./PlaylistFileManager";
import MusicFileManager from "./MusicFileManager";
import Playlist from "../domain/Playlist";

describe("파일 매니저가", () => {
  const playlistFileManager = new PlaylistFileManager();

  test("파일을 저장한다", async () => {
    const playlistName = "pl1";
    const playlist = await createPlaylist(playlistName, "./resource");
    await playlistFileManager.save(playlist);

    const loadData = playlistFileManager.load('./resource/pl1.json');
    const loadedPlaylist = Playlist.from(loadData);
    console.log(loadedPlaylist);
    expect(loadedPlaylist.name).toBe(playlistName);
    expect(loadedPlaylist.list.length).toBe(3);
  });
});

async function createPlaylist(name, thumbnailPath) {
  const musicFileManager = new MusicFileManager();

  const list = [];
  const music1 = await musicFileManager.loadMusicFile("C:/Users/LEE/Downloads/Quick Share/1.mp3", thumbnailPath);
  list.push(music1);
  const music2 = await musicFileManager.loadMusicFile("C:/Users/LEE/Downloads/Quick Share/그저 네게 맑아라.mp3", thumbnailPath);
  list.push(music2);
  const music3 = await musicFileManager.loadMusicFile("C:/Users/LEE/Downloads/Quick Share/그래서 나는 음악을 그만두었다.mp3", thumbnailPath);
  list.push(music3);
  return new Playlist(name, list);
}
