import { ipcMain } from "electron";
import * as member from "../controllers/member.js";

export function registerIpcMember() {
  // Escuchar el pedido desde el render
  ipcMain.handle("getMembers", async () => {
    const users = await member.get_members();
    return users.map((p) => p.toJSON()); // Sequelize devuelve objetos, ¡esto se serializa!
  });

  ipcMain.handle("getMember", async (_event, { id }) => {
    const users = await member.get_member(id);
    return users.map((p) => p.toJSON());
  });

  ipcMain.handle("updtateMember", async (_event, { id, data }) => {
    return await member.update_member(id, data);
  });

  ipcMain.handle("deleteMember", async (_event, { id }) => {
    return await member.delete_member(id);
  });
}
