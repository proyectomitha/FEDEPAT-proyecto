import { useEffect, useState } from "react";
import { setScore } from "../fetchs";
import { hmsToSeconds, secondsToHMS } from "../functions";

export function ElementListUpdateReaction({
  search,
  elements,
  serie_id,
  filter,
  reload,
  loading = false,
  overflowy = false,
  can_update = true,
}: {
  can_update?: boolean;
  reload: () => void;
  overflowy?: boolean;
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

    const filtered = elements.filter((item) =>
      filter.some((key) => {
        const value = String(item[key] ?? "").toLowerCase();
        return value.includes(lowerSearch);
      })
    );

    setFilteredData(filtered);

    // inicializar valores locales (score + time en segundos)
    const init: Record<string, { score: number; time: number }> = {};
    filtered.forEach((m) => {
      init[m.id] = {
        score: m.MemberSerieReaction?.score ?? 0,
        time: m.MemberSerieReaction?.time ?? 0,
      };
    });
    setValues(init);
  }, [search, elements, filter]);

  if (loading) return <p className="text-xl">Cargando clubes...</p>;

  return (
    <div className={`mt-5 ${overflowy ? "max-h-96 overflow-y-auto" : ""}`}>
      {elements.length === 0 ? (
        <p className="text-xl py-10 text-cyan-800">No hay elementos.</p>
      ) : (
        <div className="">
          <table
            className={`overflow-x-auto min-w-[900px] text-left whitespace-nowrap bg-cyan-600 ${
              overflowy ? "border-collapse auto" : ""
            }`}
          >
            <thead className={`bg-cyan-800 ${overflowy ? "sticky top-0" : ""}`}>
              <tr>
                <th className="p-4 px-8">ID</th>
                <th className="p-4 px-8">Nombre</th>
                <th className="p-4 px-8">Apellido</th>
                <th className="p-4 px-8">Puntos</th>
                <th className="p-4 px-8">Tiempo (HH:MM:SS)</th>
                {can_update ? <th className="p-4 px-8"></th> : ""}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((member) => {
                const value = values[member.id] || { score: 0, time: 0 };
                const { h, m, s } = secondsToHMS(value.time);

                return (
                  <tr key={member.id} className="hover:bg-cyan-500">
                    <td className="p-4 px-8">{member.number}</td>
                    <td className="p-4 px-8">{member.name}</td>
                    <td className="p-4 px-8">{member.lastname}</td>
                    <td className="p-4 px-8">
                      <input
                        type="number"
                        className="w-20 p-1 rounded text-cyan-700 bg-white"
                        value={value.score}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            [member.id]: {
                              ...prev[member.id],
                              score: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </td>
                    <td className="p-4 px-8 flex gap-1 items-center">
                      <input
                        type="number"
                        min="0"
                        className="w-14 p-1 rounded text-cyan-700 bg-white"
                        value={h}
                        onChange={(e) => {
                          const newH = Number(e.target.value);
                          setValues((prev) => ({
                            ...prev,
                            [member.id]: {
                              ...prev[member.id],
                              time: hmsToSeconds(newH, m, s),
                            },
                          }));
                        }}
                      />
                      :
                      <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-14 p-1 rounded text-cyan-700 bg-white"
                        value={m}
                        onChange={(e) => {
                          const newM = Number(e.target.value);
                          setValues((prev) => ({
                            ...prev,
                            [member.id]: {
                              ...prev[member.id],
                              time: hmsToSeconds(h, newM, s),
                            },
                          }));
                        }}
                      />
                      :
                      <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-14 p-1 rounded text-cyan-700 bg-white"
                        value={s}
                        onChange={(e) => {
                          const newS = Number(e.target.value);
                          setValues((prev) => ({
                            ...prev,
                            [member.id]: {
                              ...prev[member.id],
                              time: hmsToSeconds(h, m, newS),
                            },
                          }));
                        }}
                      />
                    </td>
                    {can_update ? (
                      <td className="p-4 px-8 w-full text-right">
                        <button
                          className="p-2 bg-green-600 cursor-pointer hover:bg-green-500"
                          onClick={async () => {
                            console.log(member.id);
                            console.log(
                              await setScore(
                                member.id,
                                serie_id, //<-- id_Serie
                                value.score,
                                value.time
                              )
                            );
                            reload();
                          }}
                        >
                          Actualizar
                        </button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
