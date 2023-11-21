export default class ListOfPlaylist {
  constructor(list) {
    this.list = list;
  }
  addPlaylist(playlist) {
    this.list.push(playlist);
  }
  deletePlaylist(playlist){
    this.list = this.list.filter(pl => pl !== playlist);
  }

  toPlainObject() {
    return {
      list: this.list,
    };
  }
}