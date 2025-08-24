const { ipcRenderer } = require("electron");

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("members", {
  getMembers: async () => await ipcRenderer.invoke("getMembers"),

  getMember: async (id: string) =>
    await ipcRenderer.invoke("getMember", { id }),

  updtateMember: async (id: string, data: any) =>
    await ipcRenderer.invoke("updtateMember", { id, data }),

  deleteMember: async (id: string) =>
    await ipcRenderer.invoke("deleteMember", { id }),
});

electron.contextBridge.exposeInMainWorld("clubs", {
  getClubs: async () => await ipcRenderer.invoke("getClubs"),

  getClub: async (id: string) => await ipcRenderer.invoke("getClub", { id }),

  updtateClub: async (id: string, data: any) =>
    await ipcRenderer.invoke("updtateClub", { id, data }),

  deleteClub: async (id: string) =>
    await ipcRenderer.invoke("deleteClub", { id }),

  addMemberToClub: async (id: string, data_member: any) =>
    await ipcRenderer.invoke("addMemberToClub", { id, data_member }),

  getMembersFromClub: async (id: string) =>
    await ipcRenderer.invoke("getMembersFromClub", { id }),
});

electron.contextBridge.exposeInMainWorld("tests", {
  startFestival: async (id: string) =>
    await ipcRenderer.invoke("startFestival"),

  configureTestReaction: async (
    id: string,
    n_series: number,
    type: string,
    strict_mode: number,
    n_max: number
  ) =>
    await ipcRenderer.invoke("configureTestReaction", {
      id,
      n_series,
      type,
      strict_mode,
      n_max,
    }),

  startTestReaction: async (id: string) =>
    await ipcRenderer.invoke("startTestReaction", { id }),

  nextTestReaction: async (id: string, n_max: number) =>
    await ipcRenderer.invoke("nextTestReaction", { id, n_max }),

  endTestHability: async (id: string) =>
    await ipcRenderer.invoke("endTestHability", { id }),
});

electron.contextBridge.exposeInMainWorld("festivals", {
  getFestivals: async () => await ipcRenderer.invoke("getFestivals"),

  getFestival: async (id: string) =>
    await ipcRenderer.invoke("getFestival", { id }),

  createFestival: async (data: any) =>
    await ipcRenderer.invoke("createFestival", { data }),

  updateFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateFestival", { id, data }),

  deleteFestival: async (id: string) =>
    await ipcRenderer.invoke("deleteFestival", { id }),

  startFestival: async (id: string) =>
    await ipcRenderer.invoke("startFestival", { id }),

  addMemberToFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("addMemberToFestival", { id, data }),

  removeMemberToFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("removeMemberToFestival", { id, data }),

  getCategories: async (id: string) =>
    await ipcRenderer.invoke("getCategories", { id }),

  getTests: async (id_festival: string, category: string) =>
    await ipcRenderer.invoke("getTests", { id_festival, category }),

  getTestHability: async (id_festival: string, category: string) =>
    await ipcRenderer.invoke("getTestHability", { id_festival, category }),

  getTestReaction: async (id_festival: string, category: string) =>
    await ipcRenderer.invoke("getTestReaction", { id_festival, category }),

  getSerieReaction: async (id: string) =>
    await ipcRenderer.invoke("getSerieReaction", { id }),

  getTestResistance: async (id_festival: string, category: string) =>
    await ipcRenderer.invoke("getTestResistance", { id_festival, category }),

  getSerieResistance: async (id: string) =>
    await ipcRenderer.invoke("getSerieResistance", { id }),
});

electron.contextBridge.exposeInMainWorld("score", {
  getGlobalScore: async (id_club: string) =>
    await ipcRenderer.invoke("getGlobalScore", {
      id_club,
    }),

  getGlobalScores: async () => await ipcRenderer.invoke("getGlobalScores", {}),

  getGlobalScoreFestival: async (id_festival: string) =>
    await ipcRenderer.invoke("getGlobalScoreFestival", {
      id_festival,
    }),

  getGlobalScoreCategory: async (id_festival: string, category: string) =>
    await ipcRenderer.invoke("getGlobalScoreCategory", {
      id_festival,
      category,
    }),

  getScoreTestReaction: async (id: string) =>
    await ipcRenderer.invoke("getScoreTestReaction", { id }),

  getScoreSerieReaction: async (id: string) =>
    await ipcRenderer.invoke("getScoreSerieReaction", { id }),

  setScore: async (
    id_member: string,
    id_serie: string,
    score: number,
    time: number
  ) =>
    await ipcRenderer.invoke("setScore", { id_member, id_serie, score, time }),
});
