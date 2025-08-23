import { ipcMain } from "electron";
import * as score from "../controllers/score.js";

export function registerIpcScore() {
  ipcMain.handle("getGlobalScore", async (_event, { id_festival }) => {
    return await score.getGlobalScore(id_festival);
  });

  ipcMain.handle("getGlobalScores", async () => {
    return await score.getGlobalScores();
  });

  ipcMain.handle("getGlobalScoreFestival", async (_event, { id_festival }) => {
    return await score.getGlobalScoreFestival(id_festival);
  });

  ipcMain.handle(
    "getGlobalScoreCategory",
    async (_event, { id_festival, category }) => {
      return await score.getGlobalScoreCategory(id_festival, category);
    }
  );

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
