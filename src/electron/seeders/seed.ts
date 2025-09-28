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
        number: "A123",

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
        number: "124",
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
        number: "213",
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
        number: "331",
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
        number: "121",
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
        number: "351",
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
        number: "541",
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
        number: "101",
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
        number: "209",
        gender: "F",
      },
    });

    const [member100]: any = await Member.findOrCreate({
      where: {
        name: "Alessandra",
        lastname: "María Amaya Morales",
      },
      defaults: {
        name: "Alessandra",
        lastname: "María Amaya Morales",
        birth: new Date("2018-09-05"),
        number: "100",
        gender: "F",
      },
    });

    const [member101]: any = await Member.findOrCreate({
      where: {
        name: "Alisson",
        lastname: "Guadalupe Quintanilla Rosales",
      },
      defaults: {
        name: "Alisson",
        lastname: "Guadalupe Quintanilla Rosales",
        birth: new Date("2012-08-11"),
        number: "101",
        gender: "F",
      },
    });

    const [member102]: any = await Member.findOrCreate({
      where: {
        name: "Karla",
        lastname: "Montserrat Quintanilla Rosales",
      },
      defaults: {
        name: "Karla",
        lastname: "Montserrat Quintanilla Rosales",
        birth: new Date("2016-08-11"),
        number: "102",
        gender: "F",
      },
    });

    const [member103]: any = await Member.findOrCreate({
      where: {
        name: "Ariana",
        lastname: "Romero Aguilar",
      },
      defaults: {
        name: "Ariana",
        lastname: "Romero Aguilar",
        birth: new Date("2015-01-15"),
        number: "103",
        gender: "F",
      },
    });

    const [member104]: any = await Member.findOrCreate({
      where: {
        name: "Alessia",
        lastname: "Marlene Vásquez Grady",
      },
      defaults: {
        name: "Alessia",
        lastname: "Marlene Vásquez Grady",
        birth: new Date("2019-09-10"),
        number: "104",
        gender: "F",
      },
    });

    const [member105]: any = await Member.findOrCreate({
      where: {
        name: "Jahel",
        lastname: "Eliceo Garcia Guerrero",
      },
      defaults: {
        name: "Jahel",
        lastname: "Eliceo Garcia Guerrero",
        birth: new Date("2016-01-14"),
        number: "105",
        gender: "M",
      },
    });

    const [member106]: any = await Member.findOrCreate({
      where: {
        name: "Hanna",
        lastname: "Denise Garcia Guerrero",
      },
      defaults: {
        name: "Hanna",
        lastname: "Denise Garcia Guerrero",
        birth: new Date("2018-04-05"),
        number: "106",
        gender: "F",
      },
    });

    const [member107]: any = await Member.findOrCreate({
      where: {
        name: "Arianna",
        lastname: "Zoe Martinez Marin",
      },
      defaults: {
        name: "Arianna",
        lastname: "Zoe Martinez Marin",
        birth: new Date("2016-05-22"),
        number: "107",
        gender: "F",
      },
    });

    const [member108]: any = await Member.findOrCreate({
      where: {
        name: "Ivanna",
        lastname: "Georgina Mejía Gómez",
      },
      defaults: {
        name: "Ivanna",
        lastname: "Georgina Mejía Gómez",
        birth: new Date("2017-11-12"),
        number: "108",
        gender: "F",
      },
    });

    const [member109]: any = await Member.findOrCreate({
      where: {
        name: "Adriana",
        lastname: "Sofía Acosta Coto",
      },
      defaults: {
        name: "Adriana",
        lastname: "Sofía Acosta Coto",
        birth: new Date("2012-11-01"),
        number: "109",
        gender: "F",
      },
    });

    const [member110]: any = await Member.findOrCreate({
      where: {
        name: "Mariangel",
        lastname: "Suzette Mejía",
      },
      defaults: {
        name: "Mariangel",
        lastname: "Suzette Mejía",
        birth: new Date("2017-02-27"),
        number: "110",
        gender: "F",
      },
    });

    const [member111]: any = await Member.findOrCreate({
      where: {
        name: "Ema",
        lastname: "Elisa Ramos Flored",
      },
      defaults: {
        name: "Ema",
        lastname: "Elisa Ramos Flored",
        birth: new Date("2014-09-03"),
        number: "111",
        gender: "F",
      },
    });

    const [member112]: any = await Member.findOrCreate({
      where: {
        name: "Christian",
        lastname: "Jared Hernandez Gomez",
      },
      defaults: {
        name: "Christian",
        lastname: "Jared Hernandez Gomez",
        birth: new Date("2016-09-27"),
        number: "112",
        gender: "M",
      },
    });

    const [member113]: any = await Member.findOrCreate({
      where: {
        name: "Hazel",
        lastname: "Liliana Guzmán Hernández",
      },
      defaults: {
        name: "Hazel",
        lastname: "Liliana Guzmán Hernández",
        birth: new Date("2013-07-04"),
        number: "113",
        gender: "F",
      },
    });

    const [member114]: any = await Member.findOrCreate({
      where: {
        name: "Josué",
        lastname: "Alejandro Arévalo Guido",
      },
      defaults: {
        name: "Josué",
        lastname: "Alejandro Arévalo Guido",
        birth: new Date("2013-09-23"),
        number: "114",
        gender: "M",
      },
    });

    const [member115]: any = await Member.findOrCreate({
      where: {
        name: "Walter",
        lastname: "Raul Quintanilla Grady",
      },
      defaults: {
        name: "Walter",
        lastname: "Raul Quintanilla Grady",
        birth: new Date("2015-02-10"),
        number: "115",
        gender: "M",
      },
    });

    const [member116]: any = await Member.findOrCreate({
      where: {
        name: "Zoe",
        lastname: "Fernanda Zelaya Mejicano",
      },
      defaults: {
        name: "Zoe",
        lastname: "Fernanda Zelaya Mejicano",
        birth: new Date("2018-02-28"),
        number: "116",
        gender: "F",
      },
    });

    const [member117]: any = await Member.findOrCreate({
      where: {
        name: "Mateo",
        lastname: "Enrique Zelaya Mejicano",
      },
      defaults: {
        name: "Mateo",
        lastname: "Enrique Zelaya Mejicano",
        birth: new Date("2016-10-05"),
        number: "117",
        gender: "M",
      },
    });

    const [member118]: any = await Member.findOrCreate({
      where: {
        name: "Rosa",
        lastname: "Danira Ramos Gonzalez",
      },
      defaults: {
        name: "Rosa",
        lastname: "Danira Ramos Gonzalez",
        birth: new Date("2018-10-17"),
        number: "118",
        gender: "F",
      },
    });

    const [member119]: any = await Member.findOrCreate({
      where: {
        name: "Dorian",
        lastname: "Abigail Carballo Caballero",
      },
      defaults: {
        name: "Dorian",
        lastname: "Abigail Carballo Caballero",
        birth: new Date("2014-09-01"),
        number: "119",
        gender: "F",
      },
    });

    const [member120]: any = await Member.findOrCreate({
      where: {
        name: "Emily",
        lastname: "Daniella Carballo Caballero",
      },
      defaults: {
        name: "Emily",
        lastname: "Daniella Carballo Caballero",
        birth: new Date("2016-12-05"),
        number: "120",
        gender: "F",
      },
    });

    const [member121]: any = await Member.findOrCreate({
      where: {
        name: "Fabrizzio",
        lastname: "Alessandro Cruz Morales",
      },
      defaults: {
        name: "Fabrizzio",
        lastname: "Alessandro Cruz Morales",
        birth: new Date("2019-06-28"),
        number: "121",
        gender: "M",
      },
    });

    const [member122]: any = await Member.findOrCreate({
      where: {
        name: "Sophie",
        lastname: "Gisell Sorto Rodriguez",
      },
      defaults: {
        name: "Sophie",
        lastname: "Gisell Sorto Rodriguez",
        birth: new Date("2014-11-14"),
        number: "122",
        gender: "F",
      },
    });

    const [member123]: any = await Member.findOrCreate({
      where: {
        name: "Ariana",
        lastname: "Johanny Gómez Serrano",
      },
      defaults: {
        name: "Ariana",
        lastname: "Johanny Gómez Serrano",
        birth: new Date("2017-10-30"),
        number: "123",
        gender: "F",
      },
    });

    const [member124]: any = await Member.findOrCreate({
      where: {
        name: "Valentina",
        lastname: "Sophia Gómez Serrano",
      },
      defaults: {
        name: "Valentina",
        lastname: "Sophia Gómez Serrano",
        birth: new Date("2019-04-09"),
        number: "124",
        gender: "F",
      },
    });

    const [member125]: any = await Member.findOrCreate({
      where: {
        name: "Julio",
        lastname: "Ernesto Arévalo Guido",
      },
      defaults: {
        name: "Julio",
        lastname: "Ernesto Arévalo Guido",
        birth: new Date("2011-05-04"),
        number: "125",
        gender: "M",
      },
    });

    const [member126]: any = await Member.findOrCreate({
      where: {
        name: "María",
        lastname: "José Mendoza Rodriguez",
      },
      defaults: {
        name: "María",
        lastname: "José Mendoza Rodriguez",
        birth: new Date("2016-12-08"),
        number: "126",
        gender: "F",
      },
    });

    const [member127]: any = await Member.findOrCreate({
      where: {
        name: "Mateo",
        lastname: "Alejandro Rodríguez Martínez",
      },
      defaults: {
        name: "Mateo",
        lastname: "Alejandro Rodríguez Martínez",
        birth: new Date("2019-11-11"),
        number: "127",
        gender: "M",
      },
    });

    const [member128]: any = await Member.findOrCreate({
      where: {
        name: "Isabella",
        lastname: "Alessandra De Paz Juárez",
      },
      defaults: {
        name: "Isabella",
        lastname: "Alessandra De Paz Juárez",
        birth: new Date("2017-05-09"),
        number: "128",
        gender: "F",
      },
    });

    const [member129]: any = await Member.findOrCreate({
      where: {
        name: "Mia",
        lastname: "Giuliette Sorto Requeno",
      },
      defaults: {
        name: "Mia",
        lastname: "Giuliette Sorto Requeno",
        birth: new Date("2017-05-05"),
        number: "129",
        gender: "F",
      },
    });

    const [member130]: any = await Member.findOrCreate({
      where: {
        name: "Javier",
        lastname: "Alejandro Sorto Requeno",
      },
      defaults: {
        name: "Javier",
        lastname: "Alejandro Sorto Requeno",
        birth: new Date("2019-08-05"),
        number: "130",
        gender: "M",
      },
    });

    const [member131]: any = await Member.findOrCreate({
      where: {
        name: "Camila",
        lastname: "Renee Argueta Argueta",
      },
      defaults: {
        name: "Camila",
        lastname: "Renee Argueta Argueta",
        birth: new Date("2015-12-11"),
        number: "131",
        gender: "F",
      },
    });

    const [member132]: any = await Member.findOrCreate({
      where: {
        name: "Ivana",
        lastname: "Izel Argueta",
      },
      defaults: {
        name: "Ivana",
        lastname: "Izel Argueta",
        birth: new Date("2022-02-18"),
        number: "132",
        gender: "F",
      },
    });

    const [member133]: any = await Member.findOrCreate({
      where: {
        name: "Francisco",
        lastname: "Jose Cortez Velasquez",
      },
      defaults: {
        name: "Francisco",
        lastname: "Jose Cortez Velasquez",
        birth: new Date("2014-09-07"),
        number: "133",
        gender: "M",
      },
    });

    const [member134]: any = await Member.findOrCreate({
      where: {
        name: "Anyeli",
        lastname: "Paola Aguilar González",
      },
      defaults: {
        name: "Anyeli",
        lastname: "Paola Aguilar González",
        birth: new Date("2012-09-02"),
        number: "134",
        gender: "F",
      },
    });

    const [member135]: any = await Member.findOrCreate({
      where: {
        name: "Joshua",
        lastname: "Andree Sorto Rodriguez",
      },
      defaults: {
        name: "Joshua",
        lastname: "Andree Sorto Rodriguez",
        birth: new Date("2015-10-09"),
        number: "135",
        gender: "M",
      },
    });

    const [member136]: any = await Member.findOrCreate({
      where: {
        name: "Andrea",
        lastname: "Sofía Martínez Rivera",
      },
      defaults: {
        name: "Andrea",
        lastname: "Sofía Martínez Rivera",
        birth: new Date("2016-01-09"),
        number: "136",
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
    await club1.addMember(member100);
    await club2.addMember(member101);
    await club1.addMember(member102);
    await club2.addMember(member103);
    await club1.addMember(member104);
    await club1.addMember(member105);
    await club2.addMember(member106);
    await club1.addMember(member107);
    await club2.addMember(member108);
    await club1.addMember(member109);
    await club2.addMember(member110);
    await club1.addMember(member111);
    await club2.addMember(member112);
    await club1.addMember(member113);
    await club1.addMember(member114);
    await club2.addMember(member115);
    await club1.addMember(member116);
    await club2.addMember(member117);
    await club1.addMember(member118);
    await club2.addMember(member119);
    await club1.addMember(member120);
    await club1.addMember(member121);
    await club2.addMember(member122);
    await club1.addMember(member123);
    await club2.addMember(member124);
    await club1.addMember(member125);
    await club2.addMember(member126);
    await club1.addMember(member127);
    await club1.addMember(member128);
    await club2.addMember(member129);
    await club1.addMember(member130);
    await club2.addMember(member131);
    await club1.addMember(member132);
    await club2.addMember(member133);
    await club1.addMember(member134);
    await club2.addMember(member135);
    await club1.addMember(member136);

    /*/Crear festival
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
    */
    console.log("\n\n//========== Seed creado exitosamente.\n\n");
  } catch (error) {
    console.error("\n\n//======= Error en seed:", error);
  }
}
