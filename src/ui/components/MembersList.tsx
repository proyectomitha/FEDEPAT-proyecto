import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Member } from "../types";

export function MemberList({
  search,
  getMembersFunction,
}: {
  search: string;
  getMembersFunction?: () => Promise<Member[]>;
}) {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (getMembersFunction) {
          const data = await getMembersFunction();
          //console.log(data);
          setMembers(data);
        }
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

    const filtered = members.filter((item) =>
      `${item.name} ${item.lastname} ${
        //@ts-ignore
        item.club?.name ?? "Eliminado"
      } ${item.number}`
        .toLowerCase()
        .includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, members]);

  if (loading) return <p>Cargando miembros...</p>;

  return (
    <div className="mt-5 rounded-l-2xl max-h-[calc(100vh-17rem)] min-h-[calc(15rem)] overflow-y-auto custom-scrollbar">
      {members.length === 0 ? (
        <p className="text-black">No hay miembros registrados.</p>
      ) : (
        <table className="w-full table-fixed p-10 text-left whitespace-nowrap text-black bg-gray-100">
          <thead className="bg-[#ffb200] sticky top-0 text-lg font-light cursor-default">
            <tr>
              <th className="p-4 pl-8">Nombre</th>
              <th className="p-4 pl-8 bg-[#ffc43c]">Apellido</th>
              <th className="p-4 pl-8 text-center">Género</th>
              <th className="p-4 pl-8 bg-[#ffc43c] text-center">Club</th>
              <th className="p-4 pl-8 text-center">ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((member) => (
              <tr
                key={member.id}
                onClick={() => navigate(`/members/${member.id}`)}
                className={`hover:bg-white border-b-3 border-white cursor-pointer ${
                  //@ts-ignore
                  member.club ? "" : "hidden"
                }`}
              >
                <td className="p-4 pl-8">{member.name}</td>
                <td className="p-4 pl-8">{member.lastname}</td>
                <td className="p-4 pl-8 text-center">{member.gender}</td>
                <td className="p-4 pl-8 text-center">
                  {
                    //@ts-ignore
                    member.club?.name ?? "Eliminado"
                  }
                </td>
                <td className="p-4 pl-8 text-center">{member.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
