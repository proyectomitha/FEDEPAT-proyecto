import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

export function ElementListSerieResistance({
  search,
  elements,
  id,
  category,
  data,
  filter,
  loading = false,
  type,
}: {
  type: string;
  id: string;
  category: string;
  overflowy?: boolean;
  search: string;
  elements: any[];
  data: { attribute: keyof any; label: string; type: string }[];
  filter: (keyof any)[];
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
    <div className="rounded-l-2xl max-h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar">
      {elements.length === 0 ? (
        <p className="text-xl py-10 text-cyan-800">No hay elementos.</p>
      ) : (
        <table className="w-full table-fixed p-10 text-left whitespace-nowrap text-black bg-gray-100">
          <thead className="bg-[#ffb200] sticky top-0 text-lg font-light cursor-default">
            <tr>
              {data.map((col, index) => (
                <th
                  key={col.label}
                  className={`p-4 ${
                    index % 2 === 0 ? "bg-[#ffb200]" : "bg-[#ffc43c]"
                  }`}
                >
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
                  navigate(
                    `/festivals/${id}/category/${category}/test/resistence/${club.id}/${type}`
                  );
                }}
                className={`hover:bg-white border-b-3 border-white cursor-pointer`}
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
