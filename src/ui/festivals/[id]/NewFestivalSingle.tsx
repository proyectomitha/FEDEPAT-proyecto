import { useEffect, useState } from "react";
import { Searcher } from "../../layout/Searcher";
import { Sidebar } from "../../layout/Sidebar";
import type { Festival, Member } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteFestival,
  getFestival,
  getMembers,
  startFestival,
} from "../../fetchs";
import { calcularEdad } from "../../functions";
import { ElementListMembersFestival } from "../../components/ElementListMembersFestival";
import { ElementListAddMembersFestival } from "../../components/ElementListAddMembersFestival";
import { ToastContainer, toast } from "react-toastify";
import { UpdateFestivalForm } from "../../components/UpdateFestivalForm";

export function NewFestivalSingle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reload, setReload] = useState(true);
  const [searchNewMember, setSearchNewMember] = useState("");
  const [searchMember, setSearchMember] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [filteredDataN, setFilteredDataN] = useState<Member[]>([]);
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
        console.log("members execute");
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
        console.log("festival execute");
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
        `${item.name} ${item.lastname}`.toLowerCase().includes(lowerSearch)
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
        `${item.name} ${item.lastname}`.toLowerCase().includes(lowerSearch)
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
      <Sidebar currentView="festivals" open_t={false} />
      <div className="ml-20 mt-0 h-full p-10 bg-cyan-950">
        <div className="flex flex-col justify-center max-w-2xl mx-auto">
          <h1 className="mb-5">Borrador</h1>
          <p className="mb-10 text-left">
            {dataFestival?.festival.description}
          </p>
        </div>

        {/* Editar festival */}
        <UpdateFestivalForm />

        {/* Mostrar deportistas inscritos */}
        <div className="grid grid-cols-2 gap-5 justify-center flex-col lg:flex-row">
          <div className="col-span-2 xl:col-span-1">
            <h2 className="text-xl my-5">Participantes inscritos</h2>
            <Searcher
              onChangeSearch={setSearchMember}
              placeholder="Buscar participante ..."
            />
            <ElementListMembersFestival
              id_festival={id ? id : ""}
              reload={() => setReload(true)}
              search={searchMember}
              elements={filteredData}
              loading={loading}
              data={[
                { attribute: "name", label: "Nombre", type: "str" },
                { attribute: "lastname", label: "Apellido", type: "str" },
                { attribute: "age", label: "Edad", type: "str" },
                { attribute: "gender", label: "Sexo", type: "str" },
                { attribute: "number", label: "ID", type: "str" },
              ]}
              filter={["name", "lastname"]}
            />
          </div>
          <div className="col-span-2 xl:col-span-1">
            <h2 className="text-xl my-5">Añadir participantes</h2>
            <Searcher
              onChangeSearch={setSearchNewMember}
              placeholder="Buscar nuevo participante ..."
            />
            <ElementListAddMembersFestival
              id_festival={id ? id : ""}
              reload={() => setReload(true)}
              search={searchNewMember}
              elements={filteredDataN}
              loading={loading}
              data={[
                { attribute: "name", label: "Nombre", type: "str" },
                { attribute: "lastname", label: "Apellido", type: "str" },
                { attribute: "age", label: "Edad", type: "str" },
                { attribute: "gender", label: "Sexo", type: "str" },
                { attribute: "number", label: "ID", type: "str" },
              ]}
              filter={["name", "lastname"]}
            />
          </div>
        </div>

        {/* Botones de iniciar o eliminar */}
        <div className="flex justify-center gap-5">
          <button
            className="bg-blue-700 hover:bg-blue-600 px-4 py-3 mt-10 w-[200px] rounded-md cursor-pointer"
            onClick={async () => {
              const del = await startFestival(id ? id : "");
              del ? navigate(`/festivals/${id}`) : "";
            }}
          >
            Iniciar festival
          </button>
          <button
            className="bg-red-700 hover:bg-red-600 px-4 py-3 mt-10 w-[200px] rounded-md cursor-pointer"
            onClick={async () => {
              const del = await deleteFestival(id ? id : "");
              if (del) {
                navigate("/festivals");
                toast.error("Error al eliminar festival", {
                  theme: "colored",
                });
              } else
                toast.error("Error al eliminar festival", {
                  theme: "colored",
                });
            }}
          >
            Eliminar festival
          </button>
        </div>
      </div>
    </>
  );
}
