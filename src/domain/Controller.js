export default class Controller {
  constructor(playlist) {
    this.playlist = playlist;
    this.directory = "local://C:\\Users\\LEE\\Downloads\\Quick Share\\";
    this.index = 0;
  }

  play() {
    // music play
    console.log("music playing---");
  }

  prev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.playlist.list.length - 1;
    }
    return this.directory + this.playlist.list[this.index];
  }

  next() {
    this.index++;
    if (this.index >= this.playlist.list.length) {
      this.index = 0;
    }
    return this.directory + this.playlist.list[this.index];
  }
}