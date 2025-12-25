import { ToastContainer } from "react-toastify";
import { Sidebar } from "../../../../layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CornerDownLeft } from "lucide-react";
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

export function TestReactionMenu() {
  const { id, category } = useParams();
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

  //Esto va en el single
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
      <div className="ml-20 mt-0 h-full p-10">
        <h1 className="col-span-8 border-3 rounded-2xl text-4xl text-left font-semibold text-black p-3">
          Prueba de reacción: {category}
        </h1>

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
          {/* Botones izquierda */}
          <div className="col-span-2">
            <ul className="grid grid-cols-1 gap-4 -mb-5">
              <li
                className={`col-span-2 justify-center rounded-2xl items-center text-2xl p-3 hover:bg-amber-400 cursor-pointer flex gap-5 ${
                  order == 1 ? "bg-amber-400" : "bg-amber-500"
                } ${data.numberTests < 2 ? "" : "hidden"}`}
                onClick={() => setOrder(1)}
              >
                Fase de grupos
              </li>
              <li
                className={`col-span-2 justify-center rounded-2xl items-center text-2xl p-3 hover:bg-amber-400 cursor-pointer flex gap-5 ${
                  order === 2 ? "bg-amber-400" : "bg-amber-500"
                } ${data.numberTests < 3 ? "" : "hidden"}`}
                onClick={() => setOrder(2)}
              >
                Semifinal
              </li>
              <li
                className={`col-span-2 justify-center rounded-2xl items-center text-2xl p-3 hover:bg-amber-400 cursor-pointer flex gap-5 ${
                  order === 3 ? "bg-amber-400" : "bg-amber-500"
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
                reload={() => setReload(true)}
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
                setId={function (id: string): void {
                  setIdSerie(id);
                }}
              />
            </div>
            {/*<h2 className="text-3xl">Puntajes</h2>
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
            </button>*/}
          </div>
        </div>
        {/* Botones inferior */}
        {/* Botones inferiores */}
        <h1 className="text-zinc-950"></h1>
        <div className="mt-5 grid grid-cols-10 gap-4">
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
