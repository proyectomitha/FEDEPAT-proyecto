import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { updateTestReaction } from "../fetchs";
import { toast } from "react-toastify";

type TestDTO = {
  id: string;
  type: string; // "time" | "score"
  maxmember: number; // >= 1
  strict_mode: number; // 0 | 1
};

export function TestConfigForm({
  cant_open = true,
  init_open = true,
  test,
  reload,
}: {
  cant_open?: boolean;
  init_open?: boolean;
  test: TestDTO;
  reload: () => void;
}) {
  const [isOpen, setIsOpen] = useState(init_open);

  const [form, setForm] = useState<TestDTO>({
    id: test.id ?? "",
    type: test.type ?? "",
    maxmember: test.maxmember ?? 1,
    strict_mode: test.strict_mode ?? 0,
  });

  useEffect(() => {
    setForm({
      id: test.id ?? "",
      type: test.type ?? "",
      maxmember: test.maxmember ?? 1,
      strict_mode: test.strict_mode ?? 0,
    });
  }, [test]);

  useEffect(() => {
    if (cant_open) setIsOpen(true);
  }, [cant_open]);

  return (
    <div className="flex flex-col justify-center w-full">
      <button
        onClick={() => !cant_open && setIsOpen((o) => !o)}
        className={`mt-10 mx-auto w-full max-w-2xl px-4 py-2 bg-cyan-800 font-semibold text-white text-2xl flex justify-between rounded-t-lg transition ${
          isOpen ? "mt-0" : "rounded-b-lg"
        } ${cant_open ? "" : "hover:bg-cyan-600 cursor-pointer"}`}
      >
        Configuración del test
        <ChevronDown className={`${isOpen ? "hidden" : "size-8"}`} />
        <ChevronUp
          className={`${isOpen ? "size-8" : "hidden"} ${
            cant_open ? "hidden" : ""
          }`}
        />
      </button>

      <div
        className={`text-gray-400 mx-auto w-full max-w-2xl border-2 border-t-0 border-cyan-800 rounded-b-lg text-sm p-1 mb-5 ${
          isOpen ? "" : "hidden"
        } text-left bg-gray-100`}
      >
        <div className="p-5 space-y-6 mx-auto">
          <div className="grid sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-12 gap-6 lg:gap-5">
            {/* Tipo de test */}
            <div className="col-span-9 sm:col-span-3 md:col-span-6 lg:col-span-5 xl:col-span-4">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Tipo de test
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              >
                <option value="time">Por tiempo</option>
                <option value="score">Por puntuación</option>
              </select>
            </div>

            {/* Máximo miembros */}
            <div className="col-span-9 sm:col-span-3 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Máximo miembros
              </label>
              <input
                type="number"
                min={1}
                value={form.maxmember}
                onChange={(e) =>
                  setForm({
                    ...form,
                    maxmember: Math.max(1, Number(e.target.value)),
                  })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>

            {/* Modo estricto */}
            <div className="col-span-9 sm:col-span-3 md:col-span-6 lg:col-span-4 xl:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.strict_mode === 0}
                onChange={(e) =>
                  setForm({ ...form, strict_mode: e.target.checked ? 0 : 1 })
                }
                className="h-5 w-5 text-cyan-600 rounded"
              />
              <label className="text-sm font-medium text-gray-900">
                Modo estricto
              </label>
            </div>
          </div>

          <div className="pt-5 border-t border-gray-200 rounded-b">
            <button
              className="text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg px-5 py-2 text-center cursor-pointer"
              onClick={async () => {
                console.log(
                  form.id,
                  form.type,
                  form.maxmember,
                  form.strict_mode
                );
                const ret = await updateTestReaction(
                  form.id,
                  String(form.type),
                  Number(form.maxmember),
                  Number(form.strict_mode)
                );
                if (ret.status === "error") {
                  toast.error(ret.error, {
                    theme: "colored",
                    autoClose: 2000,
                  });
                } else {
                  toast.success("Configurado", {
                    theme: "colored",
                    autoClose: 2000,
                  });
                  reload();
                }
              }}
            >
              Configurar Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
