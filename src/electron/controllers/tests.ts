import { Festival } from "../models/festival.js";
import { TestHability } from "../models/testHability.js";
import { SerieReaction, TestReaction } from "../models/testReaction.js";
import { TestResistance } from "../models/testResistance.js";
import {
  MemberSerieReaction,
  MemberTestHability,
} from "../models/memberTest.js";
import { Member } from "../models/member.js";
import {
  ordenarPosiciones,
  serpenteo,
  calcularEdad,
} from "./auxiliar-functions.js";

//start festival and create Test Hability
/**
 * Al iniciar el festival se analiza los participantes que hay y se crean las categorias
 * y las pruebas para cada categoría.
 * También se añaden los participantes a cada prueba según su edad
 */
export async function start_festival(id: string) {
  const festival = await Festival.findByPk(id);
  if (!festival) return { error: `Festival ${id} not found` };

  //Bloquear el festival
  festival.update({ locked: true });

  //==Crear pruebas
  // Obtener miembros desde la relación
  const members = await (festival as any).getMembers();

  // Definimos rangos de edad con su nombre
  const rangos = [
    { nombre: "menores de 6 femenino", gender: "F", min: 0, max: 5 },
    { nombre: "menores de 6 masculino", gender: "M", min: 0, max: 5 },
    { nombre: "7-8 femenino", gender: "F", min: 7, max: 8 },
    { nombre: "7-8 masculino", gender: "M", min: 7, max: 8 },
    { nombre: "9-10 femenino", gender: "F", min: 9, max: 10 },
    { nombre: "9-10 masculino", gender: "M", min: 9, max: 10 },
    { nombre: "11-12 femenino", gender: "F", min: 11, max: 12 },
    { nombre: "11-12 masculino", gender: "M", min: 11, max: 12 },
    { nombre: "13-14 femenino", gender: "F", min: 13, max: 14 },
    { nombre: "13-14 masculino", gender: "M", min: 13, max: 14 },
    { nombre: "15-16 femenino", gender: "F", min: 15, max: 16 },
    { nombre: "15-16 masculino", gender: "M", min: 15, max: 16 },
  ];

  // Creamos objeto de categorías solo con las que tengan miembros
  const categorias: Record<string, any> = {};

  for (const rango of rangos) {
    // Filtrar miembros que caen en el rango actual
    const miembrosEnRango = members.filter((m: any) => {
      const edad = calcularEdad(m.birth);
      return (
        edad >= rango.min && edad <= rango.max && rango.gender === m.gender
      );
    });

    // Solo agregar categoría si hay miembros
    if (miembrosEnRango.length > 0) {
      categorias[rango.nombre] = {
        members: miembrosEnRango,
        gender: rango.gender,
      };
    }
  }

  //Creamos las pruebas de cada categoría e inscirbimos para la de habilidad
  for (var categoria in categorias) {
    //Crear prueba de habilidad
    const [phab]: any = await TestHability.findOrCreate({
      where: {
        festival_id: id,
        category: categoria,
        gender: categorias[categoria].gender,
      },
      defaults: {
        category: categoria,
        gender: categorias[categoria].gender,
      },
    });
    await (festival as any).addTestHability(phab);

    //Crear prueba de reacción
    const [preact]: any = await TestReaction.findOrCreate({
      where: {
        festival_id: id,
        category: categoria,
        gender: categorias[categoria].gender,
      },
      defaults: {
        category: categoria,
        gender: categorias[categoria].gender,
      },
    });
    await (festival as any).addTestReaction(preact);

    //Crear prueba de resistencia
    const [pres]: any = await TestResistance.findOrCreate({
      where: {
        festival_id: id,
        category: categoria,
        gender: categorias[categoria].gender,
      },
      defaults: {
        category: categoria,
        gender: categorias[categoria].gender,
      },
    });
    await (festival as any).addTestResistance(pres);

    //Inscribir a pruebas iniciales (Habilidad)
    const miembros = categorias[categoria].members; // <- OJO: clave dinámica
    if (miembros && miembros.length) {
      const memberIds = miembros.map((m: any) => m.id ?? m.get?.("id"));
      if (typeof (phab as any).addMembers === "function") {
        await (phab as any).addMembers(memberIds);
      } else {
        for (const mid of memberIds) {
          await (phab as any).addMember(mid);
        }
      }
    }
  }
}

//Configurar la organización de la prueba de reacción e iniciarla
export async function configure_test_reaction(
  id: string,
  n_series: number,
  type: string,
  strict_mode: number,
  n_max: number
) {
  //Obtenemos los datos de la competencia
  const tReaction: any = await TestReaction.findByPk(id);
  if (!tReaction) return { status: "error", error: "Test reaction not found" };

  //Obtenemos el número de participantes en la prueba
  const testHability: any = await TestHability.findOne({
    where: {
      category: tReaction.category,
      festival_id: tReaction.festival_id,
    },
  });
  if (!testHability)
    return { status: "error", error: "Test hability not found" };
  const members = await testHability.getMembers();
  const n_members = members.length;

  //Calculamos el número de order
  let series: number = n_series; //Número de series iniciales que tiene la prueba
  let order: number = 3; //Número de rondas que tiene la prueba
  let divisor: number = n_max; //Número de participantes que avanzarán a la ronda 2
  if (n_members > n_max ** 2 + n_max * strict_mode) {
    // Hay 3 rondas y empieza en la fase de grupos
    order = 1;

    // Calculamos el divisor
    let aux: boolean = false;
    let i_0: number = 4;
    for (let i = 4; i > 1; i--) {
      if (
        Math.ceil(n_members / i) > 10 &&
        Math.ceil(n_members / i) < n_max ** 2 &&
        i < i_0
      ) {
        aux = true;
        i_0 = i;
      }
    }
    aux ? (divisor = Math.ceil(n_members / i_0)) : (divisor = n_max);

    //Guardamos el número de series para iniciar la prueba
    series = n_series;
  } else if (
    n_members <= n_max ** 2 + n_max * strict_mode ||
    n_members > n_max + strict_mode
  ) {
    // Hay 2 rondas y empieza en la semi final
    order = 2;
    divisor = n_members;

    //Guardamos el número de series para iniciar la prueba
    series = Math.ceil(n_members / n_max);
  } else {
    // Hay solo una ronda y empieza en la final
    order = 3;
    divisor = n_members;
    series = 1;
  }

  await tReaction.update({
    numberSeries: series,
    numberTests: order,
    divisor: divisor,
    type: type,
  });

  return await start_test_reaction(id);
}

