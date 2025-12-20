import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMember, updateMember } from "../../../fetchs";
import { CornerDownLeft, Save } from "lucide-react";
import DatePicker from "react-datepicker";
import { Sidebar } from "../../../layout/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import type { Member } from "../../../types";

export function EditMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editMember, setEditMember] = useState<Member>({
    id: "",
    name: "",
    lastname: "",
    number: "",
    gender: "M",
    birth: new Date(),
  });
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID error");
        const data = await getMember(id);
        //console.log(data[0]);
        if (data) setEditMember(data[0]);
      } catch (error) {
        console.error("Error al obtener información del club: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return (
    <>
      <ToastContainer />
      <Sidebar currentView="members" />
      <div className="ml-20 mt-0 h-full p-10 ">
        {/*Formulario para crear al deportista*/}
        <h1 className="text-left text-black p-5 rounded-t-2xl bg-amber-500">
          Editar deportista
        </h1>
        <div className="grid grid-cols-10 gap-10 p-10 bg-gray-100 rounded-b-2xl">
          <div className="col-span-5">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Nombre
            </label>
            <input
              type="text"
              value={editMember.name}
              maxLength={30}
              onChange={(e) =>
                setEditMember((f: any) => ({
                  ...f,
                  name: e.target.value,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
              placeholder="..."
            />
          </div>
          <div className="col-span-5">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Apellido
            </label>
            <input
              type="text"
              value={editMember.lastname}
              maxLength={30}
              onChange={(e) =>
                setEditMember((f: any) => ({
                  ...f,
                  lastname: e.target.value,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
              placeholder="..."
            />
          </div>
          <div className="col-span-3">
            {/* Campo de selección de sexo */}
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Sexo
            </label>
            <select
              value={editMember.gender}
              onChange={(e) =>
                setEditMember((f: any) => ({
                  ...f,
                  gender: e.target.value.trim(),
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>

          {/* Fecha de nacimiento */}
          <div className="col-span-4 text-left">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Fecha de nacimiento
            </label>
            <DatePicker
              selected={editMember.birth}
              onChange={(date) =>
                setEditMember((f: any) => ({ ...f, birth: date }))
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Selecciona una fecha"
              maxDate={new Date()} // No permitir fechas futuras
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block cursor-pointer p-2.5"
              required
            />
          </div>
          <br />
          <div className="col-span-3">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Id
            </label>
            <input
              type="text"
              value={editMember.number}
              maxLength={30}
              onChange={(e) =>
                setEditMember((f: any) => ({
                  ...f,
                  number: e.target.value.trim(),
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
              placeholder="..."
            />
          </div>
        </div>
        {/*Botones*/}
        <div className="mt-20 grid grid-cols-10 gap-4">
          <div
            title="Ir al club del deportista"
            onClick={() => navigate(`/members/${id}`)}
            className="col-span-3 2xl:col-span-2 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-red-600 hover:bg-red-500 cursor-pointer flex gap-5"
          >
            <p>Cancelar</p>
            <CornerDownLeft size={32} />
          </div>
          <div className="col-span-5 2xl:col-span-6"></div>
          <div
            onClick={async () => {
              const edited = {
                ...editMember,
                name: editMember.name.trim(),
                lastname: editMember.lastname.trim(),
              };
              if (edited.name.trim() === "") {
                toast.error("El nombre está vacío", {
                  theme: "colored",
                });
                return;
              }
              if (edited.lastname.trim() === "") {
                toast.error("El apellido está vacío", {
                  theme: "colored",
                });
                return;
              }
              if (edited.gender.trim() === "") {
                toast.error("El sexo está vacío", {
                  theme: "colored",
                });
                return;
              }
              if (edited.number.trim() === "") {
                toast.error("El Id está vacío", {
                  theme: "colored",
                });
                return;
              }
              const editMemberStatus = await updateMember(id ? id : "", edited);
              if (editMemberStatus.error) {
                toast.error(`${editMemberStatus.error}`, {
                  theme: "colored",
                });
                return;
              }
              navigate(`/members/${id}`);
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
