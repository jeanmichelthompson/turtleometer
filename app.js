const {
  app,
  BrowserWindow,
  ipcMain,
} = require('electron')

if (handleSquirrelEvent(app)) {
  return;
}

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

function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
      return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
      let spawnedProcess, error;

      try {
          spawnedProcess = ChildProcess.spawn(command, args, {
              detached: true
          });
      } catch (error) {}

      return spawnedProcess;
  };

  const spawnUpdate = function(args) {
      return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
          // Optionally do things such as:
          // - Add your .exe to the PATH
          // - Write to the registry for things like file associations and
          //   explorer context menus

          // Install desktop and start menu shortcuts
          spawnUpdate(['--createShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-uninstall':
          // Undo anything you did in the --squirrel-install and
          // --squirrel-updated handlers

          // Remove desktop and start menu shortcuts
          spawnUpdate(['--removeShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-obsolete':
          // This is called on the outgoing version of your app before
          // we update to the new version - it's the opposite of
          // --squirrel-updated

          application.quit();
          return true;
  }
};