//Start test Reaction. No depende del orden
export async function start_test_reaction(id: string) {
  //Obtener datos
  const tReaction: any = await TestReaction.findByPk(id);
  if (!tReaction) return { status: "error", error: "Test reaction not found" };
  const n_series = tReaction.numberSeries;
  const n_order = tReaction.numberTests;

  //Obtener resultados de la prueba de habilidad
  const testHability: any = await TestHability.findOne({
    where: {
      category: tReaction.category,
      festival_id: tReaction.festival_id,
    },
  });
  if (!testHability)
    return { status: "error", error: "Test hability not found" };
  const results = await MemberTestHability.findAll({
    attributes: ["member_id"],
    where: {
      test_hability_id: testHability.id,
    },
    order: [["time", "DESC"]],
  });

  //Ordenar por serpenteo
  const orderSerp = await serpenteo(results, n_series);

  //Crear serie y asignamos los participantes
  for (let i = 0; i < orderSerp.length; i++) {
    //Creamos la serie
    const newSerie: any = await SerieReaction.create({
      number: i + 1,
      order: n_order,
    });
    await tReaction.addSerieReaction(newSerie);
    for (let j = 0; j < orderSerp[i].length; j++) {
      //asignamos los participantes a la serie creada
      const member = await Member.findByPk(orderSerp[i][j]);
      await newSerie.addMember(member);
    }
  }

  //Enviar mensaje de ok
  return { status: "success" };
}

//Next test Reaction. Evalua el orden y pasa al siguiente en caso de existir
export async function next_test_reaction(id: string, n_max: number) {
  //Obtener datos
  const tReaction: any = await TestReaction.findByPk(id);
  if (!tReaction) return { status: "error", error: "Test reaction not found" };
  const n_order = tReaction.numberTests;
  const divisor = tReaction.divisor;
  const type = tReaction.type;

  //Determinar el order actual de las series
  const memberSerie: any = await MemberSerieReaction.findOne({
    attributes: ["order"],
    where: {
      serie_reaction_id: id,
    },
    order: [["order", "DESC"]],
  });
  const actual_order = memberSerie.order;

  //Comprobar que las series de la última order están lockeadas
  const memberSerieDontLocked: any = await MemberSerieReaction.findOne({
    where: {
      serie_reaction_id: id,
      locked: false,
      order: actual_order,
    },
  });
  if (memberSerieDontLocked)
    return { status: "error", error: "One or more sets are not over" };

  //Casuistica
  //En caso de estar en orden 3 lockear
  if (actual_order == 3) await tReaction.update({ locked: true });

  //En caso de estar en orden 2 ordenar y configurar la última serie (final)
  if (actual_order == 2) {
    const members: any = MemberSerieReaction.findAll({
      where: {
        order: actual_order,
        serie_reaction_id: id,
      },
    });
    //ordenar las posiciones
    const order_members = ordenarPosiciones(type, members);

    //Crear siguiente ronda
    const lastSerie = await SerieReaction.findOrCreate({
      where: {
        order: actual_order + 1,
        test_reaction_id: id,
      },
      defaults: {
        number: 1,
        order: actual_order + 1,
      },
    });
    tReaction.addSerieReaction(lastSerie);

    //filtrar los que pasan a la siguiente ronda (n_max) y asignarlos a lastSerie:
  }

  //En caso de estar en orden 1 ordenar y configurar las siguientes series (semifinal)
  if (actual_order == 1) {
    const members: any = MemberSerieReaction.findAll({
      where: {
        order: actual_order,
        serie_reaction_id: id,
      },
    });
    //ordenar las posiciones
    const order_members = ordenarPosiciones(type, members);

    //filtrar miembros. los primeros divisor members
    const next_members = order_members;

    //numero de series de la ronda 2
    const n_series = Math.ceil(next_members.length / n_max);

    //Crear serie y asignamos los participantes
    const orderSerp = serpenteo(next_members, n_series);
    for (let i = 0; i < orderSerp.length; i++) {
      //Creamos la serie
      const newSerie: any = await SerieReaction.create({
        number: i + 1,
        order: actual_order + 1,
      });
      await tReaction.addSerieReaction(newSerie);
      for (let j = 0; j < orderSerp[i].length; j++) {
        //asignamos los participantes a la serie creada
        const member = await Member.findByPk(orderSerp[i][j]);
        await newSerie.addMember(member);
      }
    }
  }
}
