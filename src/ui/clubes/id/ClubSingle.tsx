import { useEffect, useState } from "react";
import { Sidebar } from "../../layout/Sidebar";
import type { Club, Member } from "../../types";
import { useParams } from "react-router-dom";
import { getClub } from "../../fetchs";
import { calcularEdad } from "../../functions";
import { Searcher } from "../../layout/Searcher";
import { ElementList } from "../../components/ElementList";

export function ClubSingle() {
  const { id } = useParams();
  const [searchMember, setSearchMember] = useState("");
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [dataClub, setDataClub] = useState<{ club: Club; members: Member[] }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID error");
        const data = await getClub(id);
        if (data) setDataClub(data);
      } catch (error) {
        console.error("Error al obtener información del club: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // Filtrar cuando cambia `search`
  useEffect(() => {
    const lowerSearch = searchMember.toLowerCase();
    if (!dataClub) return;

    const filtered = dataClub.members
      .filter((item) =>
        `${item.name} ${item.lastname}`.toLowerCase().includes(lowerSearch)
      )
      .map((item) => ({
        ...item,
        age: calcularEdad(item.birth),
      }));

    setFilteredData(filtered);
  }, [searchMember, dataClub?.members]);

  return (
    <>
      <Sidebar currentView="clubs" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10 bg-cyan-950">
        <h1 className="text-3xl font-semibold mb-8">{dataClub?.club.name}</h1>

        <div className="flex flex-col">
          <div className="flex mb-3 gap-2">
            <label className="text-gray-400 text-xl">Dirección:</label>
            <p className="text-xl">{dataClub?.club.direction}</p>
          </div>
          <div className="flex gap-3">
            <div className="flex mb-3 gap-2">
              <label className="text-gray-400 text-xl">Miembros:</label>
              <p className="text-xl">{dataClub?.members.length}</p>
            </div>
            <div className="flex mb-3 gap-2">
              <label className="text-gray-400 text-xl">Participaciones:</label>
              <p className="text-xl">0</p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl my-3">Miembros del club</h2>
        {/* Añadir barra de busqueda, lista y botón para agregar miembro */}
        <Searcher
          placeholder="Buscar miembro ..."
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
            { attribute: "birth", label: "Fecha de nacimiento", type: "date" },
            { attribute: "gender", label: "Sexo", type: "str" },
            { attribute: "number", label: "ID", type: "str" },
          ]}
          filter={["name", "lastname"]}
        />
        <button className="p-3 bg-blue-600 rounded-md my-5 cursor-pointer">
          Nuevo miembro
        </button>
        <h2 className="text-2xl my-3">Participaciones</h2>
        {/* Añadir barra de busqueda, lista (nombre de evento, descripción, posición, puntaje)*/}
      </div>
    </>
  );
}
