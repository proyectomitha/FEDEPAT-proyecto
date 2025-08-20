import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ElementList({
  search,
  elements,
  data,
  filter,
  path = "members",
  loading = false,
}: {
  search: string;
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
            </tr>
          </thead>
          <tbody>
            {filteredData.map((club) => (
              <tr
                key={club.id}
                onClick={() => navigate(`/${path}/${club.id}`)}
                className="hover:bg-cyan-500 cursor-pointer"
              >
                {data.map((col) => {
                  const value = club[col.attribute as keyof typeof club];

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
