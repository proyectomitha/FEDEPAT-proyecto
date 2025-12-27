import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Club } from "../types";
import { getClubs } from "../fetchs";

export function ClubesList({ search }: { search: string }) {
  const navigate = useNavigate();
  const [clubes, setClubes] = useState<Club[]>([]);
  const [filteredData, setFilteredData] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClubs();
        if (data) setClubes(data);
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

    const filtered = clubes.filter((item) =>
      `${item.name} ${item.direction}`.toLowerCase().includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, clubes]);

  if (loading) return <p>Cargando clubes...</p>;

  return (
    <div className="mt-5 rounded-l-2xl max-h-[calc(100vh-27rem)] min-h-[calc(15rem)] overflow-y-auto custom-scrollbar">
      {clubes.length === 0 ? (
        <p className="text-black">No hay clubes registrados.</p>
      ) : (
        <table className="w-full table-fixed p-10 text-left whitespace-nowrap text-black bg-gray-100">
          <thead className="bg-[#ffb200] sticky top-0 text-lg font-light cursor-default">
            <tr>
              <th className="p-4 pl-8">Nombre</th>
              <th className="p-4 pl-8 bg-[#ffc43c]">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((club) => (
              <tr
                key={club.id}
                onClick={() => navigate(`/clubs/${club.id}`)}
                className="hover:bg-white border-b-3 border-white cursor-pointer"
              >
                <td className="p-4 pl-8">{club.name}</td>
                <td className="p-4 pl-8">{club.direction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
