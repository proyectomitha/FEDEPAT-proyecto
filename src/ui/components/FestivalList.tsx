import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Festival } from "../types";
import { getFestivals } from "../fetchs";

export function FestivalList({ search }: { search: string }) {
  const navigate = useNavigate();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [filteredData, setFilteredData] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFestivals();
        if (data) setFestivals(data);
        //console.log(data);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filtrar cuando cambia `search`
  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = festivals.filter((item) =>
      `${item.name} ${new Date(item.startDate).toLocaleDateString()}`
        .toLowerCase()
        .includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, festivals]);

  if (loading) return <p>Cargando festivales...</p>;

  return (
    <div className="mt-5 rounded-l-2xl max-h-[calc(100vh-17rem)] min-h-[calc(15rem)] overflow-y-auto custom-scrollbar">
      {festivals.length === 0 ? (
        <p className="text-gray-400">No hay festivales registrados.</p>
      ) : (
        <table className="w-full table-fixed p-10 text-left whitespace-nowrap text-black bg-gray-100">
          <thead className="bg-[#ffb200] sticky top-0 text-lg font-light cursor-default">
            <tr>
              <th className="p-4 pl-8">Nombre</th>
              <th className="p-4 py-2 bg-[#ffc43c]">Tipo de festival</th>
              <th className="p-4 py-2 text-center">Fecha de inicio</th>
              <th className="p-4 pl-2 text-center bg-[#ffc43c]">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((festival) => (
              <tr
                key={festival.id}
                onClick={() => {
                  festival.locked
                    ? navigate(`/festivals/${festival.id}`)
                    : navigate(`/festivals/${festival.id}/draft`);
                }}
                className="hover:bg-white border-b-3 border-white cursor-pointer"
              >
                <td className="p-4 pl-8 max-w-[200px] truncate">
                  {festival.name}
                </td>
                <td className="p-4 max-w-[150px] truncate">{festival.type}</td>
                <td className="p-4 py-2 text-center max-w-[50px] truncate">
                  {new Date(festival.startDate).toLocaleDateString()}
                </td>
                <td className="p-4 pl-2 text-center">
                  {festival.locked
                    ? festival.active
                      ? "En curso"
                      : "Finalizado"
                    : "Borrador"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
