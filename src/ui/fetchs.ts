//============== Clubs ===============//

import type { Club, Festival, Member } from "./types";

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
