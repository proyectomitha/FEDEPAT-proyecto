import { Member } from "../models/member.js";
import { MemberSerieReaction } from "../models/memberTest.js";
import { SerieReaction, TestReaction } from "../models/testReaction.js";
import { get_relation } from "./auxiliar-functions.js";

//==================================================== Puntajes globales

// get score from club

// get global score from club

// get scores by order in festival

// get global scores by order

//===================================================== Puntajes de cada prueba

// get score by order in test
export async function get_score_in_test_reaction(id: string) {
  const serie = await TestReaction.findAll({
    where: { id },
    include: [
      {
        model: SerieReaction,
        where: { order: 3 },
        include: [
          {
            model: Member,
            through: {
              attributes: ["score", "time"],
            },
          },
        ],
      },
    ],
    order: [[SerieReaction, Member, MemberSerieReaction, "score", "DESC"]],
  });
  return serie;
}

// get score by order in serie
export async function get_score_in_serie_reaction(id: string) {
  const serie = await SerieReaction.findAll({
    where: { id: id },
    include: {
      model: Member,
      through: {
        attributes: ["score", "time"],
      },
    },
    order: [[Member, MemberSerieReaction, "score", "DESC"]],
  });
  return serie;
}

//===================================================== Asignar puntuación

// set score to member in test
export async function set_score_in_serie(
  id_member: string,
  id_serie: string,
  score: number,
  time: number
) {
  const relation = await get_relation(id_member, id_serie);
  return relation
    ? relation.update({ time: time, score: score })
    : { status: "error", error: "relation not found" };
}
