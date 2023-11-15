export default class Music {
  constructor(name, lyrics, duration, artist, album, path) {
    this.name = name;
    this.lyrics = lyrics;
    this.artist = artist;
    this.album = album;
    this.path = path;
  }

  static from(json) {
    return Object.assign(new Music(), json);
  }

}