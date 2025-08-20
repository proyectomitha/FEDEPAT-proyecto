import { Club } from "../models/club.js";
import { Member } from "../models/member.js";

//Get club
export async function get_club(id: string) {
  const club = await Club.findByPk(id);
  const members = await (club as any).getMembers();
  return { club: club, members: members };
}

//get all club
export async function get_clubs() {
  return await Club.findAll();
}

//create club
export async function create_club(data: any) {
  return await Club.create(data);
}

//update club
export async function update_club(id: string, data: any) {
  const club = await Club.findByPk(id);
  if (!club) return null;
  return await club.update(data);
}

//delete club
export async function delete_club(id: string) {
  return await Club.destroy({
    where: {
      id: id,
    },
  });
}

//add member
export async function add_member_to_club(id_club: string, data_member: any) {
  const club = await Club.findByPk(id_club);
  if (!club) return { error: `Club ${id_club} not found` };
  const member = await Member.findOrCreate({
    where: data_member,
    defaults: data_member,
  });
  return await (club as any).addMember(member);
}

//get members
export async function get_member_from_club(id_club: string) {
  const club = await Club.findByPk(id_club);
  if (!club) return { error: `Club ${id_club} not found` };
  return await (club as any).getMembers();
}
