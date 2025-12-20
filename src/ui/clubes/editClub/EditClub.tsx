import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../layout/Sidebar";
import { CornerDownLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getClub, updateClub } from "../../fetchs";
import { ToastContainer, toast } from "react-toastify";
import type { Club } from "../../types";

export function EditClub() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editClub, setEditClub] = useState<Club>({
    id: "",
    name: "",
    direction: "",
  });
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID error");
        const data = await getClub(id);
        console.log(data);
        if (data) setEditClub(data.club);
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
      <Sidebar currentView="clubs" />
      <div className="ml-20 mt-0 h-full p-10 ">
        {/*Formulario para crear al deportista*/}
        <h1 className="text-left text-black p-5 rounded-t-2xl bg-amber-500">
          Editar club deportivo
        </h1>
        <div className="grid grid-cols-10 gap-10 p-10 bg-gray-100 rounded-b-2xl">
          <div className="col-span-10">
            <label className="text-2xl font-medium text-gray-900 block mb-4 text-left">
              Nombre
            </label>
            <input
              type="text"
              value={editClub.name}
              maxLength={30}
              onChange={(e) =>
                setEditClub((f: any) => ({
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
              Dirección
            </label>
            <input
              type="text"
              value={editClub.direction}
              maxLength={30}
              onChange={(e) =>
                setEditClub((f: any) => ({
                  ...f,
                  direction: e.target.value,
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
            onClick={() => navigate(`/clubs/${id}`)}
            className="col-span-3 2xl:col-span-2 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-red-600 hover:bg-red-500 cursor-pointer flex gap-5"
          >
            <p>Cancelar</p>
            <CornerDownLeft size={32} />
          </div>
          <div className="col-span-5 2xl:col-span-6"></div>
          <div
            onClick={async () => {
              const edited = {
                ...editClub,
                name: editClub.name.trim(),
                lastname: editClub.direction.trim(),
              };
              if (edited.name.trim() === "") {
                toast.error("El nombre está vacío", {
                  theme: "colored",
                });
                return;
              }
              if (edited.direction.trim() === "") {
                toast.error("La dirección está vacía", {
                  theme: "colored",
                });
                return;
              }
              //console.log(editClub);
              try {
                const newClubStatus = await updateClub(edited.id, edited);
                console.log(newClubStatus);
                navigate(`/clubs/${newClubStatus.dataValues.id}`);
              } catch (error) {
                toast.error(`Algo ha salido mal al crear el club: ${error}`, {
                  theme: "colored",
                });
                return;
              }
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
