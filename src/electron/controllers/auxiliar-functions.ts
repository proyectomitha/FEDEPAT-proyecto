import {
  MemberSerieReaction,
  MemberSerieResistance,
  MemberTestHability,
} from "../models/memberTest.js";
import { TestHability } from "../models/testHability.js";
import { SerieReaction, TestReaction } from "../models/testReaction.js";
import { SerieResistance, TestResistance } from "../models/testResistance.js";

// Detecta y devuelve la relación correcta dado la serie y el participante
export async function get_relation(id_member: string, id_serie: string) {
  // Evaluamos si la serie se trata de una de habilidad, reacción o resistencia
  // Hability
  const tHability = await MemberTestHability.findOne({
    where: { member_id: id_member, test_hability_id: id_serie },
  });
  if (tHability) return tHability;
  // Reaction
  const tReaction = await MemberSerieReaction.findOne({
    where: { member_id: id_member, serie_reaction_id: id_serie },
  });
  if (tReaction) return tReaction;
  // Resistance
  const tResistance = await MemberSerieResistance.findOne({
    where: { member_id: id_member, serie_resistance_id: id_serie },
  });
  if (tResistance) return tResistance;
}

// Detecta y devuelve la prueba correcta dado la serie y el participante
export async function get_test(id: string) {
  // Evaluamos si la serie se trata de una de habilidad, reacción o resistencia
  // Hability
  const tHability = await TestHability.findOne({ where: { id: id } });
  if (tHability) return tHability;
  // Reaction
  const tReaction = await TestReaction.findOne({ where: { id: id } });
  if (tReaction) return tReaction;
  // Resistance
  const tResistance = await TestResistance.findOne({ where: { id: id } });
  if (tResistance) return tResistance;
}

// Detecta y devuelve la prueba correcta dado la serie y el participante
export async function get_serie(id: string) {
  // Evaluamos si la serie se trata de una de habilidad, reacción o resistencia
  // Hability
  const tHability = await TestHability.findOne({ where: { id: id } });
  if (tHability) return tHability;
  // Reaction
  const tReaction = await SerieReaction.findOne({ where: { id: id } });
  if (tReaction) return tReaction;
  // Resistance
  const tResistance = await SerieResistance.findOne({ where: { id: id } });
  if (tResistance) return tResistance;
}

//Función para calcular edad
export function calcularEdad(fechaNacimiento: Date): number {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const m = hoy.getMonth() - fechaNacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}

// Ordenar por serpenteo. Es necesario pasar un array ordenado
export function serpenteo(lista: any[], series: number) {
  const finalOrder: any[][] = [];
  let temporalOrder: any[] = [];

  let i = 0;
  let p = -1;

  while (i < lista.length) {
    for (let j = 0; j < series; j++) {
      if (i >= lista.length) break;
      temporalOrder.push(lista[i]);
      i++;
    }

    p *= -1;
    if (p === 1) {
      finalOrder.push([...temporalOrder]); // misma dirección
    } else {
      finalOrder.push([...temporalOrder].reverse()); // invertida
    }
    temporalOrder = [];
  }

  // Reorganizar por columnas → formar las series finales
  const seriesArray: any[][] = [];
  for (let j = 0; j < series; j++) {
    const serie: any[] = [];
    for (let i = 0; i < finalOrder.length; i++) {
      if (finalOrder[i][j] !== undefined) {
        serie.push(finalOrder[i][j]);
      }
    }
    seriesArray.push(serie);
  }

  return seriesArray;
}

//Función que se le indica el tipo de competencia  y un array [{id, score, time}, ...]
export function ordenarPosiciones(type: string, array: any[]) {
  let resultado = [];
  if (type === "time") {
    //Ordenar por tiempo
    resultado = array.sort((a, b) => a.time - b.time);
  } else {
    //Ordenar por criterio de posición y tiempo
    resultado = array.sort((a, b) => {
      if (b.score === a.score) {
        return a.time - b.time;
      }
      return b.score - a.score;
    });
  }
  return resultado;
}
