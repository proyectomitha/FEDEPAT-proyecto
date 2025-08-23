import { useState } from "react";
import { FestivalList } from "../components/FestivalList";
import { Searcher } from "../layout/Searcher";
import { Sidebar } from "../layout/Sidebar";
import { createFestival } from "../fetchs";
import { useNavigate } from "react-router-dom";

export function Festivals() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar currentView="festivals" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10 bg-cyan-950">
        <div className="flex flex-col justify-center max-w-2xl mx-auto">
          <h1 className="mb-5">Festivales</h1>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-4">
              <Searcher
                onChangeSearch={setSearch}
                placeholder="Buscar festival ..."
              />
            </div>
            <button
              className="px-4 h-9 mb-5 rounded-sm bg-blue-600 hover:bg-blue-700 cursor-pointer "
              onClick={async () => {
                const newFestival = await createFestival();
                if (newFestival) navigate(`/newfestivals/${newFestival.id}`);
              }}
            >
              Nuevo festival
            </button>
          </div>
          <FestivalList search={search} />
        </div>
      </div>
    </>
  );
}
