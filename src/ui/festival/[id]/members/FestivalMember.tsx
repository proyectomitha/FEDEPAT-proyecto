import { useEffect, useState } from "react";
import { Searcher } from "../../../layout/Searcher";
import { Sidebar } from "../../../layout/Sidebar";
import type { Festival, Member } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import { getFestival } from "../../../fetchs";
import { calcularEdad } from "../../../functions";
import { CornerDownLeft } from "lucide-react";
import { ElementListMembers } from "../../../components/ElementListMembers";

export function FestivalMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reload, setReload] = useState(true);
  const [searchMember, setSearchMember] = useState("");
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [dataFestival, setDataFestival] = useState<{
    festival: Festival;
    members: Member[];
  }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID error");
        const data = await getFestival(id);
        if (data) setDataFestival(data);
        window.localStorage.setItem("id_festival", data.festival.id);
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

  return (
    <>
      <Sidebar currentView="festivals" open_t={false} />
      <div className="ml-20 mt-0 h-full p-10">
        {/* Mostrar deportistas inscritos y pruebas*/}
        <div
          className={`mt-5 grid grid-cols-3 gap-5 justify-center flex-col lg:flex-row`}
        >
          <div className={`col-span-3 xl:col-span-3  rounded-lg`}>
            <div className="px-4">
              <Searcher
                onChangeSearch={setSearchMember}
                placeholder="Buscar participante ..."
              />
            </div>
            <ElementListMembers
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
              filter={["name", "lastname", "number"]}
              overflowy={true}
            />
          </div>
        </div>

        {/* Botones de iniciar o eliminar */}
        <div className="mt-5 grid grid-cols-10 gap-4">
          <button
            onClick={() => navigate(`/festivals/${id}`)}
            title="Ir a todos los festivales"
            className="col-span-1 2xl:col-span-1 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-black hover:bg-amber-500 cursor-pointer flex gap-5"
          >
            <CornerDownLeft size={32} />
          </button>
        </div>
      </div>
    </>
  );
}
