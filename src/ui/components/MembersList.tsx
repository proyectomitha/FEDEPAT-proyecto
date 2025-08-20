import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Member } from "../types";
import { calcularEdad } from "../functions";

export function MemberList({ search }: { search: string }) {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPacientes() {
      try {
        // @ts-ignore
        const data = await window.members.getMembers();
        if (data) setMembers(data);
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

    const filtered = members.filter((item) =>
      `${item.name} ${item.lastname}`.toLowerCase().includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, members]);

  if (loading) return <p>Cargando miembros...</p>;

  return (
    <div className="mt-5">
      {members.length === 0 ? (
        <p>No hay miembros registrados.</p>
      ) : (
        <table className="w-full p-10 text-left whitespace-nowrap bg-cyan-600">
          <thead className="bg-cyan-800">
            <tr>
              <th className="p-4 pl-8">Nombre</th>
              <th className="p-4 pl-8">Apellido</th>
              <th className="p-4 pl-8 text-center">Edad</th>
              <th className="p-4 pl-8 text-center">Sexo</th>
              <th className="p-4 pl-8 text-center">ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((member) => (
              <tr
                key={member.id}
                onClick={() => navigate(`/members/${member.id}`)}
                className="hover:bg-cyan-500 cursor-pointer"
              >
                <td className="p-4 pl-8">{member.name}</td>
                <td className="p-4 pl-8">{member.lastname}</td>
                <td className="p-4 pl-8 text-center">
                  {calcularEdad(new Date(member.birth))}
                </td>
                <td className="p-4 pl-8 text-center">{member.gender}</td>
                <td className="p-4 pl-8 text-center">{member.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
