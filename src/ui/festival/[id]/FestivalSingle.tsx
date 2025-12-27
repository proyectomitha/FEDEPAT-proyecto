import { useEffect, useState } from "react";
import { Searcher } from "../../layout/Searcher";
import { Sidebar } from "../../layout/Sidebar";
import type { Festival, Member } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFestival, getCategories, getFestival } from "../../fetchs";
import { calcularEdad } from "../../functions";
import { ToastContainer, toast } from "react-toastify";
import { ElementList } from "../../components/ElementList";
import { CornerDownLeft, Eye, Pencil, Printer, Trash } from "lucide-react";
import { WarningDelete } from "../../components/WarningDelete";

export function FestivalSingle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [warning, setWarning] = useState<boolean>(false);
  const [reload, setReload] = useState(true);
  const [searchMember] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [, setFilteredData] = useState<Member[]>([]);
  const [dataFestival, setDataFestival] = useState<{
    festival: Festival;
    members: Member[];
  }>();
  const [categories, setCategories] = useState<String[]>([]);
  const [, setLoading] = useState(true);
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
      <Sidebar currentView="festivals" open_t={false} />
      <div className="ml-20 mt-0 h-full p-10">
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

        {/* Mostrar deportistas inscritos y pruebas*/}
        <div
          className={`mt-5 grid grid-cols-3 gap-5 justify-center flex-col lg:flex-row`}
        >
          {/* Botones izquierda */}
          <div>
            <div
              title="Ver participantes"
              onClick={() => {
                navigate(`/festivals/${id}/members`);
              }}
              className="col-span-3 2xl:col-span-3 justify-center rounded-2xl items-center text-3xl p-3 bg-amber-500 hover:bg-amber-400 cursor-pointer flex gap-5"
            >
              <p className="text-lg lg:text-2xl">Participantes</p>
              <Eye size={35} />
            </div>
            <div
              title="Ver ranking"
              onClick={() => {
                navigate(`/festivals/${id}`);
              }}
              className="col-span-3 2xl:col-span-3 justify-center rounded-2xl items-center text-3xl p-3 bg-amber-500 hover:bg-amber-400 cursor-pointer flex gap-5 mt-5"
            >
              <p className="text-lg lg:text-2xl">Ver ranking</p>
              <Eye size={35} />
            </div>
          </div>
          {/* Categorias */}
          <div className={`col-span-2 xl:col-span-2 rounded-lg`}>
            <div>
              <div className="px-4">
                <Searcher
                  onChangeSearch={setSearchCategory}
                  placeholder="Buscar categoría ..."
                />
              </div>
              <ElementList
                overflowy={true}
                search={searchCategory}
                path={`festivals/${id}/category/`}
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
        <div className="mt-5 grid grid-cols-10 gap-4">
          <button
            onClick={() => navigate(`/festivals`)}
            title="Ir a todos los festivales"
            className="col-span-1 2xl:col-span-1 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-black hover:bg-amber-500 cursor-pointer flex gap-5"
          >
            <CornerDownLeft size={32} />
          </button>
          <div className="col-span-6 2xl:col-span-6"></div>

          <button
            title="Imprimir informe"
            onClick={() => {
              toast.error("Error: la función aún no está implementada", {
                theme: "colored",
              });
            }}
            className="col-span-3 2xl:col-span-3 justify-center rounded-2xl items-center text-3xl p-3 bg-amber-500 hover:bg-amber-400 cursor-pointer flex gap-5"
          >
            <p className="text-lg lg:text-2xl">Imprimir informe </p>
            <Printer size={35} />
          </button>
        </div>
      </div>
    </>
  );
}
