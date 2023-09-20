const {
  app,
  BrowserWindow,
  ipcMain,
} = require('electron')
const Store = require('electron-store');

const store = new Store();

let appWindow

function createWindow() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  appWindow.loadFile('dist/turtleometer/index.html');

  appWindow.on('closed', function () {
    appWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
})

// Save configuration settings
function saveConfig(config) {
  store.set('appConfig', config);
}

// Load configuration settings
function loadConfig() {
  return store.get('appConfig') || getDefaultConfig();
}

ipcMain.on('saveConfig', (event, config) => {
  saveConfig(config);
});

ipcMain.on('loadConfig', (event) => {
  const config = loadConfig();
  event.reply('configLoaded', config);
});

function getDefaultConfig() {
  // Define your default configuration here
  return {
    selectedClass: 'Default from Electron',
    classOptions: [],
    classStudents: {},
    // Add other default values as needed
  };
}
