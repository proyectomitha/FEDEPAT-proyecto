import { add_members_to_festival } from "../controllers/festival.js";
import { start_festival } from "../controllers/tests.js";
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

        gender: "M",
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
        gender: "F",
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
        gender: "F",
      },
    });

    const [member4]: any = await Member.findOrCreate({
      where: {
        name: "Marco",
        lastname: "Quesada",
      },
      defaults: {
        name: "Marco",
        lastname: "Quesada",
        birth: new Date("2015-05-12"),
        number: "1",
        gender: "M",
      },
    });

    const [member5]: any = await Member.findOrCreate({
      where: {
        name: "Camila",
        lastname: "Payer",
      },
      defaults: {
        name: "Camila",
        lastname: "Payer",
        birth: new Date("2015-05-12"),
        number: "1",
        gender: "F",
      },
    });

    const [member6]: any = await Member.findOrCreate({
      where: {
        name: "Rocío",
        lastname: "Villén",
      },
      defaults: {
        name: "Rocío",
        lastname: "Villén",
        birth: new Date("2015-05-12"),
        number: "1",
        gender: "F",
      },
    });

    const [member7]: any = await Member.findOrCreate({
      where: {
        name: "Guillermo",
        lastname: "Gutierrez",
      },
      defaults: {
        name: "Guillermo",
        lastname: "Gutierrez",
        birth: new Date("2015-05-12"),
        number: "1",
        gender: "M",
      },
    });

    const [member8]: any = await Member.findOrCreate({
      where: {
        name: "Lucía",
        lastname: "Sierra",
      },
      defaults: {
        name: "Lucía",
        lastname: "Sierra",
        birth: new Date("2015-05-12"),
        number: "1",
        gender: "F",
      },
    });

    const [member9]: any = await Member.findOrCreate({
      where: {
        name: "Inés",
        lastname: "Pose",
      },
      defaults: {
        name: "Inés",
        lastname: "Pose",
        birth: new Date("2015-05-12"),
        number: "1",
        gender: "F",
      },
    });

    await club2.addMember(member1);
    await club2.addMember(member2);
    await club1.addMember(member3);
    await club1.addMember(member4);
    await club2.addMember(member5);
    await club1.addMember(member6);
    await club1.addMember(member7);
    await club2.addMember(member8);
    await club2.addMember(member9);

    //Crear festival
    const [festival]: any = await Festival.findOrCreate({
      where: { name: "Torneo de prueba" },
      defaults: { name: "Torneo de prueba" },
    });
    const members: any = [
      member1.id,
      member2.id,
      member3.id,
      member4.id,
      member5.id,
      member6.id,
      member7.id,
      member8.id,
      member9.id,
    ];
    await add_members_to_festival(festival.id, members);
    await start_festival(festival.id);

    console.log("\n\n//========== Seed creado exitosamente.\n\n");
  } catch (error) {
    console.error("\n\n//======= Error en seed:", error);
  }
}
