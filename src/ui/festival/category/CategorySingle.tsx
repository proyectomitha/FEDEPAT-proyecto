import { ToastContainer } from "react-toastify";
import { Sidebar } from "../../layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ElementList } from "../../components/ElementList";
import { useEffect, useState } from "react";
import { getGlobalScoreCategory } from "../../fetchs";

export function CategorySingle() {
  const navigate = useNavigate();
  const { category } = useParams();
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
        if (!category || !fest) throw new Error("ID error");
        window.localStorage.setItem("category", category);
        const dataf = await getGlobalScoreCategory(fest, category);
        if (dataf) {
          setData(dataf);
        }
      } catch (error) {
        console.error("Error al obtener información del festival: ", error);
      } finally {
        setReload(false);
        setLoading(false);
      }
    }
    fetchData();
  }, [category, reload]);

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
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-1 text-left">
            <button
              className="p-2 cursor-pointer hover:bg-cyan-500 bg-cyan-600 rounded-xs"
              onClick={() =>
                navigate(`/festival/${localStorage.getItem("id_festival")}`)
              }
            >
              <ArrowLeft className="size-8" />
            </button>
          </div>
          <h1 className="col-span-3 text-left">Categoría {category}</h1>
        </div>
        <div className="grid grid-cols-2 mt-15 gap-10">
          {/* Zona donde podemos ver el puntaje total de los clubes ordenados */}
          <div className="col-span-2">
            <h2 className="text-3xl">Ranking de clubes</h2>
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
                {
                  attribute: "reactionScore",
                  label: "Prueba de Reacción",
                  type: "str",
                },
                {
                  attribute: "resistanceScore",
                  label: "Prueba de Resistencia",
                  type: "str",
                },
                { attribute: "totalScore", label: "Total", type: "str" },
              ]}
              loading={loading}
              filter={["name"]}
            />
          </div>
          {/* Zona con los primeros lugares de cada prueba (se cambia al seleccionar la prueba) debajo hay un botón para ir a la prueba */}
          {/* Zona con los botones de las pruebas */}
          <div className="col-span-2">
            <h2 className="text-3xl">Ranking de prueba</h2>
            <div className="mt-10 bg-cyan-800">
              <ul className="flex bg-cyan-700 -mb-5">
                <li
                  className={`p-4 text-xl hover:bg-cyan-600 cursor-pointer ${
                    scoresClub === "hability" ? "bg-cyan-600" : ""
                  }`}
                  onClick={() => setScoresClub("hability")}
                >
                  Prueba de habilidad
                </li>
                <li
                  className={`p-4 text-xl hover:bg-cyan-600 cursor-pointer ${
                    scoresClub === "reaction" ? "bg-cyan-600" : ""
                  }`}
                  onClick={() => setScoresClub("reaction")}
                >
                  Prueba de reacción
                </li>
                <li
                  className={`p-4 text-xl hover:bg-cyan-600 cursor-pointer ${
                    scoresClub === "resistance" ? "bg-cyan-600" : ""
                  }`}
                  onClick={() => setScoresClub("resistance")}
                >
                  Prueba de resistencia
                </li>
              </ul>
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
              className="p-4 bg-cyan-700 mt-5 cursor-pointer hover:bg-cyan-600 rounded-md"
              onClick={() => navigate(`/festival/category/test/${scoresClub}`)}
            >
              Ir a la prueba
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
