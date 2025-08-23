import { sequelize } from "../database/db.js";
import { Club } from "../models/club.js";
import { Member } from "../models/member.js";
import {
  MemberSerieReaction,
  MemberSerieResistance,
  MemberTestHability,
} from "../models/memberTest.js";
import { TestHability } from "../models/testHability.js";
import { SerieReaction, TestReaction } from "../models/testReaction.js";
import { SerieResistance, TestResistance } from "../models/testResistance.js";
import { get_relation } from "./auxiliar-functions.js";
import { Sequelize, fn, col } from "sequelize";

//==================================================== Puntajes globales

export async function getGlobalScore(id_club: string) {
  let clubesScore: any[] = [];
  let result: any[] = [];

  try {
    clubesScore = await Club.findAll({
      attributes: ["id", "name"],
      where: { id: id_club },
      include: [
        {
          model: Member,
          as: "members",
          attributes: ["id", "name"],
          include: [
            {
              model: TestHability,
              as: "testHabilitys",
              attributes: ["id", "category"],
              through: { attributes: ["score", "time"] },
              required: false,
            },
            {
              model: SerieReaction,
              as: "serieReactions",
              attributes: ["id"],
              through: { attributes: ["score"] },
              required: false,
              include: [
                {
                  model: TestReaction,
                  as: "testReactions",
                  attributes: ["id", "category"],
                  required: false,
                },
              ],
            },
            {
              model: SerieResistance,
              as: "serieResistances",
              attributes: ["id"],
              through: { attributes: ["score"] },
              required: false,
              include: [
                {
                  model: TestResistance,
                  as: "testResistances",
                  attributes: ["id", "category"],
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    });

    result = clubesScore.map((club: any) => {
      let habilityScore = 0;
      let reactionScore = 0;
      let resistanceScore = 0;

      club.members.forEach((member: any) => {
        // Habilidades
        member.testHabilitys?.forEach((test: any) => {
          habilityScore += test.MemberTestHability?.score || 0;
        });

        // Reacciones
        member.serieReactions?.forEach((serie: any) => {
          reactionScore += serie.MemberSerieReaction?.score || 0;
        });

        // Resistencias
        member.serieResistances?.forEach((serie: any) => {
          resistanceScore += serie.MemberSerieResistance?.score || 0;
        });
      });

      return {
        id: club.id,
        club: club.name,
        habilityScore,
        reactionScore,
        resistanceScore,
        totalScore: habilityScore + reactionScore + resistanceScore,
      };
    });
  } catch (error) {
    console.log(`\n\n club ${error} \n\n`);
  }

  // ordenar descendente por totalScore
  const sortedResult = result.sort((a, b) => b.totalScore - a.totalScore);

  return sortedResult;
}

export async function getGlobalScores() {
  let clubesScore: any[] = [];
  let result: any[] = [];

  try {
    clubesScore = await Club.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Member,
          as: "members",
          attributes: ["id", "name"],
          include: [
            {
              model: TestHability,
              as: "testHabilitys",
              attributes: ["id", "category"],
              through: { attributes: ["score", "time"] },
              required: false,
            },
            {
              model: SerieReaction,
              as: "serieReactions",
              attributes: ["id"],
              through: { attributes: ["score"] },
              required: false,
              include: [
                {
                  model: TestReaction,
                  as: "testReactions",
                  attributes: ["id", "category"],
                  required: false,
                },
              ],
            },
            {
              model: SerieResistance,
              as: "serieResistances",
              attributes: ["id"],
              through: { attributes: ["score"] },
              required: false,
              include: [
                {
                  model: TestResistance,
                  as: "testResistances",
                  attributes: ["id", "category"],
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    });

    result = clubesScore.map((club: any) => {
      let habilityScore = 0;
      let reactionScore = 0;
      let resistanceScore = 0;

      club.members.forEach((member: any) => {
        // Habilidades
        member.testHabilitys?.forEach((test: any) => {
          habilityScore += test.MemberTestHability?.score || 0;
        });

        // Reacciones
        member.serieReactions?.forEach((serie: any) => {
          reactionScore += serie.MemberSerieReaction?.score || 0;
        });

        // Resistencias
        member.serieResistances?.forEach((serie: any) => {
          resistanceScore += serie.MemberSerieResistance?.score || 0;
        });
      });

      return {
        id: club.id,
        club: club.name,
        habilityScore,
        reactionScore,
        resistanceScore,
        totalScore: habilityScore + reactionScore + resistanceScore,
      };
    });
  } catch (error) {
    console.log(`\n\n Error en getGlobalScores: ${error} \n\n`);
  }

  // ordenar descendente por totalScore
  const sortedResult = result.sort((a, b) => b.totalScore - a.totalScore);

  return sortedResult;
}

export async function getGlobalScoreFestival(festival_id: string) {
  let clubesScore: any;
  let result: any;

  try {
    // Clubes con total de score de todos sus miembros
    clubesScore = await Club.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Member,
          as: "members",
          attributes: ["id", "name"],
          include: [
            {
              model: TestHability,
              as: "testHabilitys",
              where: { festival_id },
              attributes: ["id"], // no necesitas todo, solo para recorrer
              through: { attributes: ["score", "time"] },
              required: false,
            },
            {
              model: SerieReaction,
              as: "serieReactions",
              attributes: ["id"],
              through: { attributes: ["score"] },
              required: false,
              include: [
                {
                  model: TestReaction,
                  as: "testReactions",
                  where: {
                    festival_id: festival_id,
                  },
                  attributes: ["id"],
                  required: false,
                },
              ],
            },
            {
              model: SerieResistance,
              as: "serieResistances",
              attributes: ["id"],
              through: { attributes: ["score"] },
              required: false,
              include: [
                {
                  model: TestResistance,
                  as: "testResistances",
                  where: {
                    festival_id: festival_id,
                  },
                  attributes: ["id"],
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    });

    // Procesamos y sumamos manualmente
    result = clubesScore.map((club: any) => {
      let habilityScore = 0;
      let reactionScore = 0;
      let resistanceScore = 0;

      club.members.forEach((member: any) => {
        // Habilidades
        member.testHabilitys?.forEach((test: any) => {
          habilityScore += test.MemberTestHability?.score || 0;
        });

        // Reacciones
        member.serieReactions?.forEach((serie: any) => {
          reactionScore += serie.MemberSerieReaction?.score || 0;
        });

        // Resistencias
        member.serieResistances?.forEach((serie: any) => {
          resistanceScore += serie.MemberSerieResistance?.score || 0;
        });
      });

      return {
        id: club.id,
        club: club.name,
        habilityScore,
        reactionScore,
        resistanceScore,
        totalScore: habilityScore + reactionScore + resistanceScore,
      };
    });

    // Ordenar descendente por totalScore
    result.sort((a: any, b: any) => b.totalScore - a.totalScore);
  } catch (error) {
    console.log(`\n\n club ${error} \n\n`);
    clubesScore = [];
  }

  const sortedResult = result.sort(
    (a: { totalScore: number }, b: { totalScore: number }) =>
      b.totalScore - a.totalScore
  );

  return sortedResult;
}

// get global scores by order
/**
 * Devuelve un objeto {clubesScore, habilityScore, reactionScore, resistanceScore}
 * que incluye un array con los jugadores y el puntaje y tiempo obtenido
 */
export async function getGlobalScoreCategory(
  festivalId: string,
  category: string
) {
  //================================================= Habilidad
  let habilityScore: any;
  try {
    // Habilidad
    habilityScore = await TestHability.findAll({
      where: {
        festival_id: festivalId,
        category: category,
      },
      include: [
        {
          model: Member,
          as: "members",
          through: { attributes: ["score", "time"] },
          //include: [{ model: Club, attributes: ["id", "name"] }],
        },
      ],
      order: [
        [{ model: Member, as: "members" }, MemberTestHability, "score", "DESC"],
      ],
    });
  } catch (error) {
    console.log(`\n\n hab: ${error} \n\n`);
    habilityScore = [];
  }

  //================================================= Reacción
  let reactionScore: any;
  try {
    // Reacción
    reactionScore = await TestReaction.findAll({
      where: {
        festival_id: festivalId,
        category: category,
      },
      include: [
        {
          model: SerieReaction,
          as: "serieReactions",
          where: { order: 3 },
          include: [
            {
              model: Member,
              as: "members", // 👈 este sí lo definiste en belongsToMany
              through: {
                attributes: ["score", "time"],
              },
            },
          ],
        },
      ],
      order: [
        [
          { model: SerieReaction, as: "serieReactions" },
          { model: Member, as: "members" },
          MemberSerieReaction,
          "score",
          "DESC",
        ],
      ],
    });
  } catch (error) {
    console.log(`\n\n react ${error} \n\n`);
    reactionScore = [];
  }

  //================================================= Resistencia
  let resistanceScore: any;
  try {
    // Resistencia
    resistanceScore = await TestResistance.findAll({
      where: { festival_id: festivalId, category: category },
      include: [
        {
          model: SerieResistance,
          as: "serieResistances",
          where: { order: 3 },
          include: [
            {
              model: Member,
              as: "members",
              through: {
                attributes: ["score", "time"],
              },
            },
          ],
        },
      ],
      order: [
        [
          { model: SerieResistance, as: "serieResistances" },
          { model: Member, as: "members" },
          MemberSerieResistance,
          "score",
          "DESC",
        ],
      ],
    });
  } catch (error) {
    console.log(`\n\n res ${error} \n\n`);
    resistanceScore = [];
  }

  //================================================= Clubes
  let clubesScore: any;
  let result: any;

  try {
    // Clubes con total de score de todos sus miembros
    clubesScore = await Club.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Member,
          as: "members",
          attributes: ["id", "name"],
          include: [
            {
              model: TestHability,
              as: "testHabilitys",
              where: {
                category: category,
                festival_id: festivalId,
              },
              attributes: ["id"], // no necesitas todo, solo para recorrer
              through: { attributes: ["score", "time"] },
              required: false,
            },
            {
              model: SerieReaction,
              as: "serieReactions",
              attributes: ["id"],
              through: { attributes: ["score"] },
              required: false,
              include: [
                {
                  model: TestReaction,
                  as: "testReactions",
                  where: {
                    category: category,
                    festival_id: festivalId,
                  },
                  attributes: ["id"],
                  required: false,
                },
              ],
            },
            {
              model: SerieResistance,
              as: "serieResistances",
              attributes: ["id"],
              through: { attributes: ["score"] },
              required: false,
              include: [
                {
                  model: TestResistance,
                  as: "testResistances",
                  where: {
                    category: category,
                    festival_id: festivalId,
                  },
                  attributes: ["id"],
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    });

    // Procesamos y sumamos manualmente
    result = clubesScore.map((club: any) => {
      let habilityScore = 0;
      let reactionScore = 0;
      let resistanceScore = 0;

      club.members.forEach((member: any) => {
        // Habilidades
        member.testHabilitys?.forEach((test: any) => {
          habilityScore += test.MemberTestHability?.score || 0;
        });

        // Reacciones
        member.serieReactions?.forEach((serie: any) => {
          reactionScore += serie.MemberSerieReaction?.score || 0;
        });

        // Resistencias
        member.serieResistances?.forEach((serie: any) => {
          resistanceScore += serie.MemberSerieResistance?.score || 0;
        });
      });

      return {
        id: club.id,
        club: club.name,
        habilityScore,
        reactionScore,
        resistanceScore,
        totalScore: habilityScore + reactionScore + resistanceScore,
      };
    });

    // Ordenar descendente por totalScore
    result.sort((a: any, b: any) => b.totalScore - a.totalScore);
  } catch (error) {
    console.log(`\n\n club ${error} \n\n`);
    clubesScore = [];
  }

  const sortedResult = result.sort(
    (a: { totalScore: number }, b: { totalScore: number }) =>
      b.totalScore - a.totalScore
  );

  return {
    //@ts-ignore
    clubesScore: sortedResult,
    //@ts-ignore
    habilityScore: habilityScore.map((m: any) => m.toJSON()),
    //@ts-ignore
    reactionScore: reactionScore.map((m: any) => m.toJSON()),
    //@ts-ignore
    resistanceScore: resistanceScore.map((m: any) => m.toJSON()),
  };
}

//===================================================== Puntajes de cada prueba individual

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
            as: "members",
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
