import { useState } from "react";
import { FestivalList } from "../components/FestivalList";
import { Searcher } from "../layout/Searcher";
import { Sidebar } from "../layout/Sidebar";

export function Festivals() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar currentView="festivals" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10 bg-cyan-950">
        <div className="flex flex-col justify-center max-w-2xl mx-auto">
          <h1 className="mb-5">Festivales</h1>
        </div>
        <Searcher
          onChangeSearch={setSearch}
          placeholder="Buscar festival ..."
        />
        <FestivalList search={search} />
      </div>
    </>
  );
}
