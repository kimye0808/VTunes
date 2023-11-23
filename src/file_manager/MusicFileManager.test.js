import MusicFileManager from "./MusicFileManager";

const fs = require('fs');

test("load music", () => {
  const musicFileManager = new MusicFileManager();
  const path = "C:/Users/LEE/Downloads/Quick Share/Peppertones - Ready, Get Set, Go!.mp3"
  const thumbnailPath = "./resource"
  return musicFileManager.loadMusicFile(path, thumbnailPath)
    .then((music) => {
      console.log(music);
      expect(music.name).toBe('Ready, Get Set, Go!');
      expect(music.artist).toBe('페퍼톤스 (Peppertones)');
      expect(music.duration).toBe(305);
      expect(music.album).toBe('Colorful Express');
      expect(music.path).toBe(path);
      expect(fs.existsSync(`${thumbnailPath}/${music.name}.jpg`)).toBe(true);
    });
})

test("타이틀 정보가 없으면 파일 이름이 name으로 설정된다", () => {
  const musicFileManager = new MusicFileManager();
  const path = "C:/Users/LEE/Downloads/Quick Share/1_no-title.mp3";
  const thumbnailPath = "./resource"
  return musicFileManager.loadMusicFile(path, thumbnailPath)
    .then((music) => {
      console.log(music);
      expect(music.name).toBe('1_no-title');
    });
})
test("load lyrics", () => {
  const musicFileManager = new MusicFileManager();
  const path = "C:/Users/LEE/Downloads/Quick Share/1.lrc"
  const lyrics = musicFileManager.loadLyricsFile(path);

  console.log(lyrics);
  expect(Object.keys(lyrics).length).toBe(71);
})