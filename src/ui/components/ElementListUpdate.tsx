import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ElementListUpdate({
  search,
  elements,
  data,
  path_id = "id",
  filter,
  path = "members/",
  loading = false,
  overflowy = false,
}: {
  path_id?: string;
  overflowy?: boolean;
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

  function getNestedValue(obj: any, path: string) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }

  if (loading) return <p className="text-xl">Cargando clubes...</p>;

  return (
    <div
      className={`mt-5 ${
        overflowy ? "max-h-96 overflow-y-auto  scroll-stable" : ""
      }`}
    >
      {elements.length === 0 ? (
        <p className="text-xl py-10">No hay elementos.</p>
      ) : (
        <table
          className={`w-full p-10 text-left whitespace-nowrap bg-cyan-600 ${
            overflowy ? " table-fixed border-collapse" : ""
          }`}
        >
          <thead className={`bg-cyan-800 ${overflowy ? "sticky top-0" : ""}`}>
            <tr>
              {data.map((col) => (
                <th key={col.label} className="p-4 px-8">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((club) => (
              <tr
                key={club.id}
                onClick={() => {
                  const route = `/${path}${
                    //Invento
                    path_id ? club[path_id as keyof typeof club] : club.id
                  }`;
                  navigate(route);
                }}
                className="hover:bg-cyan-500 cursor-pointer"
              >
                {data.map((col) => {
                  const value = getNestedValue(club, col.attribute as string);
                  let displayValue = "";
                  if (col.type === "date" && value) {
                    displayValue = new Date(value).toLocaleDateString();
                  } else if (col.type === "str-date" && value) {
                    displayValue = new Date(value).toLocaleDateString();
                  } else {
                    displayValue = String(value ?? "NA");
                  }

                  return (
                    <td key={col.attribute as string} className="p-4 px-8">
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
