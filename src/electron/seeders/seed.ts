import {
  add_members_to_festival,
  start_festival,
  start_test_reaction,
} from "../controllers/festival.js";
import { Club } from "../models/club.js";
import { Festival } from "../models/festival.js";
import { Member } from "../models/member.js";

export async function seed() {
  try {
    //Clubes
    const [club1]: any = await Club.findOrCreate({
      where: { name: "Torogoz" },
      defaults: {
        name: "Torogoz",
        direction: "Calle ficticia #3 Colonia imaginación",
      },
    });

    const [club2]: any = await Club.findOrCreate({
      where: { name: "Mitha" },
      defaults: {
        name: "Mitha",
        direction: "Calle ficticia #8 Colonia imaginación",
      },
    });

    //2 Deportistas
    const [member1]: any = await Member.findOrCreate({
      where: {
        name: "Juan",
        lastname: "Salgado",
      },
      defaults: {
        name: "Juan",
        lastname: "Salgado",
        birth: new Date("2015-05-12"),
        number: "1",
      },
    });

    const [member2]: any = await Member.findOrCreate({
      where: {
        name: "María",
        lastname: "Cañero",
      },
      defaults: {
        name: "María",
        lastname: "Cañero",
        birth: new Date("2015-05-12"),
        number: "1",
      },
    });

    const [member3]: any = await Member.findOrCreate({
      where: {
        name: "Claudia",
        lastname: "Quesada",
      },
      defaults: {
        name: "Claudia",
        lastname: "Quesada",
        birth: new Date("2015-05-12"),
        number: "1",
      },
    });

    await club2.addMember(member3);
    await club2.addMember(member2);
    await club1.addMember(member1);

    //Crear festival
    const [festival]: any = await Festival.findOrCreate({
      where: { name: "Torneo de prueba" },
      defaults: { name: "Torneo de prueba" },
    });

    console.log("\n\n//========== Creación de festival.\n\n");
    //añadir participantes a festival
    const members: any = [member1.id, member2.id, member3.id];
    console.log(JSON.stringify(members));
    await add_members_to_festival(festival.id, members);

    console.log("\n\n//========== Creación de festival. \n\n");
    //Iniciar festival
    /*/console.log(await start_festival(festival.id));
    console.log(
      JSON.stringify(
        await start_test_reaction("63a1dba1-0e67-414e-b743-5a32b6c20bef", 2)
      )
    );*/
    console.log("\n\n//========== Seed creado exitosamente.\n\n");
  } catch (error) {
    console.error("\n\n//======= Error en seed:", error);
  }
}
