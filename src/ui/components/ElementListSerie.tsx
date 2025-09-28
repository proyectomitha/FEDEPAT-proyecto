import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

export function ElementListSerie({
  setId,
  reload,
  id,
  search,
  elements,
  data,
  filter,
  loading = false,
  overflowy = false,
}: {
  id: string;
  setId: (id: string) => void;
  overflowy?: boolean;
  search: string;
  elements: any[];
  data: { attribute: keyof any; label: string; type: string }[];
  filter: (keyof any)[];
  loading?: boolean;
  reload: () => void;
}) {
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
        <p className="text-xl py-10 text-cyan-800">No hay elementos.</p>
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
                  setId(club.id);
                  reload();
                }}
                className={`hover:bg-cyan-500 cursor-pointer ${
                  id === club.id ? "bg-cyan-500" : ""
                }`}
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
