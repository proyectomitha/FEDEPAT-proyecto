import { Sidebar } from "../../layout/Sidebar";
import DatePicker from "react-datepicker";
import { CornerDownLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createFestival } from "../../fetchs";
import type { Festival, newFestival } from "../../types";

export function NewFestivalSingle() {
  const navigate = useNavigate();
  const [newFestival, setNewFestival] = useState<newFestival>({
    name: "",
    description: "",
    type: "oficial",
    startDate: new Date(),
    endDate: new Date(),
  });
  return (
    <>
      <ToastContainer />
      <Sidebar currentView="members" />
      <div className="ml-20 mt-0 h-full p-10 ">
        {/*Formulario para crear al deportista*/}
        <h1 className="text-left text-black p-5 rounded-t-2xl bg-amber-500">
          Nuevo festival
        </h1>
        <div className="grid grid-cols-10 gap-10 p-10 bg-gray-100 rounded-b-2xl">
          <div className="col-span-10">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Nombre de festival
            </label>
            <input
              type="text"
              value={newFestival.name}
              maxLength={30}
              onChange={(e) =>
                setNewFestival((f: any) => ({
                  ...f,
                  name: e.target.value,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
              placeholder="..."
            />
          </div>
          <div className="col-span-10">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Descripción
            </label>
            <textarea
              value={newFestival.description}
              maxLength={150}
              onChange={(e) =>
                setNewFestival((f: any) => ({
                  ...f,
                  description: e.target.value,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
              placeholder="..."
            />
          </div>
          {/* Campo de selección de tipo de festival */}
          <div className="col-span-3">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Tipo de festival
            </label>
            <select
              value={newFestival.type}
              onChange={(e) =>
                setNewFestival((f: any) => ({
                  ...f,
                  type: e.target.value.trim(),
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
            >
              <option value="oficial">Oficial</option>
              <option value="interno">Interno</option>
            </select>
          </div>

          {/* Fecha de inicio */}
          <div className="col-span-3 text-left">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Fecha de inicio
            </label>
            <DatePicker
              selected={newFestival.startDate}
              onChange={(date) =>
                setNewFestival((f: any) => ({ ...f, startDate: date }))
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Selecciona una fecha"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block cursor-pointer p-2.5"
              required
            />
          </div>
          {/* Fecha de finalización */}
          <div className="col-span-3 text-left">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Fecha de finalización
            </label>
            <DatePicker
              selected={newFestival.endDate}
              onChange={(date) =>
                setNewFestival((f: any) => ({ ...f, endDate: date }))
              }
              minDate={newFestival.startDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Selecciona una fecha"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block cursor-pointer p-2.5"
              required
            />
          </div>
          <br />
        </div>
        {/*Botones*/}
        <div className="mt-20 grid grid-cols-10 gap-4">
          <div
            title="Cancelar"
            onClick={() => navigate(`/festivals`)}
            className="col-span-3 2xl:col-span-2 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-red-600 hover:bg-red-500 cursor-pointer flex gap-5"
          >
            <p>Cancelar</p>
            <CornerDownLeft size={32} />
          </div>
          <div className="col-span-5 2xl:col-span-6"></div>
          <div
            onClick={async () => {
              const edited: newFestival = {
                ...newFestival,
                name: newFestival.name.trim(),
                description: newFestival.description.trim(),
              };
              if (edited.name.trim() === "") {
                toast.error("El nombre está vacío", {
                  theme: "colored",
                });
                return;
              }
              if (edited.startDate == null) {
                toast.error("La fecha de inicio está vacía", {
                  theme: "colored",
                });
                return;
              }
              if (edited.endDate == null) {
                toast.error("La fecha de finalización está vacía", {
                  theme: "colored",
                });
                return;
              }
              if (edited.endDate < edited.startDate) {
                toast.error(
                  "La fecha de finalización es inferior que la fecha de inicio",
                  {
                    theme: "colored",
                  }
                );
                return;
              }
              if (edited.type.trim() === "") {
                toast.error("El tipo de festival está vacío", {
                  theme: "colored",
                });
                return;
              }
              const newFestivalStatus: Festival = await createFestival(edited);
              if (!newFestivalStatus) {
                toast.error(`${newFestivalStatus}`, {
                  theme: "colored",
                });
                return;
              }
              navigate(`/festivals/${newFestivalStatus.id}/draft`);
            }}
            title="Guardar"
            className="col-span-2 justify-center rounded-2xl items-center text-3xl p-3 bg-blue-700 hover:bg-blue-500 cursor-pointer flex gap-5"
          >
            <p>Guardar</p>
            <Save size={35} />
          </div>
        </div>
      </div>
    </>
  );
}
