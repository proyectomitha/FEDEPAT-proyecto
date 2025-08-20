import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Club } from "../types";

export function ClubesList({ search }: { search: string }) {
  const navigate = useNavigate();
  const [clubes, setClubes] = useState<Club[]>([]);
  const [filteredData, setFilteredData] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPacientes() {
      try {
        // @ts-ignore
        const data = await window.clubs.getClubs();
        if (data) setClubes(data);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPacientes();
  }, []);

  // Filtrar cuando cambia `search`
  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = clubes.filter((item) =>
      item.name.toLowerCase().includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, clubes]);

  if (loading) return <p>Cargando clubes...</p>;

  return (
    <div className="mt-5">
      {clubes.length === 0 ? (
        <p>No hay clubes registrados.</p>
      ) : (
        <table className="w-full p-10 text-left whitespace-nowrap bg-cyan-600">
          <thead className="bg-cyan-800">
            <tr>
              <th className="p-4 pl-8">Nombre</th>
              <th className="p-4 pl-8">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((club) => (
              <tr
                key={club.id}
                onClick={() => navigate(`/clubes/${club.id}`)}
                className="hover:bg-cyan-500 cursor-pointer"
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
