import { ToastContainer } from "react-toastify";
import { Sidebar } from "../../../../layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import {
  auxiliar,
  endSerieReaction,
  getSerieReaction,
  getTestReaction,
} from "../../../../fetchs";
import { TestConfigForm } from "../../../../components/TestConfigForm";
import { ElementListSerie } from "../../../../components/ElementListSerie";
import { ElementListUpdateReaction } from "../../../../components/ElementListUpdateReaction";

export function TestReactionSingle() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [dataSerie, setDataSerie] = useState<any>([]);
  const [reloadSup, setReloadSup] = useState(true);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(1);
  const [idSerie, setIdSerie] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const fest = localStorage.getItem("id_festival");
        const category = localStorage.getItem("category");
        if (!fest || !category) return;
        const dataf = await getTestReaction(fest, category);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const dataf = await getSerieReaction(idSerie);
        //console.log(dataf);
        if (dataf) setDataSerie(dataf[0].members);
      } catch (error) {
        console.error("Error al obtener información de la prueba: ", error);
      } finally {
        setReload(false);
        setLoading(false);
      }
    }
    fetchData();
  }, [idSerie, reload]);
  return (
    <>
      <ToastContainer />
      <Sidebar currentView="festivals" open_t={false} />
      <div className="ml-20 xl:ml-0 mt-0 h-full p-10 ">
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
          <h1 className="col-span-3 text-center w-full">Prueba de reacción</h1>
        </div>

        <div className={`mt-15 gap-10 ${data.init ? "hidden" : ""}`}>
          <h2 className="text-2xl">La prueba aún no se ha iniciado</h2>
          <TestConfigForm
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
          <div className="col-span-2">
            <h2 className="text-3xl mb-5">Prueba</h2>
            <ul className="flex bg-cyan-700 -mb-5">
              <li
                className={`p-4 text-xl hover:bg-cyan-600 cursor-pointer ${
                  order == 1 ? "bg-cyan-600" : ""
                } ${data.numberTests < 2 ? "" : "hidden"}`}
                onClick={() => setOrder(1)}
              >
                Fase de grupos
              </li>
              <li
                className={`p-4 text-xl hover:bg-cyan-600 cursor-pointer ${
                  order === 2 ? "bg-cyan-600" : ""
                } ${data.numberTests < 3 ? "" : "hidden"}`}
                onClick={() => setOrder(2)}
              >
                Semifinal
              </li>
              <li
                className={`p-4 text-xl hover:bg-cyan-600 cursor-pointer ${
                  order === 3 ? "bg-cyan-600" : ""
                }`}
                onClick={() => setOrder(3)}
              >
                Final
              </li>
            </ul>
            <div className="mt-0 bg-cyan-800">
              <ElementListSerie
                reload={() => setReload(true)}
                search={String(order)}
                elements={data.serieReactions ? data.serieReactions : []}
                data={[
                  { attribute: "number", label: "Serie", type: "str" },
                  { attribute: "locked", label: "Terminado", type: "str" },
                ]}
                filter={["order"]}
                loading={loading}
                id={idSerie}
                setId={function (id: string): void {
                  setIdSerie(id);
                }}
              />
            </div>
          </div>
          <div className="col-span-3">
            <h2 className="text-3xl">Puntajes</h2>
            <div className="mt-5 bg-cyan-800">
              <ElementListUpdateReaction
                search={""}
                overflowy={true}
                elements={dataSerie ? dataSerie : []}
                filter={["id"]}
                loading={loading}
                reload={() => setReload(true)}
                serie_id={idSerie}
              />
            </div>
            <button
              className="ml-5 p-4 bg-green-700 mt-5 cursor-pointer hover:bg-green-600 rounded-md"
              onClick={async () => {
                console.log(await endSerieReaction(idSerie));
              }}
            >
              Completar serie
            </button>
            <button
              className="ml-5 p-4 bg-blue-700 mt-5 cursor-pointer hover:bg-blue-600 rounded-md"
              onClick={async () => {
                console.log(await auxiliar(idSerie));
              }}
            >
              Auxiliar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
