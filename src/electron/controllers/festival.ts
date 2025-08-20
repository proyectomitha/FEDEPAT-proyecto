import { Festival } from "../models/festival.js";
import { Member } from "../models/member.js";

//get festival
export async function get_festival(id: string) {
  const festival = await Festival.findByPk(id);
  const members = await (festival as any).getMembers();
  return {
    festival: (festival as any).toJSON(),
    members: members.map((m: any) => m.toJSON()),
  };
}

//get all festival
export async function get_all_festival() {
  return await Festival.findAll();
}

//create festival
export async function create_festival(data: any) {
  return (await Festival.create(data)).dataValues;
}

//update festival
export async function update_festival(id: string, data: any) {
  const festival = await Festival.findByPk(id);
  if (!festival) return null;
  return (await festival.update(data)).toJSON();
}

//delete festival
export async function delete_festival(id: string) {
  return await Festival.destroy({ where: { id: id } });
}

//========================================== FIN DE CRUD

//add members
export async function add_members_to_festival(
  id_festival: string,
  members: [string]
) {
  //analizar si el festival está bloqueado
  const festival: any = await Festival.findByPk(id_festival);
  if (!festival.locked) return { error: "this festival has begun" };

  try {
    //En caso de no haber comenzado se agregan los miembros al festival
    members.map(async (id) => {
      const member = await Member.findByPk(id);
      await (festival as any).addMember(member);
    });
  } catch (error) {
    return { status: "error", error: error };
  }

  return { status: "ok" };
}

//remove members
export async function remove_member_to_festival(
  id_festival: string,
  members: [string]
) {
  //analizar si el festival está bloqueado
  const festival: any = await Festival.findByPk(id_festival);
  if (!festival.locked) return { error: "this festival has begun" };

  //En caso de no haber comenzado se remueven los miembros al festival
  try {
    for (const id of members) {
      const member = await Member.findByPk(id);
      if (member) {
        await (festival as any).removeMember(member);
      }
    }
  } catch (error) {
    return { status: "error", error: error };
  }

  return { status: "ok" };
}
