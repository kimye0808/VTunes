export default class Playlist {
  constructor(name, list) {
    this.name = name;
    this.list = list;
  }

  static from(json) {
    return Object.assign(new Playlist(), json);
  }

  addMusic(music) {
    this.list.push(music);
  }

  deleteMusic(index) {
    if (index >= 0 && index < this.list.length) {
      this.list.splice(index, 1);
    }
  }

  adjustOrder(from, to) {
    if (from >= 0 && from < this.list.length && to >= 0 && to < this.list.length) {
      const movedMusic = this.list.splice(from, 1)[0];
      this.list.splice(to, 0, movedMusic);
    }
  }

  renamePlaylist(name) {
    this.name = name;
  }

  toPlainObject() {
    return {
      name: this.name,
      list: this.list,
    };
  }
}