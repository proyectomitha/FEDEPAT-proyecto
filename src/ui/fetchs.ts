import type { Club, Festival, Member } from "./types";
//============== Score ===============//
export async function getGlobalScore(id_club: string) {
  // @ts-ignore
  return await window.score.getGlobalScore(id_club);
}

export async function getGlobalScores() {
  // @ts-ignore
  return await window.score.getGlobalScoreCategory();
}

export async function getGlobalScoreFestival(id_festival: string) {
  // @ts-ignore
  return await window.score.getGlobalScoreFestival(id_festival);
}

export async function getGlobalScoreCategory(
  id_festival: string,
  category: string
) {
  // @ts-ignore
  return await window.score.getGlobalScoreCategory(id_festival, category);
}

//============== Clubs ===============//
export async function getClubs() {
  // @ts-ignore
  return await window.clubs.getClubs();
}

export async function getClub(
  id_club: string
): Promise<{ club: Club; members: Member[] }> {
  // @ts-ignore
  return await window.clubs.getClub(id_club);
}

//============== Festivals ===============//

export async function getFestivals() {
  // @ts-ignore
  return await window.festivals.getFestivals();
}

export async function getFestival(id_festival: string) {
  // @ts-ignore
  return await window.festivals.getFestival(id_festival);
}

export async function createFestival(): Promise<Festival> {
  //@ts-ignore
  return await window.festivals.createFestival({
    name: "Nuevo festival",
    description: "Descripción ...",
    startDate: new Date(),
    endDate: new Date(),
  });
}

export async function updateFestival(
  id: string,
  name: string,
  description: string,
  startDate: Date,
  endDate: Date
) {
  //@ts-ignore
  return await window.festivals.updateFestival(id, {
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
  });
}

export async function deleteFestival(id_festival: string) {
  //@ts-ignore
  return await window.festivals.deleteFestival(id_festival);
}

export async function addMemberToFestival(
  id_festival: string,
  ids_member: string[]
) {
  //@ts-ignore
  return await window.festivals.addMemberToFestival(id_festival, ids_member);
}

export async function removeMemberToFestival(
  id_festival: string,
  ids_member: string[]
) {
  //@ts-ignore
  return await window.festivals.removeMemberToFestival(id_festival, ids_member);
}

export async function startFestival(id: string) {
  //@ts-ignore
  return await window.festivals.startFestival(id);
}

export async function getCategories(id: string) {
  //@ts-ignore
  return await window.festivals.getCategories(id);
}

//============== Members ===============//

export async function getMembers(): Promise<Member[]> {
  // @ts-ignore
  return await window.members.getMembers();
}

export async function getMembersFromClub(id_club: string): Promise<Member[]> {
  //@ts-ignore
  return await window.clubs.getMembers(id_club);
}

export async function getMember(id_member: string) {
  // @ts-ignore
  return await window.members.getMember(id_member);
}

//============== Series ===============//

export async function getTest(
  id_festival: string,
  category: string,
  type: string
) {
  // @ts-ignore
  return await window.members.getMember(id_festival, category, type);
}

export async function nextOrder(id_test: string) {
  // @ts-ignore
  return await window.members.getMember(id_test);
}

export async function getSerie(id_serie: string) {
  // @ts-ignore
  return await window.members.getMember(id_serie);
}

export async function endSerie(id_serie: string) {
  // @ts-ignore
  return await window.members.getMember(id_serie);
}
