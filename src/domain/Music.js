export default class Music {
  constructor(name, lyrics, duration, artist, album, path) {
    this.name = name;
    this.lyrics = lyrics;
    this.artist = artist;
    this.album = album;
    this.duration = duration;
    this.path = path;
  }

  static from(json) {
    return Object.assign(new Music(), json);
  }

  toPlainObject() {
    return {
      name: this.name,
      lyrics: this.lyrics,
      artist: this.artist,
      album: this.album,
      duration: this.duration,
      path: this.path,
    };
  }

}