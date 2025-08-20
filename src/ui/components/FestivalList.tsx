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
      item.name.toLowerCase().includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, festivals]);

  if (loading) return <p>Cargando festivales...</p>;

  return (
    <div className="mt-5">
      {festivals.length === 0 ? (
        <p>No hay festivales registrados.</p>
      ) : (
        <table className="w-full p-10 text-left whitespace-nowrap bg-cyan-600">
          <thead className="bg-cyan-800">
            <tr>
              <th className="p-4 pl-8">Nombre</th>
              <th className="p-4 pl-8">Descripción</th>
              <th className="p-4 pl-8">Fecha de inicio</th>
              <th className="p-4 pl-8">Fecha de fin</th>
              <th className="p-4 pl-8">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((festival) => (
              <tr
                key={festival.id}
                onClick={() => navigate(`/festivals/${festival.id}`)}
                className="hover:bg-cyan-500 cursor-pointer"
              >
                <td className="p-4 pl-8">{festival.name}</td>
                <td className="p-4 pl-8">{festival.description}</td>
                <td className="p-4 pl-8">
                  {new Date(festival.startDate).toLocaleDateString()}
                </td>
                <td className="p-4 pl-8">
                  {new Date(festival.endDate).toLocaleDateString()}
                </td>
                <td className="p-4 pl-8">
                  {festival.locked ? "Finalizado" : "En curso"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
