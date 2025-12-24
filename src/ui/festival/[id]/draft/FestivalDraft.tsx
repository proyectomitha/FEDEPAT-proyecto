import { useEffect, useState } from "react";
import { Searcher } from "../../../layout/Searcher";
import { ToastContainer, toast } from "react-toastify";
import { Sidebar } from "../../../layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { CornerDownLeft, Pencil, Play, Trash } from "lucide-react";
import { calcularEdad } from "../../../functions";
import {
  addMemberToFestival,
  deleteFestival,
  getFestival,
  getMembers,
  removeMemberToFestival,
  startFestival,
} from "../../../fetchs";
import type { Festival, Member } from "../../../types";
import { WarningDelete } from "../../../components/WarningDelete";
import { ElementList } from "../../../components/ElementList";
import { PopUpFestivalAddMember } from "../../../components/PopUpFestivalAddMember";

export function FestivalDraft() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [warning, setWarning] = useState<boolean>(false);
  const [popUpMembers, setPopUpMembers] = useState<boolean>(false);
  const [reload, setReload] = useState(true);
  const [searchNewMember] = useState("");
  const [searchMember, setSearchMember] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [, setFilteredDataN] = useState<Member[]>([]);
  const [dataFestival, setDataFestival] = useState<{
    festival: Festival;
    members: Member[];
  }>();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const members = await getMembers();
        if (members) setMembers(members);
      } catch (error) {
        console.error("Error al obtener otros miembros: ", error);
      } finally {
        setReload(false);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID error");
        const data = await getFestival(id);
        if (data) setDataFestival(data);
        console.log(data?.festival);
      } catch (error) {
        console.error("Error al obtener información del festival: ", error);
      } finally {
        setReload(false);
        setLoading(false);
      }
    }
    fetchData();
  }, [id, reload]);

  // Filtrar cuando cambia `search`
  useEffect(() => {
    const lowerSearch = searchMember.toLowerCase();
    if (!dataFestival) return;

    const filtered = dataFestival.members
      .filter((item) =>
        `${item.name} ${item.lastname} ${item.number ?? ""}`
          .toLowerCase()
          .includes(lowerSearch)
      )
      .map((item) => ({
        ...item,
        age: calcularEdad(item.birth),
      }));

    setFilteredData(filtered);
  }, [searchMember, dataFestival?.members, reload]);

  useEffect(() => {
    const lowerSearch = searchNewMember.toLowerCase();
    if (!dataFestival) return;

    const festivalMemberIds = dataFestival.members.map((m) => m.id);

    const filtered = members
      .filter((item) => !festivalMemberIds.includes(item.id)) // 👈 solo los que NO están en el festival
      .filter((item) =>
        `${item.name} ${item.lastname} ${item.number ?? ""}`
          .toLowerCase()
          .includes(lowerSearch)
      )
      .map((item) => ({
        ...item,
        age: calcularEdad(item.birth),
      }));

    setFilteredDataN(filtered);
  }, [searchNewMember, members, dataFestival?.members, reload]);
  return (
    <>
      <ToastContainer />
      <Sidebar currentView="festivals" />
      <WarningDelete
        txt={
          "Se borrarán los cambios hechos hasta el momento ¿Está seguro que quiere eliminar este festival?"
        }
        isOpen={warning}
        fn_end={async () => {
          if (id == undefined) {
            setWarning(false);
            toast.error("Error en la eliminación del festival", {
              theme: "colored",
            });
            setWarning(false);
            return;
          }
          const result: any = await deleteFestival(id);
          if (result == 0) {
            toast.error("Error en la eliminación del festival", {
              theme: "colored",
            });
            setWarning(false);
          } else {
            navigate(`/festivals`);
          }
        }}
        onCancel={function (): void {
          setWarning(false);
        }}
      ></WarningDelete>
      <PopUpFestivalAddMember
        id={id ? id : ""}
        isOpen={popUpMembers}
        onCancel={() => setPopUpMembers(false)}
        members={members}
        suscriptor={dataFestival?.members ? dataFestival.members : []}
        update={() => setReload(!reload)}
        addSuscriptors={function (id: string, membersL: string[]): void {
          addMemberToFestival(id, membersL);
        }}
        removeSuscriptors={function (id: string, membersL: string[]): void {
          removeMemberToFestival(id, membersL);
        }}
      ></PopUpFestivalAddMember>
      <div className="ml-20 mt-0 h-full p-10 ">
        {/* Información */}
        <div>
          <div className=" grid grid-cols-10 gap-4 mb-5">
            <h1 className="col-span-8 border-3 rounded-2xl text-4xl text-left font-semibold text-black p-3">
              {dataFestival?.festival.name}
            </h1>

            <div className="col-span-2 2xl:col-span-2 flex m-auto gap-5">
              <div
                onClick={() => setWarning(true)}
                title="Eliminar club"
                className="justify-center rounded-2xl items-center text-2xl 2xl:text-3xl bg-red-700 hover:bg-red-600 p-5 w-full h-full cursor-pointer flex gap-5 max-w-20"
              >
                <Trash size={32} />
              </div>
              <div
                title="Editar festival"
                onClick={() => navigate(`/festivals/${id}/edit-festival`)}
                className="justify-center rounded-2xl items-center text-2xl 2xl:text-3xl bg-blue-500 hover:bg-blue-400 p-5 w-full h-full cursor-pointer flex gap-5 max-w-20"
              >
                <Pencil size={32} />
              </div>
            </div>
          </div>

          <div className="flex flex-col border-3 rounded-2xl text-lg font-semibold text-black p-5 mb-5">
            <div className="flex mb-3 gap-2">
              <label className=" font-bold ">Descripción:</label>
              <p className="text-left">{dataFestival?.festival.description}</p>
            </div>

            <div className="flex mb-3 gap-2">
              <label className=" font-bold ">Fecha de inicio:</label>
              <p className="">
                {dataFestival?.festival.startDate.toDateString()}
              </p>
            </div>
            <div className="flex mb-3 gap-2">
              <label className=" font-bold ">Fecha de finalización:</label>
              <p className="">
                {dataFestival?.festival.endDate.toDateString()}
              </p>
            </div>
            <div className="flex gap-10">
              <div className="flex gap-2">
                <label className="font-bold ">Tipo de festival:</label>
                <p className="">
                  {dataFestival?.festival.type[0].toUpperCase()}
                  {dataFestival?.festival.type.substring(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Selección de participantes */}
        <Searcher
          placeholder="Buscar atleta ..."
          onChangeSearch={setSearchMember}
        />
        <ElementList
          search={searchMember}
          elements={filteredData}
          loading={loading}
          data={[
            { attribute: "name", label: "Nombre", type: "str" },
            { attribute: "lastname", label: "Apellido", type: "str" },
            { attribute: "age", label: "Edad", type: "str" },
            //{ attribute: "birth", label: "Fecha de nacimiento", type: "date" },
            { attribute: "gender", label: "Sexo", type: "str" },
            { attribute: "number", label: "ID", type: "str" },
          ]}
          filter={["name", "lastname", "number"]}
        />
        <button
          title="Iniciar festival"
          onClick={() => setPopUpMembers(true)}
          className="col-span-3 2xl:col-span-3 justify-center rounded-2xl items-center text-3xl p-3 bg-amber-500 hover:bg-amber-400 cursor-pointer flex gap-5 mt-5"
        >
          <p className="text-lg lg:text-2xl">Añadir participantes</p>
        </button>

        {/* Botones de guardado y play */}
        <div className="mt-5 grid grid-cols-10 gap-4">
          <div
            onClick={() => navigate(`/festivals`)}
            title="Ir a todos los festivales"
            className="col-span-1 2xl:col-span-1 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-black hover:bg-amber-500 cursor-pointer flex gap-5"
          >
            <CornerDownLeft size={32} />
          </div>
          <div className="col-span-6 2xl:col-span-6"></div>

          <div
            title="Iniciar festival"
            onClick={() => {
              startFestival(id ? id : "");
              /*
              if (!result) {
                toast.error("Error al iniciar el festival", {
                  theme: "colored",
                });
              }*/
              navigate(`/festivals/${id}`);
            }}
            className="col-span-3 2xl:col-span-3 justify-center rounded-2xl items-center text-3xl p-3 bg-green-500 hover:bg-green-400 cursor-pointer flex gap-5"
          >
            <p className="text-lg lg:text-2xl">Iniciar festival</p>
            <Play size={35} />
          </div>
        </div>
      </div>
    </>
  );
}
