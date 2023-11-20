import Music from "../domain/Music";

const musicParser = require('music-metadata')
const fs = require('fs');
const path = require('node:path');

export default class MusicFileManager {
  loadMusicFile(filePath, thumbnailPath) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath);
      musicParser.parseStream(stream, {duration: true})
        .then(metadata => {
          const {lyrics, artist, album, picture} = metadata.common;
          const {duration} = metadata.format;
          let {title} = metadata.common;

          if (!title) {
            const basename = path.basename(filePath);
            title = basename.slice(0, basename.lastIndexOf('.'));
          }

          if (picture && picture.length > 0) {
            const image = picture[0];
            fs.writeFileSync(`${thumbnailPath}/${title}.jpg`, image.data);
          }

          const music = new Music(title, lyrics, parseInt(duration), artist, album, filePath);
          resolve(music);
        })
        .catch(error => {
          console.error('MP3 정보를 읽어오는 도중 에러 발생:', error.message);
          reject(error);
        });
    })
  }

  loadLyricsFile(path) {
    try {
      const lrcContent = fs.readFileSync(path, 'utf-8');
      const parsedLyrics = this.#parseLRC(lrcContent);
      return parsedLyrics;
    } catch (error) {
      console.error('Error reading or parsing the LRC file:', error);
      return null;
    }
  }

  #parseLRC(lrcContent) {
    const lines = lrcContent.split('\n');
    const lyricObj = {};

    for (const line of lines) {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.+)/);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const milliseconds = parseInt(match[3], 10) * 10;
        const time = minutes * 60 + seconds + milliseconds / 1000;
        const text = match[4];
        lyricObj[time] = text;
      }
    }
    return lyricObj;
  }
}