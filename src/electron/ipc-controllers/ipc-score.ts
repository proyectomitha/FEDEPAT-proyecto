import { ipcMain } from "electron";
import * as score from "../controllers/score.js";

export function registerIpcScore() {
  ipcMain.handle("getScoreTestReaction", async (_event, { id }) => {
    const users: any = await score.get_score_in_test_reaction(id);
    return users.map((p: any) => p.toJSON());
  });

  ipcMain.handle("getScoreSerieReaction", async (_event, { id }) => {
    const users: any = await score.get_score_in_serie_reaction(id);
    return users.map((p: any) => p.toJSON());
  });

  ipcMain.handle(
    "setScore",
    async (_event, { id_member, id_serie, sc, time }) => {
      return await score.set_score_in_serie(id_member, id_serie, sc, time);
    }
  );
}
