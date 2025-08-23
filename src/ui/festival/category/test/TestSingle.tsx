import { ToastContainer } from "react-toastify";
import { Sidebar } from "../../../layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ElementList } from "../../../components/ElementList";
import { useEffect, useState } from "react";
import { getGlobalScoreCategory } from "../../../fetchs";

export function TestSingle() {
  const navigate = useNavigate();
  const { test } = useParams();
  const [data, setData] = useState<any>();
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);

  //scores
  const [scoresClub, setScoresClub] = useState("hability");
  const [showScore, setShowScore] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fest = localStorage.getItem("id_festival");
        const category = localStorage.getItem("category");
        if (!fest || !category) return;
        const dataf = await getGlobalScoreCategory(fest, category);
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

  useEffect(() => {
    if (scoresClub === "hability") {
      data ? setShowScore(data.habilityScore[0].members) : setShowScore([]);
    }
    if (scoresClub === "reaction") {
      data.reactionScore[0]
        ? setShowScore(data.reactionScore[0].members)
        : setShowScore([]);
    }
    if (scoresClub === "resistance") {
      data.resistanceScore[0]
        ? setShowScore(data.resistanceScore[0].members)
        : setShowScore([]);
    }
  }, [scoresClub, data]);

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
          <h1 className="col-span-3 text-center w-full">
            Prueba de{" "}
            {test === "reaction"
              ? "reacción"
              : test === "resistance"
              ? "resistencia"
              : "habilidad"}
          </h1>
        </div>
        <div className="grid grid-cols-2 mt-15 gap-10">
          {/* Zona donde podemos ver el puntaje total de los clubes ordenados */}
          <div className="col-span-1">
            <h2 className="text-3xl mb-5">Prueba</h2>

            <h2 className="text-3xl mb-5">Serie</h2>
            <ElementList
              search={""}
              elements={data ? data.clubesScore : []}
              data={[
                { attribute: "club", label: "Nombre", type: "str" },
                {
                  attribute: "habilityScore",
                  label: "Prueba de Habilidad",
                  type: "str",
                },
              ]}
              loading={loading}
              filter={["name"]}
            />
          </div>
          {/* Zona con los primeros lugares de cada prueba (se cambia al seleccionar la prueba) debajo hay un botón para ir a la prueba */}
          {/* Zona con los botones de las pruebas */}
          <div className="col-span-1">
            <h2 className="text-3xl">Puntajes</h2>
            <div className="mt-10 bg-cyan-800">
              <ElementList
                search={""}
                elements={showScore}
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
              className="p-4 bg-cyan-700 mt-5 cursor-pointer hover:bg-cyan-600"
              onClick={() => console.log("active")}
            >
              Ir a la prueba
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
