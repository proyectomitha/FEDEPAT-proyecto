import { useEffect, useState } from "react";
import { Sidebar } from "../../layout/Sidebar";
import { getMember } from "../../fetchs";
import { useNavigate, useParams } from "react-router-dom";
import { calcularEdad } from "../../functions";
import { CornerDownLeft, Pencil, Trash } from "lucide-react";

export function MembersSingle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataMember, setDataMember] = useState<any>("");
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID error");
        const data = await getMember(id);
        console.log(data);
        if (data) setDataMember(data);
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
      <Sidebar currentView="members" />
      <div className="ml-20 mt-0 h-full p-10 ">
        <div className="border-3 rounded-2xl text-4xl font-semibold text-black p-5">
          <p className=" text-left">
            {dataMember
              ? `${dataMember[0].name} ${dataMember[0].lastname}`
              : ""}
          </p>
        </div>

        <div className="border-3 mt-10 rounded-2xl text-2xl text-black p-5">
          <div className="flex mt-5">
            <label className="font-bold">Club:</label>
            <p className="ml-3">
              {dataMember ? `${dataMember[0].club.name}` : ""}
            </p>
          </div>
          <div className="flex mt-5">
            <label className="font-bold">Edad:</label>
            <p className="ml-3">
              {dataMember ? `${calcularEdad(dataMember[0].birth)} años` : ""}
            </p>
          </div>
          <div className="flex mt-5">
            <label className="font-bold">Fecha de nacimiento:</label>
            <p className="ml-3">
              {dataMember ? `${dataMember[0].birth.toDateString()}` : ""}
            </p>
          </div>
          <div className="flex mt-5">
            <label className="font-bold">Sexo:</label>
            <p className="ml-3">
              {dataMember ? `${dataMember[0].gender}` : ""}
            </p>
          </div>
          <div className="flex mt-5">
            <label className="font-bold">ID:</label>
            <p className="ml-3">
              {dataMember ? `${dataMember[0].number}` : ""}
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-10 gap-4">
          <div
            title="Ir al club del deportista"
            onClick={() => navigate(`/clubs/${dataMember[0].club.id}`)}
            className="col-span-3 2xl:col-span-2 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-black hover:bg-amber-500 cursor-pointer flex gap-5"
          >
            <p>Ir a Club</p>
            <CornerDownLeft size={32} />
          </div>
          <div className="col-span-5 2xl:col-span-6"></div>
          <div
            title="Eliminar deportista"
            className="col-span-1 justify-center rounded-2xl items-center text-3xl p-3 bg-red-700 hover:bg-red-600 cursor-pointer flex gap-5"
          >
            <Trash size={35} />
          </div>

          <div
            title="Editar deportista"
            className="col-span-1 justify-center rounded-2xl items-center text-3xl p-3 bg-blue-700 hover:bg-blue-500 cursor-pointer flex gap-5"
          >
            <Pencil size={35} />
          </div>
        </div>
      </div>
    </>
  );
}
