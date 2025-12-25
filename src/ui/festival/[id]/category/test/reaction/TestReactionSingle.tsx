import { toast, ToastContainer } from "react-toastify";
import { Sidebar } from "../../../../../layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { CornerDownLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import {
  endSerieReaction,
  endTestHability,
  getSerieReaction,
  getTestHability,
} from "../../../../../fetchs";
import { ElementListUpdate } from "../../../../../components/ElementListUpdate";
import { Searcher } from "../../../../../layout/Searcher";
import { ElementListUpdateReaction } from "../../../../../components/ElementListUpdateReaction";
import { ListUpdateReaction } from "../../../../../components/ListUpdateReaction";

export function TestReactionSingle() {
  const { id, category, idSerie } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataf = await getSerieReaction(idSerie ?? "");
        /*const dataf = await getTestHability(
          id ? id : "",
          category ? category : ""
        );*/
        //console.log("dataf cargado");
        if (dataf[0]) setData(dataf[0]);
        console.log(dataf[0]);
      } catch (error) {
        console.error("Error al obtener información del festival: ", error);
      } finally {
        toast.success("Guardado correctamente", {
          theme: "colored",
          autoClose: 2000,
        });
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
      <div className="ml-20 mt-0 h-full p-10">
        <h1 className="col-span-8 border-3 rounded-2xl text-4xl text-left font-semibold text-black p-3">
          Prueba de reacción: {category}
        </h1>
        <div className="col-span-2">
          <div className="mt-10">
            <Searcher onChangeSearch={undefined} />
            <ListUpdateReaction
              search={""}
              elements={data.members ? data.members : []}
              serie_id={idSerie ?? ""}
              filter={["id"]}
              loading={loading}
              can_update={!data.locked}
            />
          </div>
        </div>
        {/* Botones inferiores */}
        <h1 className="text-zinc-950"></h1>
        <div className="mt-5 grid grid-cols-10 gap-4">
          <button
            onClick={() =>
              navigate(`/festivals/${id}/category/${category}/test/reaction`)
            }
            title="Ir a todos los festivales"
            className="col-span-1 2xl:col-span-1 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-black hover:bg-amber-500 cursor-pointer flex gap-5"
          >
            <CornerDownLeft size={32} />
          </button>
          <div className="col-span-5"></div>
          {data.locked ? (
            <>{data.locked}</>
          ) : (
            <>
              <button
                className="col-span-2 justify-center rounded-2xl items-center text-2xl p-3 bg-blue-500 hover:bg-blue-400 cursor-pointer flex gap-5"
                onClick={async () => {
                  location.reload();
                }}
              >
                Guardar
                <Save size={36} />
              </button>
              <button
                className="col-span-2 justify-center rounded-2xl items-center text-2xl p-3 bg-green-500 hover:bg-green-400 cursor-pointer flex gap-5"
                onClick={async () => {
                  const ret = await endSerieReaction(idSerie ?? "");
                  ret.status != "error"
                    ? setReload(true)
                    : toast.error(`Error al configurar test: ${ret.error}`, {
                        theme: "colored",
                        autoClose: 2000,
                      });
                }}
              >
                Terminar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
