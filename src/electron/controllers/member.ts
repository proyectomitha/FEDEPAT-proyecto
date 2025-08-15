import { Member } from "../models/member.js";
import { Op } from "sequelize";

//1 obtener user por id
export async function get_member(id: string) {
  return await Member.findByPk(id);
}

//2 obtener todos los users
export async function get_members() {
  return await Member.findAll();
}

//2.5 obtener los participantes de una misma edad
export async function get_members_by_old(from: number, to: number) {
  return null;
}

//3 obtener todos los users entre dos fechas
export async function get_member_by_birth(from: Date, to: Date) {
  return Member.findAll({
    where: {
      birth: {
        [Op.gt]: from,
        [Op.lt]: to,
      },
    },
    order: [["birth", "ASC"]],
  });
}

//4 Crear user
export async function create_member(data: any) {
  return await Member.create(data);
}

//5 Borrar user
export async function delete_member(id: string) {
  return await Member.destroy({
    where: {
      id: id,
    },
  });
}

//6 Actualizar user
export async function update_member(id: string, data: any) {
  let member = await Member.findByPk(id);
  if (!member) return null;
  return await member.update(data);
}
