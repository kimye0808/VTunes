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
      expect(doesFileExist(`${thumbnailPath}/${music.name}.jpg`)).toBe(true);
    });
})

function doesFileExist(filePath) {
  try {
    // 파일의 상태를 확인
    fs.accessSync(filePath, fs.constants.F_OK);
    return true; // 파일이 존재함
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false; // 파일이 존재하지 않음
    } else {
      throw error; // 다른 오류가 발생하면 예외를 던짐
    }
  }
}