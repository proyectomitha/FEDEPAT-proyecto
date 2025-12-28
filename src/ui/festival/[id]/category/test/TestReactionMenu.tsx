import { ToastContainer } from "react-toastify";
import { Sidebar } from "../../../../layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { CornerDownLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getTestReaction } from "../../../../fetchs";
import { TestConfigFormReaction } from "../../../../components/TestConfigFormReaction";
import { ElementListSerie } from "../../../../components/ElementListSerie";

export function TestReactionMenu() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [reloadSup, setReloadSup] = useState(true);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataf = await getTestReaction(id ?? "", category ?? "");
        console.log(dataf);
        if (dataf) setData(dataf);
        setOrder(dataf.numberTests);
      } catch (error) {
        console.error("Error al obtener información de la prueba: ", error);
      } finally {
        setReloadSup(false);
        setLoading(false);
      }
    }
    fetchData();
  }, [reloadSup]);

  return (
    <>
      <ToastContainer />
      <Sidebar currentView="festivals" open_t={false} />
      <div className="ml-20 mt-0 h-full p-10">
        <div className="col-span-8 border-3 rounded-2xl  text-black text-left">
          <h1 className="text-4xl text-left font-semibold text-black p-3">
            Prueba de reacción: {category}
          </h1>
          <p className="text-black pl-3 py-5 text-2xl">
            Tipo de prueba:{" "}
            {data.type == "time" ? "Por tiempo" : "Por puntuación"}
          </p>
        </div>

        <div className={`mt-15 gap-10 ${data.init ? "hidden" : ""}`}>
          <h2 className="text-2xl">La prueba aún no se ha iniciado</h2>
          <TestConfigFormReaction
            test={{
              id: data.id,
              type: data.type,
              maxmember: data.maxmember,
              strict_mode: 1,
            }}
            reload={() => {
              setReloadSup(true); // <------- cambiado
            }}
          />
        </div>
        <div
          className={`grid grid-cols-5 mt-15 gap-10 ${
            data.init ? "" : "hidden"
          }`}
        >
          {/* Botones izquierda */}
          <div className="col-span-2">
            <ul className="grid grid-cols-1 gap-4 -mb-5">
              <li
                className={`col-span-2 justify-center rounded-2xl items-center text-2xl p-3 hover:bg-amber-400 cursor-pointer flex gap-5 ${
                  order == 1
                    ? "bg-blue-400 hover:bg-blue-500"
                    : "bg-amber-500 hover:bg-amber-400"
                } ${data.numberTests < 2 ? "" : "hidden"}`}
                onClick={() => setOrder(1)}
              >
                Fase de grupos
              </li>
              <li
                className={`col-span-2 justify-center rounded-2xl items-center text-2xl p-3 hover:bg-amber-400 cursor-pointer flex gap-5 ${
                  order === 2
                    ? "bg-blue-400 hover:bg-blue-500"
                    : "bg-amber-500 hover:bg-amber-400"
                } ${data.numberTests < 3 ? "" : "hidden"}`}
                onClick={() => setOrder(2)}
              >
                Semifinal
              </li>
              <li
                className={`col-span-2 justify-center rounded-2xl items-center text-2xl p-3  cursor-pointer flex gap-5 ${
                  order === 3
                    ? "bg-blue-400 hover:bg-blue-500"
                    : "bg-amber-500 hover:bg-amber-400"
                }`}
                onClick={() => setOrder(3)}
              >
                Final
              </li>
            </ul>
          </div>

          {/* Tabla derecha */}
          <div className="col-span-3">
            <div className="mt-0 ">
              <ElementListSerie
                type={data.type ?? "time"}
                search={String(order)}
                elements={data.serieReactions ? data.serieReactions : []}
                data={[
                  { attribute: "number", label: "Serie", type: "str" },
                  { attribute: "locked", label: "Terminado", type: "str" },
                ]}
                filter={["order"]}
                loading={loading}
                id={id ?? ""}
                category={category ?? ""}
              />
            </div>
          </div>
        </div>
        {/* Botones inferiores */}
        <div className="mt-15 grid grid-cols-10 gap-4">
          <button
            onClick={() => navigate(`/festivals/${id}/category/${category}`)}
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
