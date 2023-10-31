const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadFile("./src/index.html");
  mainWindow.webContents.openDevTools();
  const template = [
    {
      label: "Menu",
      submenu: [
        {
          label: "Server",
          click() {
            sendCommand("server-info");
          },
        },
        {
          label: "Rooms",
          click() {
            sendCommand("show-rooms");
          },
        },
        { type: "separator" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        {
          label: "Exit", // Исправлено с "Нах"
          click() {
            exit();
          },
        },
      ],
    },
    {
      label: "Upload",
      submenu: [
        {
          label: "Songs",
          click() {
            console.log("upload songs");
          },
        },
        {
          label: "Advertising",
          click() {
            console.log("upload videos");
          },
        },
        {
          label: "Media programs (xlsx)",
          click() {
            console.log("upload mp");
          },
        },
      ],
    },
  ];
  

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

function sendCommand(cmd) {
  mainWindow.webContents.send(cmd);
}

function exit() {
  app.quit();
}
