import { useEffect, useState } from "react";
import { Searcher } from "../layout/Searcher";
import { Sidebar } from "../layout/Sidebar";
import type { Festival, Member } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteFestival,
  getCategories,
  getFestival,
  startFestival,
} from "../fetchs";
import { calcularEdad } from "../functions";
import { ToastContainer, toast } from "react-toastify";
import { UpdateFestivalForm } from "../components/UpdateFestivalForm";
import { ElementList } from "../components/ElementList";

export function FestivalSingle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [reload, setReload] = useState(true);
  const [searchMember, setSearchMember] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [dataFestival, setDataFestival] = useState<{
    festival: Festival;
    members: Member[];
  }>();
  const [categories, setCategories] = useState<String[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID error");
        const data = await getFestival(id);
        if (data) setDataFestival(data);
        window.localStorage.setItem("id_festival", data.festival.id);
        const catego = await getCategories(data.festival.id);
        if (catego) setCategories(catego);
      } catch (error) {
        console.error("Error al obtener información del festival: ", error);
      } finally {
        setReload(false);
        setLoading(false);
      }
    }
    fetchData();
  }, [id, reload]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!dataFestival?.festival.id) return;
        const catego = await getCategories(dataFestival?.festival.id);
        if (catego) setCategories(catego);
      } catch (error) {
        console.error("Error al obtener información del festival: ", error);
      } finally {
        setLoadingCategories(false);
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
      <ToastContainer />
      <Sidebar currentView="festivals" open_t={false} />
      <div className="ml-20 mt-0 h-full p-10">
        <h1 className="mb-10 text-cyan-800 font-bold">
          {dataFestival?.festival.name}
        </h1>

        {/* Editar festival */}
        <UpdateFestivalForm
          festival={
            dataFestival
              ? dataFestival.festival
              : {
                  id: "",
                  name: "",
                  description: "",
                  startDate: new Date(),
                  endDate: new Date(),
                }
          }
          reload={() => {
            setReload(true);
            toast.success("Festival actualizado exitosamente", {
              theme: "colored",
              autoClose: 2000,
            });
          }}
        />

        {/* Mostrar deportistas inscritos y pruebas*/}
        <div
          className={`mt-5 grid grid-cols-1 gap-5 justify-center flex-col lg:flex-row`}
        >
          <div className={`col-span-2 xl:col-span-1 bg-cyan-900 rounded-lg`}>
            <h2 className="text-2xl my-3 text-left ml-4">Participantes</h2>

            <div className="px-4">
              <Searcher
                onChangeSearch={setSearchMember}
                placeholder="Buscar participante ..."
              />
            </div>
            <ElementList
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
          <div className={`col-span-2 xl:col-span-1 bg-cyan-900 rounded-lg`}>
            <div>
              <h2 className="text-2xl my-3 text-left ml-4">Categorias</h2>
              <div className="px-4">
                <Searcher
                  onChangeSearch={setSearchCategory}
                  placeholder="Buscar categoría ..."
                />
              </div>
              <ElementList
                overflowy={true}
                search={searchCategory}
                path="festival/category/"
                elements={categories}
                path_id="category"
                data={[
                  { attribute: "category", label: "Categoría", type: "str" },
                ]}
                filter={["category"]}
                loading={loadingCategories}
              />
            </div>
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
            Crear informe
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 shadow-2xs px-4 py-3 mt-10 w-[200px] rounded-md cursor-pointer"
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
