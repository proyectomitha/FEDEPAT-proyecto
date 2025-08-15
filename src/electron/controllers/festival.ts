import { Festival } from "../models/festival.js";
import { Member } from "../models/member.js";
import { TestHability } from "../models/testHability.js";
import { TestReaction } from "../models/testReaction.js";
import { TestResistance } from "../models/testResistance.js";

//get festival
export async function get_festival(id: string) {
  const festival = await Festival.findByPk(id);
  const members = await (festival as any).getMembers();
  return { festival: festival, members: members };
}

//get all festival
export async function get_all_festival() {
  return await Festival.findAll();
}

//create festival
export async function create_festival(data: any) {
  return Festival.create(data);
}

//update festival
export async function update_festival(id: string, data: any) {
  const festival = await Festival.findByPk(id);
  if (!festival) return null;
  return await festival.update(data);
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

  //En caso de no haber comenzado se agregan los miembros al festival
  members.map(async (id) => {
    const member = await Member.findByPk(id);
    await (festival as any).addMember(member);
  });

  //Devolvemos los miembros actuales
  return (festival as any).getMembers();
}

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
    { nombre: "menores de 6", min: 0, max: 5 },
    { nombre: "7-8", min: 7, max: 8 },
    { nombre: "9-10", min: 9, max: 10 },
    { nombre: "11-12", min: 11, max: 12 },
    { nombre: "13-14", min: 13, max: 14 },
    { nombre: "15-16", min: 15, max: 16 },
  ];

  // Creamos objeto de categorías solo con las que tengan miembros
  const categorias: Record<string, any[]> = {};

  for (const rango of rangos) {
    // Filtrar miembros que caen en el rango actual
    const miembrosEnRango = members.filter((m: any) => {
      const edad = calcularEdad(m.birth);
      return edad >= rango.min && edad <= rango.max;
    });

    // Solo agregar categoría si hay miembros
    if (miembrosEnRango.length > 0) {
      categorias[rango.nombre] = miembrosEnRango;
    }
  }

  //Creamos las pruebas de cada categoría e inscirbimos para la de habilidad
  for (var categoria in categorias) {
    //Crear prueba de habilidad
    const [phab]: any = await TestHability.findOrCreate({
      where: {
        festival_id: id,
        category: categoria,
      },
      defaults: { category: categoria },
    });
    await (festival as any).addTestHability(phab);

    //Crear prueba de reacción
    const [preact]: any = await TestReaction.findOrCreate({
      where: {
        festival_id: id,
        category: categoria,
      },
      defaults: { category: categoria },
    });
    await (festival as any).addTestReaction(preact);

    //Crear prueba de resistencia
    const [pres]: any = await TestResistance.findOrCreate({
      where: {
        festival_id: id,
        category: categoria,
      },
      defaults: { category: categoria },
    });
    await (festival as any).addTestResistance(pres);

    //Inscribir a pruebas iniciales (Habilidad)
    const miembros = categorias[categoria]; // <- OJO: clave dinámica
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

//Start test Reaction
export async function start_test_reaction(
  id: string,
  n_series: number,
  n_order: number,
  clasification: number //Número de participantes que clasifican
) {
  //Obtener resultados de la prueba de habilidad
  //Ordenar resultados por serpenteo
  //Asignar participantes a la serie
}

//Start test Resistencia

//Completar grupo de serie (order) reacción
/**
 * Se pasa el test que se quiere avanzar y el orden
 * Verifica si todos los atletas han completado y los datos están rellenos y en caso de estarlo y la
 * serie ser mayor a 1 se pasa a la siguiente y la configura
 * En caso de ser 1 se da por concluida la prueba
 */
export async function end_order_reaction(
  id_test_reaction: string,
  order: number
) {}

//Completar grupo de serie resistencia

//Completar grupo de prueba de habilidad

//End festival
/**
 * Se elige un festival
 * Se comprueba que todas las pruebas estén bloqueadas (terminadas)
 * En caso de estar bloqueadas genera un informe con los datos
 */

//Función para calcular edad
function calcularEdad(fechaNacimiento: Date): number {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const m = hoy.getMonth() - fechaNacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}
