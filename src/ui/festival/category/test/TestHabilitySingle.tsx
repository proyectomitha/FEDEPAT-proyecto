import { ToastContainer } from "react-toastify";
import { Sidebar } from "../../../layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ElementList } from "../../../components/ElementList";
import { useEffect, useState } from "react";
import { getTestHability } from "../../../fetchs";

export function TestHabilitySingle() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fest = localStorage.getItem("id_festival");
        const category = localStorage.getItem("category");
        if (!fest || !category) return;
        const dataf = await getTestHability(fest, category);
        console.log(dataf);
        if (dataf) setData(dataf);
      } catch (error) {
        console.error("Error al obtener información del festival: ", error);
      } finally {
        setReload(false);
        setLoading(false);
      }
    }
    fetchData();
  }, [reload]);

  return (
    <>
      <ToastContainer />
      <Sidebar currentView="festivals" open_t={false} />
      <div className="ml-20 xl:ml-0 mt-0 h-full p-10 bg-cyan-950">
        <div className="flex items-center">
          <div className="col-span-1 text-left">
            <button
              className="p-2 cursor-pointer hover:bg-cyan-500 bg-cyan-600 rounded-xs"
              onClick={() =>
                navigate(
                  `/festival/category/${localStorage.getItem("category")}`
                )
              }
            >
              <ArrowLeft className="size-8" />
            </button>
          </div>
          <h1 className="col-span-3 text-center w-full">Prueba de habilidad</h1>
        </div>
        <div className="grid grid-cols-2 mt-15 gap-10">
          <div className="col-span-2">
            <h2 className="text-3xl">Puntajes</h2>
            <div className="mt-10 bg-cyan-800">
              <ElementList
                search={""}
                elements={data.members ? data.members : []}
                data={[
                  { attribute: "number", label: "ID", type: "str" },
                  { attribute: "name", label: "Nombre", type: "str" },
                  { attribute: "lastname", label: "Apellido", type: "str" },
                  {
                    attribute: "MemberTestHability.score",
                    label: "Puntos",
                    type: "str",
                  },
                  {
                    attribute: "MemberTestHability.time",
                    label: "Tiempo",
                    type: "str",
                  },
                ]}
                filter={["id"]}
                loading={loading}
              />
            </div>
            <button
              className="p-4 bg-green-700 mt-5 cursor-pointer hover:bg-green-600 rounded-md"
              onClick={() => console.log("active")}
            >
              Completar prueba
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
