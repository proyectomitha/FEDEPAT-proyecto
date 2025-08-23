import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { updateFestival } from "../fetchs";
import { toast } from "react-toastify";

type FestivalDTO = {
  id: string;
  name: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
};

function toDate(v: Date | string): Date {
  return v instanceof Date ? v : new Date(v);
}

// Convierte string "YYYY-MM-DD" a Date sin desfase
function fromInputDate(s: string): Date {
  const [year, month, day] = s.split("-").map(Number);
  return new Date(year, month - 1, day); // mes empieza en 0
}

// Convierte una Date a string 'YYYY-MM-DD' sin desfase de zona horaria
function toInputDate(d: Date | string | undefined): string {
  if (!d) return ""; // por si es undefined
  const dateObj = typeof d === "string" ? new Date(d) : d;
  const local = new Date(
    dateObj.getTime() - dateObj.getTimezoneOffset() * 60000
  );
  return local.toISOString().slice(0, 10);
}

export function UpdateFestivalForm({
  cant_open = false,
  init_open = false,
  festival,
  reload,
}: {
  cant_open?: boolean;
  init_open?: boolean;
  festival: FestivalDTO;
  reload: () => void;
}) {
  const [isOpen, setIsOpen] = useState(init_open);

  // ÚNICO estado del formulario
  const [form, setForm] = useState(() => ({
    id: festival.id ?? "",
    name: festival.name ?? "",
    description: festival.description ?? "",
    startDate: toDate(festival.startDate ?? new Date()),
    endDate: toDate(festival.endDate ?? new Date()),
  }));

  // Re-sincroniza cuando cambien las props
  useEffect(() => {
    setForm({
      id: festival.id ?? "",
      name: festival.name ?? "",
      description: festival.description ?? "",
      startDate: toDate(festival.startDate ?? new Date()),
      endDate: toDate(festival.endDate ?? new Date()),
    });
  }, [festival]);

  // Si no se puede cerrar, mantenlo abierto
  useEffect(() => {
    if (cant_open) setIsOpen(true);
  }, [cant_open]);

  return (
    <>
      <button
        onClick={() => !cant_open && setIsOpen((o) => !o)}
        className={`w-full px-4 py-2 bg-cyan-800 font-semibold text-white text-2xl flex justify-between rounded-t-lg transition ${
          isOpen ? "mt-0" : "rounded-b-lg"
        } ${cant_open ? "" : "hover:bg-cyan-600 cursor-pointer"}`}
      >
        Información general
        <ChevronDown className={`${isOpen ? "hidden" : "size-8"}`} />
        <ChevronUp
          className={`${isOpen ? "size-8" : "hidden"} ${
            cant_open ? "hidden" : ""
          }`}
        />
      </button>

      <div
        className={`text-gray-400 w-full border-2 border-t-0 border-cyan-800 hover:text-gray-900 rounded-b-lg text-sm p-1 ml-auto items-center mb-5 ${
          isOpen ? "" : "hidden"
        } text-left bg-gray-100`}
      >
        <div className="p-5 space-y-6 mx-auto ">
          <div className="grid sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-12 gap-6 lg:gap-5">
            <div className="col-span-9 sm:col-span-3 md:col-span-6 lg:col-span-5 xl:col-span-4">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Nombre de festival
              </label>
              <input
                type="text"
                value={form.name}
                maxLength={30}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="..."
              />
            </div>

            <div className="col-span-3 xl:col-span-2">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Fecha de inicio
              </label>
              <input
                type="date"
                value={toInputDate(form.startDate)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    startDate: fromInputDate(e.target.value),
                  }))
                }
                className="bg-gray-50 sm:text-sm rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 text-gray-500"
              />
            </div>

            <div className="col-span-3 xl:col-span-2">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Fecha de finalización
              </label>
              <input
                type="date"
                value={toInputDate(form.endDate)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    endDate: fromInputDate(e.target.value),
                  }))
                }
                className="bg-gray-50 sm:text-sm rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 text-gray-500"
              />
            </div>

            <div className="col-span-9 md:col-span-12">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Descripción
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                placeholder="..."
              />
            </div>
          </div>

          <div className="pt-5 border-t border-gray-200 rounded-b">
            <button
              className="text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg px-5 py-2 text-center cursor-pointer"
              onClick={async () => {
                const ret = await updateFestival(
                  form.id,
                  form.name,
                  form.description,
                  form.startDate,
                  form.endDate
                );
                ret
                  ? reload()
                  : toast.error("Error al actualizar festival", {
                      theme: "colored",
                      autoClose: 2000,
                    });
              }}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
