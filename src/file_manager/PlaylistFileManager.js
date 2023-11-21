const fs = require('fs');

export default class PlaylistFileManager {
  save(playlist) {
    return fs.promises
      .writeFile(`./resource/${playlist.name}.json`, JSON.stringify(playlist),
        (error) => {
          if (error) {
            console.log(error);
            throw error;
          }
        });
  }

  load(path) {
    const jsonFile = fs.readFileSync(path, "utf-8");
    return JSON.parse(jsonFile);
  }

  loadAll() {
    const files = fs.readdirSync('./resource').filter(file => file.endsWith('.json'));
    const playlists = files.map(file => {
      const filePath = `./resource/${file}`;
      return this.load(filePath);
    });
    return playlists;
  }
}