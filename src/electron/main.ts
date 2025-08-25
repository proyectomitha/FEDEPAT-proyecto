import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { connectDB } from "./database/conection.js";
import { seed } from "./seeders/seed.js";
import { getPreloadPath } from "./pathResolver.js";
import { registerIpcMember } from "./ipc-controllers/ipc-members.js";
import { registerIpcClub } from "./ipc-controllers/ipc-clubs.js";
import { registerIpcFestival } from "./ipc-controllers/ipc-festivals.js";
import { registerIpcScore } from "./ipc-controllers/ipc-score.js";
import { registerIpcTest } from "./ipc-controllers/ipc-tests.js";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    minWidth: 900, // ancho mínimo
    minHeight: 300, //alto mínimo
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  try {
    //Conexión a la base de datos y migraciones
    await connectDB();
    await seed(); // Creación de seed por defecto
  } catch (error) {
    console.log(error);
  }

  registerIpcMember();
  registerIpcClub();
  registerIpcFestival();
  registerIpcScore();
  registerIpcTest();

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
    mainWindow.webContents.openDevTools();
  } else {
    // En producción, desactivar acceso a DevTools
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    mainWindow.setMenu(null);
    // Bloquea combinaciones de teclas para abrir DevTools
    globalShortcut.register("CommandOrControl+Shift+I", () => {});
    globalShortcut.register("F12", () => {});
  }
});
