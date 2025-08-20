//============== Clubs ===============//

import type { Club, Member } from "./types";

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
