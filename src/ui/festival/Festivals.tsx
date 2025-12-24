import { useState } from "react";
import { FestivalList } from "../components/FestivalList";
import { Searcher } from "../layout/Searcher";
import { Sidebar } from "../layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export function Festivals() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar currentView="festivals" />
      <div className="ml-20 mt-0 h-full p-10 ">
        <Searcher
          onChangeSearch={setSearch}
          placeholder="Buscar festival ..."
        />
        <FestivalList search={search} />

        <div className="mt-10 grid grid-cols-10 gap-4">
          <div className="col-span-7"></div>

          <div
            title="Nuevo festival"
            className="col-span-3 justify-center ml-auto cursor-pointer"
          >
            <button
              className="w-fit p-5 flex gap-5 items-center rounded-2xl text-3xl bg-amber-500 hover:bg-amber-400 cursor-pointer"
              onClick={() => navigate(`/festivals/new-festival`)}
            >
              <p>Nuevo festival</p>
              <Plus size={35} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
