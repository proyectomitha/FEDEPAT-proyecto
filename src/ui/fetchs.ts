import type { Club, Festival, Member, newFestival, NewMember } from "./types";
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

export async function setScore(
  id_member: string,
  id_serie: string,
  score: number,
  time: any
) {
  console.log("saved - " + score + " - " + time);
  //console.log(id_member, id_serie, score, time);
  // @ts-ignore
  return await window.score.setScore(id_member, id_serie, score, time);
}

//============== Clubs ===============//
export async function getClubs() {
  // @ts-ignore
  return await window.clubs.getClubs();
}

export async function addMemberToClub(id_club: string, member: NewMember) {
  // @ts-ignore
  return await window.clubs.addMemberToClub(id_club, member);
}

export async function getClub(
  id_club: string
): Promise<{ club: Club; members: Member[] }> {
  // @ts-ignore
  return await window.clubs.getClub(id_club);
}

export async function createClub(data: any): Promise<any> {
  // @ts-ignore
  return await window.clubs.createClub(data);
}

export async function updateClub(id_club: string, club: Club) {
  // @ts-ignore
  return await window.clubs.updtateClub(id_club, club);
}

export async function deleteClub(
  id_club: string
): Promise<{ club: Club; members: Member[] }> {
  // @ts-ignore
  return await window.clubs.deleteClub(id_club);
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

export async function createFestival(data: newFestival): Promise<Festival> {
  //@ts-ignore
  return await window.festivals.createFestival(data);
  /*  name: "Nuevo festival",
    description: "Descripción ...",
    startDate: new Date(),
    endDate: new Date(),
  });*/
}

export async function updateFestival(id: string, data: any) {
  //@ts-ignore
  return await window.festivals.updateFestival(id, {
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
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

export async function deleteMember(id_member: string) {
  // @ts-ignore
  return await window.members.deleteMember(id_member);
}

export async function updateMember(id_member: string, data: Member) {
  // @ts-ignore
  return await window.members.updtateMember(id_member, data);
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

export async function getTestHability(id_festival: string, category: string) {
  // @ts-ignore
  return await window.festivals.getTestHability(id_festival, category);
}

export async function getTestReaction(id_festival: string, category: string) {
  // @ts-ignore
  return await window.festivals.getTestReaction(id_festival, category);
}

export async function getSerieReaction(id_serie: string) {
  // @ts-ignore
  return await window.score.getScoreSerieReaction(id_serie);
}

export async function getTestResistance(id_festival: string, category: string) {
  // @ts-ignore
  return await window.festivals.getTestResistance(id_festival, category);
}

export async function getSerieResistance(id_serie: string) {
  // @ts-ignore
  return await window.score.getScoreSerieResistance(id_serie);
}

export async function endSerieReaction(id_serie: string) {
  // @ts-ignore
  return await window.tests.endSerieReaction(id_serie);
}

export async function endSerieResistance(id_serie: string) {
  // @ts-ignore
  return await window.tests.endSerieResistance(id_serie);
}

//=============== Test =====================
export async function updateTestReaction(
  id: string,
  type: string,
  maxmember: number,
  strict_mode: number
) {
  //@ts-ignore
  return await window.tests.configureTestReaction(
    id,
    type,
    strict_mode,
    maxmember
  );
}

export async function updateTestResistence(
  id: string,
  type: string,
  maxmember: number,
  strict_mode: number
) {
  //@ts-ignore
  return await window.tests.configureTestResistance(
    id,
    type,
    strict_mode,
    maxmember
  );
}

export async function startTestReaction(id: string) {
  // @ts-ignore
  return await window.tests.startTestReaction(id);
}

export async function endTestHability(id: string) {
  // @ts-ignore
  return await window.tests.endTestHability(id);
}

export async function auxiliar(id: string) {
  // @ts-ignore
  return await window.tests.auxiliar(id);
}
