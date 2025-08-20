const { ipcRenderer } = require("electron");

const electron = require("electron");

// Exponer funciones al renderer
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

  updtateFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("updtateFestival", { id, data }),

  deleteFestival: async (id: string) =>
    await ipcRenderer.invoke("deleteFestival", { id }),

  startFestival: async (id: string) =>
    await ipcRenderer.invoke("startFestival", { id }),

  addMemberToFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("addMemberToFestival", { id, data }),

  removeMemberToFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("removeMemberToFestival", { id, data }),
});

electron.contextBridge.exposeInMainWorld("score", {
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
