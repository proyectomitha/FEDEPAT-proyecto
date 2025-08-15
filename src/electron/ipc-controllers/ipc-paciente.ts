import { ipcMain } from "electron";
import * as user from "../controllers/member.js";

export function registerIpcUser() {
  /*
  // Escuchar el pedido desde el render
  ipcMain.handle("obtenerusuarios", async () => {
    const users = await user.get_users();
    return users.map((p) => p.toJSON()); // Sequelize devuelve objetos, ¡esto se serializa!
  });

  ipcMain.handle("actualizarusuario", async (_event, { id, data }) => {
    return await user.update_user_by_id(id, data);
  });
  */
}
