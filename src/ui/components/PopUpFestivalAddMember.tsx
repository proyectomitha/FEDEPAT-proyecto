import { useEffect, useMemo, useState } from "react";
import { Searcher } from "../layout/Searcher";
import type { Member } from "../types";
import { calcularEdad } from "../functions";

export type filteredMember = {
  id: string;
  name: string;
  lastname: string;
  number: string;
  gender: string;
  birth: Date;
  age: string;
};

export function PopUpFestivalAddMember({
  id,
  isOpen,
  onCancel,
  members,
  suscriptor, // lista de ids inscritos
  update, // función extra opcional
  addSuscriptors,
  removeSuscriptors,
}: {
  id: string;
  isOpen: boolean;
  onCancel: () => void;
  members: Member[];
  suscriptor: Member[];
  update: () => void;
  addSuscriptors: (id: string, members: string[]) => void;
  removeSuscriptors: (id: string, members: string[]) => void;
}) {
  const [searchMember, setSearchMember] = useState("");
  const [filteredData, setFilteredData] = useState<filteredMember[]>([]);

  // ---- Normalizar estructura en caso de venir como dataClub.members ----
  const dataClub = useMemo(() => ({ members }), [members]);

  // ---- Filtrar cuando cambia search ----
  useEffect(() => {
    const lowerSearch = searchMember.toLowerCase();
    if (!dataClub) return;

    const filtered = dataClub.members
      .map((item) => ({
        ...item,
        age: calcularEdad(item.birth),
      }))
      .filter((item) =>
        `${item.name} ${item.lastname} ${item.number} ${item.age}`
          .toLowerCase()
          .includes(lowerSearch)
      )
      .sort((a, b) => {
        const aSub = isSubscribed(a.id) ? 0 : 1;
        const bSub = isSubscribed(b.id) ? 0 : 1;
        return aSub - bSub; // inscritos primero
      });
    //@ts-ignore
    setFilteredData(filtered);
  }, [searchMember, dataClub?.members]);

  // ---- Verificar si está inscrito ----
  const isSubscribed = (memberId: string) => {
    // 🧩 Caso: lista de suscriptores
    if (Array.isArray(suscriptor)) {
      //console.log("heeee");
      return suscriptor.some((s) => s.id === memberId);
    }
    return false;
  };

  // ---- Manejar cambio del checkbox ----
  const handleToggle = async (member: any) => {
    const subscribed = isSubscribed(member.id);

    if (!subscribed) {
      await addSuscriptors(id, [member.id]);
    } else {
      await removeSuscriptors(id, [member.id]);
    }

    if (typeof update === "function") {
      update(); // si hay que refrescar datos
    }
  };

  if (!isOpen) {
    if (searchMember != "") {
      setSearchMember("");
    }
    return null;
  }
  if (searchMember == "") {
    setSearchMember(" ");
  }

  return (
    <>
      {/* Fondo semitransparente */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onCancel} />

      {/* Modal centrado */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-6xl w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <Searcher onChangeSearch={setSearchMember}></Searcher>
          <div className="mt-5 rounded-l-2xl max-h-[calc(100vh-30rem)] min-h-[calc(15rem)] overflow-y-auto custom-scrollbar">
            <table className="w-full table-fixed p-10 text-left whitespace-nowrap text-black bg-gray-100">
              <thead className="bg-[#ffb200] sticky top-0 text-lg font-light">
                <tr>
                  <th className="p-4 bg-[#ffb200] cursor-default">Inscrito</th>
                  <th className="p-4 bg-[#ffc43c] cursor-default">Nombre</th>
                  <th className="p-4 bg-[#ffb200] cursor-default">Apellido</th>
                  <th className="p-4 bg-[#ffc43c] cursor-default">ID</th>
                  <th className="p-4 bg-[#ffb200] cursor-default">Edad</th>
                </tr>
              </thead>

              <tbody className="">
                {filteredData.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-white border-b-3 border-white"
                  >
                    <td className="p-4 truncate w-2 cursor-default text-center">
                      <button
                        className={`${
                          isSubscribed(member.id)
                            ? "bg-green-600"
                            : "bg-red-500"
                        } text-white border border-light bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft rounded-2xl cursor-pointer w-10 h-10 font-bold`}
                        onClick={() => handleToggle(member)}
                      >
                        {isSubscribed(member.id) ? "✓" : "☓"}
                      </button>
                    </td>

                    <td className="p-4 truncate cursor-default">
                      {member.name}
                    </td>
                    <td className="p-4 truncate cursor-default">
                      {member.lastname}
                    </td>
                    <td className="p-4 truncate cursor-default">
                      {member.number}
                    </td>
                    <td className="p-4 truncate cursor-default">
                      {member.age ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Botones */}
          <div className="mt-6 flex justify-between space-x-4">
            <button
              title="Cancelar"
              onClick={() => {
                onCancel();
              }}
              className="col-span-3 2xl:col-span-2 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-blue-700 hover:bg-blue-600 cursor-pointer flex gap-5"
            >
              <p>Hecho</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
