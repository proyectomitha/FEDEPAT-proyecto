import { useState } from "react";
import { Searcher } from "../layout/Searcher";
import { Sidebar } from "../layout/Sidebar";
import { ClubesList } from "../components/ClubesList";

export function Clubes() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar currentView="clubs" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10 bg-cyan-950">
        <div className="flex flex-col justify-center max-w-2xl mx-auto">
          <h1 className="mb-5">Clubes</h1>
        </div>
        <Searcher onChangeSearch={setSearch} placeholder="Buscar club ..." />
        <ClubesList search={search} />
      </div>
    </>
  );
}
