import { useEffect, useState } from "react";
import { setScore } from "../fetchs";
import { calcularEdad } from "../functions";
import { MemberRow } from "./MemberRow";

export function ListUpdateReaction({
  search,
  elements,
  serie_id,
  filter,
  loading = false,
  can_update = true,
  type,
}: {
  type: string;
  can_update?: boolean;
  search: string;
  elements: any[];
  serie_id: string;
  filter: (keyof any)[];
  loading?: boolean;
}) {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [values, setValues] = useState<
    Record<string, { score: number; time: number }>
  >({});

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    if (!elements) return;
    const filtered = elements
      .map((item: any) => ({
        ...item,
        age: calcularEdad(item.birth),
      }))
      .filter((item: any) =>
        `${item.name} ${item.lastname} ${item.number} ${item.age}`
          .toLowerCase()
          .includes(lowerSearch)
      )
      .sort((a: any, b: any) => {
        if (type == "time") {
          const aSub = a.MemberSerieReaction.score;
          const bSub = b.MemberSerieReaction.score;
          return bSub - aSub; //de puntuación
        } else {
          const aSub = a.MemberSerieReaction.time;
          const bSub = b.MemberSerieReaction.time;
          return aSub - bSub; //de tiempo
        }
      })
      .sort((a: any, b: any) => {
        if (type == "time") {
          const aSub = a.MemberSerieReaction.time;
          const bSub = b.MemberSerieReaction.time;
          return aSub - bSub; //de tiempo
        } else {
          const aSub = a.MemberSerieReaction.score;
          const bSub = b.MemberSerieReaction.score;
          return bSub - aSub; //
        }
      });

    setFilteredData(filtered);

    // inicializar valores locales (score + time en segundos)
    const init: Record<string, { score: number; time: number }> = {};
    filtered.forEach((m: any) => {
      init[m.id] = {
        score: m.MemberSerieReaction?.score ?? 0,
        time: m.MemberSerieReaction?.time ?? 0,
      };
    });
    setValues(init);
  }, [search, elements, filter]);

  const updateOnBlur = async (id: string, score: number, time: number) => {
    if (can_update) {
      return await setScore(id, serie_id, score, time);
    }
  };

  if (loading) return <p className="text-xl">Cargando clubes...</p>;

  return (
    <div
      className={`mt-5 rounded-l-2xl max-h-[calc(100vh-25rem)] min-h-[calc(15rem)] overflow-y-auto custom-scrollbar`}
    >
      {elements.length === 0 ? (
        <p className="text-xl py-10 text-cyan-800">No hay elementos.</p>
      ) : (
        <div className="">
          <table className="w-full table-fixed p-10 text-left whitespace-nowrap text-black bg-gray-100">
            <thead
              className={`bg-[#ffb200] sticky top-0 text-lg font-light cursor-default`}
            >
              <tr>
                <th className="p-4 bg-[#ffb200]">ID</th>
                <th className="p-4 bg-[#ffc43c]">Nombre</th>
                <th className="p-4 bg-[#ffb200]">Apellido</th>
                <th className="p-4 bg-[#ffc43c]">Puntos</th>
                <th className="p-4 bg-[#ffb200]">HH:MM:SS.ms</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((member: any) => {
                const value = values[member.id] || { score: 0, time: 0 };

                return (
                  <MemberRow
                    key={member.id}
                    member={member}
                    value={value}
                    setValues={setValues}
                    updateOnBlur={updateOnBlur}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
