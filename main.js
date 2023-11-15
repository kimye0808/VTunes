const {app, BrowserWindow, protocol} = require('electron')
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 550,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  win.loadURL("http://localhost:3000");
  // win.loadFile('./public/index.html');
  // win.webContents.openDevTools();
}
app.whenReady().then(() => {
  protocol.registerFileProtocol('local', (request, callback) => {
    const url = request.url.substr
    const pathname = decodeURIComponent(request.url.replace('local://', ''));
    try {
      callback(pathname);
    } catch (error) {
      console.log(error);
    }
  });
  createWindow();
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})