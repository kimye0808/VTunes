const { app, BrowserWindow, ipcMain, protocol ,dialog} = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs');
const path = require("path")
const musicParser = require('music-metadata')

function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    //상단 메뉴바 감추기

    width: 1200,
    height: 800,
    minWidth: 550,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('local', (request, callback) => {
    const url = request.url.substr;
    const pathname = decodeURIComponent(request.url.replace('local://', ''));
    try {
      callback(pathname);
    } catch (error) {
      console.log(error);
    }
  });
  createWindow();
});

/**************************************렌더러 프로세스로부터 요청 받아서 메인 프로세스에서 작업 실행 : ipcMain************************************/
//dialog를 통해서 로컬 파일 경로 얻기 : ui에서 +클릭할시 이용
ipcMain.handle('select-music-file', async (event) => {
  try {
    const result = await dialog.showOpenDialog({
      filters: [
        { name: 'Audio Files', extensions: ['mp3', 'ogg', 'wav'] },
      ],
      properties: ['openFile'],
    });

    return result;
  } catch (error) {
    console.error('Error selecting music file in main:', error);
    return { canceled: true };
  }
});
ipcMain.handle('load-all', async (event) => {
  try {
    // ./resource 폴더에서 모든 JSON 파일 로드
    const files = fs.readdirSync('./resource').filter(file => file.endsWith('.json'));
    const playlists = files.map(file => {
      const filePath = path.join(__dirname, 'resource', file);
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    });
    return playlists;
  } catch (error) {
    console.error('모든 재생목록을 불러오는 중 오류 발생:', error);
    throw error;
  }
});
ipcMain.handle('add-playlist', async (event, playlist) => {
  try {
    if(playlist.name !== "현재재생목록"){//현재재생목록 플레이리스트면 굳이 json파일을 만들지 않아도 된다
      await fs.promises.writeFile(`./resource/${playlist.name}.json`, JSON.stringify(playlist));
    }
    event.sender.send('savePlaylistResponse', true);
  } catch (error) {
    console.error('Error saving playlist:', error);
    event.sender.send('savePlaylistResponse', false);
  }
});
ipcMain.handle('delete-playlist', async (event, name) => {
  try {
    if(name!=="현재재생목록"){
      // Delete the JSON file
      const jsonFilePath = path.join(__dirname, `./resource/${name}.json`);
      await fs.promises.unlink(jsonFilePath);
    }
    // Check if the playlist folder exists
    const playlistFolderPath = path.join(__dirname, `./resource/${name}`);
    const folderExists = await fs.promises.access(playlistFolderPath, fs.constants.F_OK).then(() => true).catch(() => false);

    // Delete the playlist folder if it exists
    if (folderExists) {
      await fs.promises.rmdir(playlistFolderPath, { recursive: true });
    }

    event.sender.send('deletePlaylistResponse', true);
  } catch (error) {
    console.error('Error deleting playlist:', error);
    event.sender.send('deletePlaylistResponse', false);
  }
});
ipcMain.handle('add-music', async (event, playlist, music) => {
  try {
    if(playlist.name !== "현재재생목록"){//현재 재생목록이면 json파일에 접근할 필요가 없다
      // 파일 읽기
      const filePath = path.join(__dirname, `./resource/${playlist.name}.json`);
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      const playlistData = JSON.parse(fileData);

      // 음악 추가
      playlistData.list.push(music);

      // 파일 쓰기
      await fs.promises.writeFile(filePath, JSON.stringify(playlistData));
    }
    event.sender.send('addMusicResponse', true);
  } catch (error) {
    console.error('Error adding music:', error);
    event.sender.send('addMusicResponse', false);
  }
});
ipcMain.handle('delete-music', async (event, playlist, music) => {
  try {
    if(playlist&&playlist.name !== "현재재생목록"){//현재재생목록 이면 json파일에 접근하지 않아도 된다
      // 파일 읽기
      const filePath = path.join(__dirname, `./resource/${playlist.name}.json`);
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      const playlistData = JSON.parse(fileData);

      // 음악 찾기 및 삭제
      playlistData.list = playlistData.list.filter(item => item.name !== music.name);

      // 파일 쓰기
      await fs.promises.writeFile(filePath, JSON.stringify(playlistData));
    }
    // 이미지 파일 삭제 "현재재생목록"이어도 삭제
    const playlistFolderPath = path.join(__dirname, `./resource/${playlist.name}`);
    const imageFilePath = path.join(playlistFolderPath, `${music.name}.jpg`);

    // Check if the image file exists before attempting to delete
    const fileExists = await fs.promises.access(imageFilePath, fs.constants.F_OK).then(() => true).catch(() => false);
    if (fileExists) {
      await fs.promises.unlink(imageFilePath);
    }
    event.sender.send('deleteMusicResponse', true);
  } catch (error) {
    console.error('Error deleting music:', error);
    event.sender.send('deleteMusicResponse', false);
  }
});

