import { useEffect, useState } from "react";
import { Sidebar } from "../../layout/Sidebar";
import type { Club, Member } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { deleteClub, getClub } from "../../fetchs";
import { calcularEdad } from "../../functions";
import { Searcher } from "../../layout/Searcher";
import { ElementList } from "../../components/ElementList";
import { CornerDownLeft, Pencil, Trash, UserPlus } from "lucide-react";
import { WarningDelete } from "../../components/WarningDelete";
import { ToastContainer, toast } from "react-toastify";

export function ClubSingle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchMember, setSearchMember] = useState("");
  const [filteredData, setFilteredData] = useState<Member[]>([]);
  const [dataClub, setDataClub] = useState<{ club: Club; members: Member[] }>();
  const [warning, setWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) throw new Error("ID error");
        const data = await getClub(id);
        if (data) setDataClub(data);
      } catch (error) {
        console.error("Error al obtener información del club: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // Filtrar cuando cambia `search`
  useEffect(() => {
    const lowerSearch = searchMember.toLowerCase();
    if (!dataClub) return;

    const filtered = dataClub.members
      .filter((item) =>
        `${item.name} ${item.lastname} ${item.number}`
          .toLowerCase()
          .includes(lowerSearch)
      )
      .map((item) => ({
        ...item,
        age: calcularEdad(item.birth),
      }));

    setFilteredData(filtered);
  }, [searchMember, dataClub?.members]);

  return (
    <>
      <ToastContainer />
      <WarningDelete
        txt={
          "Se borrarán los datos de todos los deportistas miembros del club ¿Está seguro que quiere eliminar este club?"
        }
        isOpen={warning}
        fn_end={async function (): Promise<void> {
          if (id == undefined) {
            setWarning(false);
            return;
          }
          const result: any = await deleteClub(id);
          if (result != 1) {
            toast.error("Error en la eliminación del club", {
              theme: "colored",
            });
            setWarning(false);
          } else {
            navigate(`/clubs`);
          }
        }}
        onCancel={function (): void {
          setWarning(false);
        }}
      ></WarningDelete>
      <Sidebar currentView="clubs" />
      <div className="ml-20 mt-0 h-full px-10 py-3">
        <div className=" grid grid-cols-10 gap-4 mb-5">
          <h1 className="col-span-8 border-3 rounded-2xl text-4xl text-left font-semibold text-black p-3">
            {dataClub?.club.name}
          </h1>

          <div className="col-span-2 2xl:col-span-2 flex m-auto gap-5">
            <div
              onClick={() => setWarning(true)}
              title="Eliminar club"
              className="justify-center rounded-2xl items-center text-2xl 2xl:text-3xl bg-red-700 hover:bg-red-600 p-5 w-full h-full cursor-pointer flex gap-5 max-w-20"
            >
              <Trash size={32} />
            </div>
            <div
              title="Editar club"
              onClick={() => navigate(`/clubs/${id}/edit`)}
              className="justify-center rounded-2xl items-center text-2xl 2xl:text-3xl bg-blue-500 hover:bg-blue-400 p-5 w-full h-full cursor-pointer flex gap-5 max-w-20"
            >
              <Pencil size={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col border-3 rounded-2xl text-lg font-semibold text-black p-5 mb-5">
          <div className="flex mb-3 gap-2">
            <label className=" font-bold ">Id:</label>
            <p className="">{dataClub?.club.id}</p>
          </div>

          <div className="flex mb-3 gap-2">
            <label className=" font-bold ">Dirección:</label>
            <p className="">{dataClub?.club.direction}</p>
          </div>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <label className="font-bold ">Miembros:</label>
              <p className="">{dataClub?.members.length}</p>
            </div>
          </div>
        </div>
        {/* Añadir barra de busqueda, lista y botón para agregar miembro */}
        <Searcher
          placeholder="Buscar miembro ..."
          onChangeSearch={setSearchMember}
        />
        <ElementList
          search={searchMember}
          elements={filteredData}
          loading={loading}
          data={[
            { attribute: "name", label: "Nombre", type: "str" },
            { attribute: "lastname", label: "Apellido", type: "str" },
            { attribute: "age", label: "Edad", type: "str" },
            //{ attribute: "birth", label: "Fecha de nacimiento", type: "date" },
            { attribute: "gender", label: "Sexo", type: "str" },
            { attribute: "number", label: "ID", type: "str" },
          ]}
          filter={["name", "lastname", "number"]}
        />

        <div className="mt-10 grid grid-cols-10 gap-4">
          <div
            onClick={() => navigate(`/clubs`)}
            title="Ir a todos los clubes"
            className="col-span-1 2xl:col-span-1 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-black hover:bg-amber-500 cursor-pointer flex gap-5"
          >
            <CornerDownLeft size={32} />
          </div>
          <div className="col-span-5 2xl:col-span-6"></div>

          <div
            title="Nuevo deportista"
            onClick={() => navigate(`/clubs/${id}/new-member`)}
            className="col-span-4 2xl:col-span-3 justify-center rounded-2xl items-center text-3xl p-3 bg-amber-500 hover:bg-amber-400 cursor-pointer flex gap-5"
          >
            <p className="text-lg lg:text-2xl">Nuevo deportista</p>
            <UserPlus size={35} />
          </div>
        </div>
      </div>
    </>
  );
}
