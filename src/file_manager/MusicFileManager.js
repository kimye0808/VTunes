import Music from "../domain/Music";

const musicParser = require('music-metadata')
const fs = require('fs');
export default class MusicFileManager {
  loadMusicFile(path, thumbnailPath) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(path);
      musicParser.parseStream(stream, {duration: true})
        .then(metadata => {
          const { lyrics, artist, album, picture } = metadata.common;
          const { duration } = metadata.format;
          let { title } = metadata.common;

          if (!title) {
            title = path.baseName(path); // 테스트 안함
          }

          if (picture && picture.length > 0) {
            const image = picture[0];
            fs.writeFileSync(`${thumbnailPath}/${title}.jpg`, image.data);
          }

          const music = new Music(title, lyrics, parseInt(duration), artist, album, path);
          resolve(music);
        })
        .catch(error => {
          console.error('MP3 정보를 읽어오는 도중 에러 발생:', error.message);
          reject(error);
        });
    })
  }

  loadLyricsFile() {

  }
}