/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ElementList({
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
  filter: string[];
  path?: string;
  loading?: boolean;
}) {
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    /*const filtered = elements.filter((item) =>
      filter.some((key) => {
        const value = String(
          getNestedValue(item, key as string) ?? ""
        ).toLowerCase();

        //const value = String(item[key] ?? "").toLowerCase();
        return value.includes(lowerSearch);
      })
    );

    const filtered = elements.filter((item) =>
      filter.some((key) => {
        const value = String(getNestedValue(item, key) ?? "").toLowerCase();
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
                <th key={col.label} className="p-4">
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
                    <td key={col.attribute as string} className="p-4 truncate">
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
}*/

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
  overflowy = false,
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
      className={`mt-5 ${
        overflowy ? "max-h-96 overflow-y-auto scroll-stable" : ""
      }`}
    >
      {elements.length === 0 ? (
        <p className="text-xl py-10 text-cyan-800">No hay elementos.</p>
      ) : (
        <table
          className={`w-full p-10 text-left whitespace-nowrap bg-cyan-600 ${
            overflowy ? "table-fixed border-collapse" : ""
          }`}
        >
          <thead className={`bg-cyan-800 ${overflowy ? "sticky top-0" : ""}`}>
            <tr>
              {data.map((col) => (
                <th key={col.attribute} className="p-4">
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
                className="hover:bg-cyan-500 cursor-pointer"
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
