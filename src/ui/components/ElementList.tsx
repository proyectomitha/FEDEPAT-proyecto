import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ColumnDef = {
  attribute: string; // clave de objeto (puede ser anidada, ej. "user.name")
  label: string; // título de la columna
  type: "str" | "date" | "str-date";
};

type ElementListProps = {
  path_id?: string;
  overflowy?: boolean;
  search: string;
  elements: any[];
  data: ColumnDef[];
  filter: string[]; // claves donde se busca
  path?: string;
  loading?: boolean;
};

export function ElementList({
  search,
  elements,
  data,
  path_id = "id",
  filter,
  path = "members/",
  loading = false,
}: ElementListProps) {
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Función para acceder a valores anidados por path (ej. "user.name")
  function getNestedValue(obj: any, path: string) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }

  // Filtrado
  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = elements.filter((item) =>
      filter.some((key) => {
        const value = String(getNestedValue(item, key) ?? "").toLowerCase();
        return value.includes(lowerSearch);
      })
    );

    setFilteredData(filtered);
  }, [search, elements, filter]);

  if (loading) return <p className="text-xl">Cargando clubes...</p>;

  return (
    <div
      className={`mt-5 rounded-l-2xl max-h-[calc(100vh-20rem)] min-h-[calc(20rem)] overflow-y-auto custom-scrollbar`}
    >
      {elements.length === 0 ? (
        <p className="text-xl py-10 text-cyan-800">No hay elementos.</p>
      ) : (
        <table
          className={`w-full table-fixed p-10 text-left whitespace-nowrap text-black bg-gray-100`}
        >
          <thead
            className={`bg-[#ffb200] sticky top-0 text-lg font-light cursor-default`}
          >
            <tr>
              {data.map((col, index) => (
                <th
                  key={col.attribute}
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
            {filteredData.map((item) => (
              <tr
                key={item[path_id] ?? item.id}
                onClick={() => {
                  const route = `/${path}${path_id ? item[path_id] : item.id}`;
                  navigate(route);
                }}
                className="hover:bg-white border-b-3 border-white cursor-pointer"
              >
                {data.map((col) => {
                  const value = getNestedValue(item, col.attribute);
                  let displayValue = "";

                  if (col.type === "date" && value) {
                    displayValue = new Date(value).toLocaleDateString();
                  } else if (col.type === "str-date" && value) {
                    displayValue = new Date(value).toLocaleDateString();
                  } else {
                    displayValue = String(value ?? "NA");
                  }

                  return (
                    <td key={col.attribute} className="p-4 truncate">
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
