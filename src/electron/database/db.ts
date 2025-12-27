import { Sequelize } from "sequelize";
import path from "path";
import { app } from "electron";
import { isDev } from "../util.js";

export const route: string = path.join(
  app.getAppPath(),
  isDev() ? "." : "../dist-electron/",
  "/dist-database/database.sqlite"
);

// Diagrama de conexión para sqlite. Se puede modificar para usar otra DB.
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: route,
});
