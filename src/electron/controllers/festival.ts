import { Festival } from "../models/festival.js";
import { Member } from "../models/member.js";
import { TestHability } from "../models/testHability.js";
import { SerieReaction, TestReaction } from "../models/testReaction.js";
import { SerieResistance, TestResistance } from "../models/testResistance.js";

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
  return (await festival.update(data)).dataValues;
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
  if (festival.locked) return { error: "this festival has begun" };

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
  if (festival.locked) return { error: "this festival has begun" };

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

//get categorias
export async function get_categories(id_festival: string) {
  return (
    await TestHability.findAll({
      attributes: ["id", "category"],
      where: {
        festival_id: id_festival,
      },
      order: [["category", "DESC"]],
    })
  ).map((m: any) => m.toJSON());
}

//get pruebas de festival y categoria
export async function get_tests(id_festival: string, category: string) {
  const testHabilitys = await await TestHability.findAll({
    where: {
      festival_id: id_festival,
      category: category,
    },
    order: [["category", "DESC"]],
  });
  const testReactions = await TestReaction.findAll({
    where: {
      festival_id: id_festival,
      category: category,
    },
    order: [["category", "DESC"]],
  });
  const testResistances = await TestResistance.findAll({
    where: {
      festival_id: id_festival,
      category: category,
    },
    order: [["category", "DESC"]],
  });
  return {
    habilityTest: testHabilitys.map((m: any) => m.toJSON()),
    reactionTest: testReactions.map((m: any) => m.toJSON()),
    resistanceTest: testResistances.map((m: any) => m.toJSON()),
  };
}

//get prueba de resistencia de festival y categoria
export async function get_test_resistance(
  id_festival: string,
  category: string
) {
  const testResistances = await TestResistance.findAll({
    where: {
      festival_id: id_festival,
      category: category,
    },
    include: [
      {
        model: SerieResistance,
        as: "serieResistances",
        include: [
          {
            model: Member,
            as: "members",
            through: { attributes: ["score", "time"] },
          },
        ],
      },
    ],
    order: [["category", "DESC"]],
  });
  return {
    resistanceTest: testResistances.map((m: any) => m.toJSON()),
  };
}

//get prueba de habilidad de festival y categoria
export async function get_test_hability(id_festival: string, category: string) {
  const testHabilitys = await await TestHability.findAll({
    where: {
      festival_id: id_festival,
      category: category,
    },
    order: [["category", "DESC"]],
  });
  return {
    habilityTest: testHabilitys.map((m: any) => m.toJSON()),
  };
}

//get prueba de reacción de festival y categoria
export async function get_test_reaction(id_festival: string, category: string) {
  const testReactions = await TestReaction.findAll({
    where: {
      festival_id: id_festival,
      category: category,
    },
    include: [
      {
        model: SerieReaction,
        as: "serieReactions",
        include: [
          {
            model: Member,
            as: "members",
            through: { attributes: ["score", "time"] },
          },
        ],
      },
    ],
    order: [["category", "DESC"]],
  });

  return {
    reactionTest: testReactions.map((m: any) => m.toJSON()),
  };
}
