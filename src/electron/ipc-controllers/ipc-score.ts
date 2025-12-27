import { ipcMain } from "electron";
import * as sc from "../controllers/score.js";

export function registerIpcScore() {
  ipcMain.handle("getGlobalScore", async (_event, { id_festival }) => {
    return await sc.getGlobalScore(id_festival);
  });

  ipcMain.handle("getGlobalScores", async () => {
    return await sc.getGlobalScores();
  });

  ipcMain.handle("getGlobalScoreFestival", async (_event, { id_festival }) => {
    return await sc.getGlobalScoreFestival(id_festival);
  });

  ipcMain.handle(
    "getGlobalScoreCategory",
    async (_event, { id_festival, category }) => {
      return await sc.getGlobalScoreCategory(id_festival, category);
    }
  );

  ipcMain.handle("getScoreTestReaction", async (_event, { id }) => {
    const users: any = await sc.get_score_in_test_reaction(id);
    return users.map((p: any) => p.toJSON());
  });

  ipcMain.handle("getScoreSerieReaction", async (_event, { id }) => {
    const users: any = await sc.get_score_in_serie_reaction(id);
    return users.map((p: any) => p.toJSON());
  });

  ipcMain.handle("getScoreSerieResistance", async (_event, { id }) => {
    const users: any = await sc.get_score_in_serie_resistance(id);
    return users.map((p: any) => p.toJSON());
  });

  ipcMain.handle(
    "setScore",
    async (_event, { id_member, id_serie, score, time }) => {
      return await sc.set_score_in_serie(id_member, id_serie, score, time);
    }
  );
}
