import { Cog } from "lucide-react";
import { useEffect, useState } from "react";
import { updateTestResistence } from "../fetchs";
import { toast } from "react-toastify";

type TestDTO = {
  id: string;
  type: string; // "time" | "score"
  maxmember: number; // >= 1
  strict_mode: number; // 0 | 1
};

export function TestConfigFormResistence({
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
  const [, setIsOpen] = useState(init_open);

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
    <div className="flex flex-col justify-center w-full ">
      <div
        onClick={() => !cant_open && setIsOpen((o) => !o)}
        className={`mt-10 mx-auto w-full max-w-3xl p-5 bg-amber-500 font-semibold text-3xl flex justify-between rounded-t-lg text-black`}
      >
        Configuración de la prueba de resistencia
      </div>

      <div
        className={`text-gray-400 mx-auto w-full max-w-3xl rounded-b-lg text-sm p-1 mb-5 text-left bg-gray-100`}
      >
        <div className="p-5 space-y-6 mx-auto">
          <div className="grid grid-cols-10 gap-5">
            {/* Tipo de test */}
            <div className="col-span-5">
              <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
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
            <div className="col-span-5 ">
              <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
                Máximo de atletas por serie
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
            <div className="col-span-6">
              <div className="flex items-center gap-5 mb-5">
                <input
                  type="checkbox"
                  checked={form.strict_mode === 0}
                  onChange={(e) =>
                    setForm({ ...form, strict_mode: e.target.checked ? 0 : 1 })
                  }
                  className="h-10 w-10 text-blue-600 rounded"
                />
                <label className="text-2xl font-medium text-gray-900 block text-left">
                  Modo estricto
                </label>
              </div>
              <p>
                El modo estricto obliga que todas las series tengan un número de
                atletas igual o inferior al seleccionado.
              </p>
            </div>
          </div>

          <div className="pt-5 border-t border-gray-200 rounded-b flex flex-row-reverse">
            <button
              className="col-span-2 justify-center rounded-2xl items-center text-3xl p-3 bg-blue-700 hover:bg-blue-500 cursor-pointer flex gap-5 text-white"
              onClick={async () => {
                console.log(
                  form.id,
                  form.type,
                  form.maxmember,
                  form.strict_mode
                );
                const ret = await updateTestResistence(
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
              <p>Configurar Test</p>
              <Cog size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
