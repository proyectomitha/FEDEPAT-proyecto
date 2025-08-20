import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { removeMemberToFestival } from "../fetchs";

export function ElementListMembersFestival({
  search,
  elements,
  data,
  filter,
  loading = false,
  id_festival,
  reload,
}: {
  reload: () => void;
  search: string;
  id_festival: string;
  elements: any[];
  data: { attribute: keyof any; label: string; type: string }[];
  filter: (keyof any)[];
  path?: string;
  loading?: boolean;
}) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = elements.filter((item) =>
      filter.some((key) => {
        const value = String(item[key] ?? "").toLowerCase();
        return value.includes(lowerSearch);
      })
    );

    setFilteredData(filtered);
  }, [search, elements, filter]);

  if (loading) return <p>Cargando clubes...</p>;

  return (
    <div className="mt-5">
      {elements.length === 0 ? (
        <p>No hay elementos.</p>
      ) : (
        <table className="w-full p-10 text-left whitespace-nowrap bg-cyan-600">
          <thead className="bg-cyan-800">
            <tr>
              {data.map((col) => (
                <th key={col.label} className="p-4 pl-8">
                  {col.label}
                </th>
              ))}
              <th className="p-4 pl-8"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((member) => (
              <tr key={member.id} className="hover:bg-cyan-500">
                {data.map((col) => {
                  const value = member[col.attribute as keyof typeof member];

                  let displayValue = "";
                  if (col.type === "date") {
                    displayValue = value.toLocaleDateString();
                  } else if (col.type === "str-date") {
                    displayValue = new Date(value).toLocaleDateString();
                  } else {
                    displayValue = String(value);
                  }

                  return (
                    <td key={col.attribute as string} className="p-4 pl-8">
                      {displayValue}
                    </td>
                  );
                })}
                <td className="p-2 px-4">
                  <button
                    className="p-1 rounded-sm bg-purple-700 hover:bg-purple-600 cursor-pointer"
                    onClick={async () => {
                      await removeMemberToFestival(id_festival, [member.id]);
                      reload();
                    }}
                  >
                    <X />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
