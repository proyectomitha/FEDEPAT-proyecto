import { ipcMain } from "electron";
import * as test from "../controllers/tests.js";
import * as testResistance from "../controllers/test-resistence.js";

export function registerIpcTest() {
  ipcMain.handle(
    "configureTestReaction",
    async (_event, { id, type, strict_mode, n_max }) => {
      const users = await test.configure_test_reaction(
        id,
        type,
        strict_mode,
        n_max
      );
      return users;
    }
  );

  ipcMain.handle("startTestReaction", async (_event, { id }) => {
    return await test.start_test_reaction(id);
  });

  ipcMain.handle("nextTestReaction", async (_event, { id }) => {
    return await test.next_test_reaction(id);
  });

  ipcMain.handle(
    "configureTestResistance",
    async (_event, { id, type, strict_mode, n_max }) => {
      const users = await testResistance.configure_test_resistance(
        id,
        type,
        strict_mode,
        n_max
      );
      return users;
    }
  );

  ipcMain.handle("startTestResistance", async (_event, { id }) => {
    return await testResistance.start_test_resistance(id);
  });

  ipcMain.handle("nextTestResistance", async (_event, { id }) => {
    return await testResistance.next_test_resistance(id);
  });

  ipcMain.handle("endTestHability", async (_event, { id }) => {
    return await test.end_test_hability(id);
  });

  ipcMain.handle("endSerieReaction", async (_event, { id }) => {
    return await test.end_serie_reaction(id);
  });

  ipcMain.handle("endSerieResistance", async (_event, { id }) => {
    return await testResistance.end_serie_resistance(id);
  });

  ipcMain.handle("auxiliar", async (_event, { id }) => {
    return await test.next_test_reaction(id);
  });
}
