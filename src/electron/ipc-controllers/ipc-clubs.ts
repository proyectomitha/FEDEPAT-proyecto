import { ipcMain } from "electron";
import * as club from "../controllers/club.js";

export function registerIpcClub() {
  // Escuchar el pedido desde el render
  ipcMain.handle("getClubs", async () => {
    const users = await club.get_clubs();
    return users.map((p) => p.toJSON());
  });

  ipcMain.handle("getClub", async (_event, { id }) => {
    return await club.get_club(id);
  });

  ipcMain.handle("updtateClub", async (_event, { id, data }) => {
    return await club.update_club(id, data);
  });

  ipcMain.handle("deleteClub", async (_event, { id }) => {
    return await club.delete_club(id);
  });

  ipcMain.handle("addMemberToClub", async (_event, { id, data_member }) => {
    return await club.add_member_to_club(id, data_member);
  });

  ipcMain.handle("getMembers", async (_event, { id }) => {
    return await club.get_member_from_club(id);
  });
}
