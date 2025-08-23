import { ipcMain } from "electron";
import * as festival from "../controllers/festival.js";
import * as test from "../controllers/tests.js";

export function registerIpcFestival() {
  // Escuchar el pedido desde el render
  ipcMain.handle("getFestivals", async () => {
    const users = await festival.get_all_festival();
    return users.map((p) => p.toJSON()); // Sequelize devuelve objetos, ¡esto se serializa!
  });

  ipcMain.handle("getFestival", async (_event, { id }) => {
    return await festival.get_festival(id);
  });

  ipcMain.handle("createFestival", async (_event, { data }) => {
    return await festival.create_festival(data);
  });

  ipcMain.handle("updateFestival", async (_event, { id, data }) => {
    return await festival.update_festival(id, data);
  });

  ipcMain.handle("deleteFestival", async (_event, { id }) => {
    return await festival.delete_festival(id);
  });

  ipcMain.handle("startFestival", async (_event, { id }) => {
    return await test.start_festival(id);
  });

  ipcMain.handle("addMemberToFestival", async (_event, { id, data }) => {
    return await festival.add_members_to_festival(id, data);
  });

  ipcMain.handle("removeMemberToFestival", async (_event, { id, data }) => {
    return await festival.remove_member_to_festival(id, data);
  });

  ipcMain.handle("getCategories", async (_event, { id }) => {
    return await festival.get_categories(id);
  });

  ipcMain.handle("getTests", async (_event, { id_festival, category }) => {
    return await festival.get_tests(id_festival, category);
  });
}