ipcMain.handle('load-music-file', async (event, playlist, filePath) => {
  try {
    const playlistFolderPath = path.join(__dirname, `./resource/${playlist.name}`);
    // loadMusicFile 함수 실행
    const music = await loadMusicFile(filePath, playlistFolderPath);
    return music;
  } catch (error) {
    console.error('Error loading music file:', error);
    event.sender.send('loadMusicErrorResponse', error.message);
  }
});
async function loadMusicFile( filePath,playlistFolderPath) {
  try {
    const metadata = await musicParser.parseFile(filePath, { duration: true });
    console.log(metadata);
    const { lyrics, artist, album, picture } = metadata.common;
    const { duration } = metadata.format;
    let { title } = metadata.common;

    if (!title) {
      const basename = path.basename(filePath);
      title = basename.slice(0, basename.lastIndexOf('.'));
    }
    // playlist 폴더가 없으면 생성
    try {
      await fs.promises.mkdir(playlistFolderPath, { recursive: true });
    } catch (mkdirError) {
      console.error('Error creating playlist folder:', mkdirError);
    }

    if (picture && picture.length > 0) {
      const image = picture[0];
      const imageFileName = `${title}.jpg`;

      // 이미지를 playlist 폴더에 저장
      const imgPath = path.join(playlistFolderPath, imageFileName);
      fs.writeFileSync(imgPath, image.data);
    }

    // 이미지를 저장할 때 사용하는 절대 경로를 구성
    const imgPath = path.join(playlistFolderPath, `${title}.jpg`);

    const music = {
      name: title,
      lyrics: lyrics,
      artist: artist,
      duration: parseInt(duration),
      album: album,
      path: filePath,
      imgPath: imgPath,
    };
    console.log("handler music:", music);

    return music;
  } catch (error) {
    console.error('MP3 정보를 읽어오는 도중 에러 발생:', error.message);
    throw error;
  }
}

//이미지 파일의 절대경로를 받아서 img tag에 넣을 수 있는 걸로 변환
ipcMain.handle('load-img-file', (event, imgPath) => {
  try {
    const imageData = fs.readFileSync(imgPath).toString('base64');
    const imgSrc = `data:image/png;base64,${imageData}`;
    return imgSrc;
  } catch (error) {
    console.error('Error loading music file image:', error.message);
    return null;
  }
});

ipcMain.handle('load-lyrics-file', async (event, lyricsPath) => {
  try {
    const lrcContent = fs.readFileSync(lyricsPath, 'utf-8');
    //parseLRC호출
    const parsedLyrics = parseLRC(lrcContent);
    return parsedLyrics;
  } catch (error) {
    console.error('Error reading or parsing the LRC file:', error);
    return null;
  }
});
function parseLRC(lrcContent) {
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

ipcMain.handle('change-selected-playlist', async (event, playlist) => {
  try {
    if(playlist&& playlist.name !=="현재재생목록"){
      const filePath = path.join(__dirname, `./resource/${playlist.name}.json`);
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      const playlistData = JSON.parse(fileData);

      playlistData.list = playlist.list;

      await fs.promises.writeFile(filePath, JSON.stringify(playlistData));
    }
    event.sender.send('changePlaylistResponse', true);
  } catch (error) {
    console.error('Error changing playlist:', error);
    event.sender.send('changePlaylistResponse', false);
  }
});
//인자로 받은 플레이리스트의 이미지를 현재재생목록 폴더로 복사함
ipcMain.handle('change-current-playlist', async (event, playlist) => {
  try {
    if (playlist && playlist.name !== "현재재생목록") {
      // JSON 파일 읽기
      const filePath = path.join(__dirname, `./resource/${playlist.name}.json`);
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      const playlistData = JSON.parse(fileData);

      // 현재재생목록 폴더 경로 설정
      const currentPlaylistFolderPath = path.join(__dirname, './resource/현재재생목록');
      // 현재재생목록 폴더가 없으면 생성
      await fs.promises.mkdir(currentPlaylistFolderPath, { recursive: true });

      for (const music of playlistData.list) {
        const sourceImagePath = path.join(__dirname, `./resource/${playlist.name}/${music.name}.jpg`);
        const destinationImagePath = path.join(currentPlaylistFolderPath, `${music.name}.jpg`);

        // 소스 파일이 존재하는지 확인
        const sourceFileExists = await fs.promises.access(sourceImagePath, fs.constants.F_OK).then(() => true).catch(() => false);
        if (!sourceFileExists) {
          console.error(`소스 파일이 존재하지 않습니다: ${sourceImagePath}`);
          continue; // 다음 반복으로 건너뛰기
        }

        // 목적지 폴더가 존재하는지 확인
        const destinationFolderExists = await fs.promises.access(currentPlaylistFolderPath, fs.constants.F_OK).then(() => true).catch(() => false);
        if (!destinationFolderExists) {
          console.error(`목적지 폴더가 존재하지 않습니다: ${currentPlaylistFolderPath}`);
          continue; // 다음 반복으로 건너뛰기
        }

        // 파일 복사 시도
        try {
          await fs.promises.copyFile(sourceImagePath, destinationImagePath);
        } catch (copyError) {
          console.error(`파일 복사 중 오류 발생: ${copyError.message}`);
        }
      }

      event.sender.send('changePlaylistResponse', true);
    }
  } catch (error) {
    console.error('플레이리스트 변경 중 오류 발생:', error);
    event.sender.send('changePlaylistResponse', false);
  }
});


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
