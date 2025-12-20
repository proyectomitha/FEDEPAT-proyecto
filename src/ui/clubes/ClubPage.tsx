import { useState } from "react";
import { Searcher } from "../layout/Searcher";
import { Sidebar } from "../layout/Sidebar";
import { ClubesList } from "../components/ClubesList";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Clubes() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar currentView="clubs" />
      <div className="ml-20 mt-0 h-full p-10 ">
        <Searcher onChangeSearch={setSearch} placeholder="Buscar club ..." />
        <ClubesList search={search} />
        <div className="mt-10 grid grid-cols-10 gap-4">
          <div className="col-span-7"></div>
          <div
            title="Nuevo club"
            className="col-span-3 justify-center ml-auto cursor-pointer"
          >
            <div
              className="w-fit p-5 flex gap-5 items-center rounded-2xl text-3xl bg-amber-500 hover:bg-amber-400"
              onClick={() => navigate(`/clubs/new-club`)}
            >
              <p>Nuevo club</p>
              <Plus size={35} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
