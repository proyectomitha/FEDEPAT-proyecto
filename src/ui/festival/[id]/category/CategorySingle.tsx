import { ToastContainer, toast } from "react-toastify";
import { Sidebar } from "../../../layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { CornerDownLeft } from "lucide-react";
import { ElementList } from "../../../components/ElementList";
import { useEffect, useState } from "react";
import { getGlobalScoreCategory } from "../../../fetchs";
export function CategorySingle() {
  const navigate = useNavigate();
  const { id, category } = useParams();
  const [data, setData] = useState<any>();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataf = await getGlobalScoreCategory(
          id ? id : "",
          category ? category : ""
        );
        if (dataf) {
          console.log(dataf);
          setData(dataf);
        }
      } catch (error) {
        console.error("Error al obtener información del festival: ", error);
      } finally {
        setReload(false);
      }
    }
    fetchData();
  }, [category, reload]);

  return (
    <>
      <ToastContainer />
      <Sidebar currentView="festivals" open_t={false} />
      <div className="ml-20 mt-0 h-full p-10">
        <div className="grid grid-cols-4 items-center">
          <h1 className="col-span-8 border-3 rounded-2xl text-4xl text-left font-semibold text-black p-3">
            Categoría {category}
          </h1>
        </div>
        {/* Botones de pruebas */}
        <div className="mt-15 grid grid-cols-6 gap-12">
          <button
            onClick={() =>
              navigate(`/festivals/${id}/category/${category}/test/hability`)
            }
            title="Ir a todos los festivales"
            className="col-span-2 justify-center rounded-2xl items-center text-2xl p-3 bg-amber-500 hover:bg-amber-400 cursor-pointer flex gap-5"
          >
            Prueba de habilidad
          </button>
          <button
            onClick={() => {
              if (data?.habilityScore[0].locked) {
                navigate(`/festivals/${id}/category/${category}/test/reaction`);
              } else {
                toast.error("Aún no se ha realizado la prueba de habilidad", {
                  theme: "colored",
                });
              }
            }}
            title="Ir a todos los festivales"
            className={`col-span-2 justify-center rounded-2xl items-center text-2xl p-3 ${
              data?.habilityScore[0].locked
                ? "bg-amber-500 hover:bg-amber-400 cursor-pointer"
                : "bg-gray-500"
            }  flex gap-5`}
          >
            Prueba de reacción
          </button>
          <button
            onClick={() => {
              if (data?.habilityScore[0].locked) {
                navigate(
                  `/festivals/${id}/category/${category}/test/resistence`
                );
              } else {
                toast.error("Aún no se ha realizado la prueba de habilidad", {
                  theme: "colored",
                });
              }
            }}
            title="Ir a todos los festivales"
            className={`col-span-2 justify-center rounded-2xl items-center text-2xl p-3 ${
              data?.habilityScore[0].locked
                ? "bg-amber-500 hover:bg-amber-400 cursor-pointer"
                : "bg-gray-500"
            }  flex gap-5`}
          >
            Prueba de resistencia
          </button>
        </div>

        {/* Zona donde podemos ver el puntaje total de los clubes ordenados */}
        <div className="col-span-2">
          <h2 className="text-2xl my-10 text-black font-bold">Participantes</h2>

          <ElementList
            search={""}
            elements={data ? data.habilityScore[0].members : []}
            data={[
              { attribute: "name", label: "Nombre", type: "str" },
              { attribute: "lastname", label: "Apellido", type: "str" },
              { attribute: "number", label: "ID", type: "str" },
            ]}
            filter={["name", "lastname", "number"]}
            overflowy={true}
          />
        </div>

        {/* Botones inferiores */}
        <div className="mt-5 grid grid-cols-10 gap-4">
          <button
            onClick={() => navigate(`/festivals/${id}`)}
            title="Ir a todos los festivales"
            className="col-span-1 2xl:col-span-1 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-black hover:bg-amber-500 cursor-pointer flex gap-5"
          >
            <CornerDownLeft size={32} />
          </button>
          <div className="col-span-6 2xl:col-span-6"></div>
        </div>
      </div>
    </>
  );
}
