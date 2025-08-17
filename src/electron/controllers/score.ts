import { get_relation } from "./auxiliar-functions.js";

//==================================================== Puntajes globales

// get score from club

// get global score from club

// get scores by order in festival

// get global scores by order

//===================================================== Puntajes de cada prueba

// get score by order in test
export async function get_score_in_test(id: string) {}

// get score by order in serie
export async function get_score_in_serie(id: string) {}

//===================================================== Asignar puntuación

// set score to member in test
export async function set_score_in_serie(
  id_member: string,
  id_serie: string,
  score: number,
  time: number
) {
  const relation = await get_relation(id_member, id_serie);
  return relation?.update({ time: time, score: score });
}
