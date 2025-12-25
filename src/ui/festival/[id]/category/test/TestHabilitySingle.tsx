import { toast, ToastContainer } from "react-toastify";
import { Sidebar } from "../../../../layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { CornerDownLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { endTestHability, getTestHability } from "../../../../fetchs";
import { ElementListUpdate } from "../../../../components/ElementListUpdate";
import { Searcher } from "../../../../layout/Searcher";

export function TestHabilitySingle() {
  const { id, category } = useParams();
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
      <div className="ml-20 mt-0 h-full p-10">
        <h1 className="col-span-8 border-3 rounded-2xl text-4xl text-left font-semibold text-black p-3">
          Prueba de habilidad: {category}
        </h1>
        <div className="col-span-2">
          <div className="mt-10">
            <Searcher onChangeSearch={undefined} />
            <ElementListUpdate
              search={""}
              reload={() => setReload(true)}
              elements={data.members ? data.members : []}
              serie_id={data.id}
              overflowy={true}
              filter={["id"]}
              loading={loading}
              can_update={!data.locked}
            />
          </div>
        </div>
        {/* Botones inferiores */}
        <div className="mt-5 grid grid-cols-10 gap-4">
          <button
            onClick={() => navigate(`/festivals/${id}/category/${category}`)}
            title="Ir a todos los festivales"
            className="col-span-1 2xl:col-span-1 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-black hover:bg-amber-500 cursor-pointer flex gap-5"
          >
            <CornerDownLeft size={32} />
          </button>
          <div className="col-span-5"></div>
          <button
            className="col-span-2 justify-center rounded-2xl items-center text-2xl p-3 bg-blue-500 hover:bg-blue-400 cursor-pointer flex gap-5"
            onClick={async () => {
              const ret = await endTestHability(data.id);
              ret
                ? setReload(true)
                : toast.error("Error al configurar test", {
                    theme: "colored",
                    autoClose: 2000,
                  });
            }}
          >
            Guardar
            <Save size={36} />
          </button>
          <button
            className="col-span-2 justify-center rounded-2xl items-center text-2xl p-3 bg-green-500 hover:bg-green-400 cursor-pointer flex gap-5"
            onClick={async () => {
              const ret = await endTestHability(data.id);
              ret
                ? setReload(true)
                : toast.error("Error al configurar test", {
                    theme: "colored",
                    autoClose: 2000,
                  });
            }}
          >
            Terminar
          </button>
        </div>
      </div>
    </>
  );
}
