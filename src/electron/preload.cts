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
});

electron.contextBridge.exposeInMainWorld("festivals", {
  getFestivals: async () => await ipcRenderer.invoke("getFestivals"),

  getFestival: async (id: string) =>
    await ipcRenderer.invoke("getFestival", { id }),

  updtateFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("updtateFestival", { id, data }),

  deleteFestival: async (id: string) =>
    await ipcRenderer.invoke("deleteFestival", { id }),

  startFestival: async (id: string) =>
    await ipcRenderer.invoke("startFestival", { id }),

  addMemberToFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("addMemberToFestival", { id, data }),
});

electron.contextBridge.exposeInMainWorld("tests", {
  /*
  getFestivals: async () => await ipcRenderer.invoke("getFestivals"),

  getFestival: async (id: string) =>
    await ipcRenderer.invoke("getFestival", { id }),

  updtateFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("updtateFestival", { id, data }),

  deleteFestival: async (id: string) =>
    await ipcRenderer.invoke("deleteFestival", { id }),

  startFestival: async (id: string) =>
    await ipcRenderer.invoke("startFestival", { id }),

  addMemberToFestival: async (id: string, data: any) =>
    await ipcRenderer.invoke("addMemberToFestival", { id, data }),*/
});
