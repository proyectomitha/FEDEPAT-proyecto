import { useState } from "react";
import { Searcher } from "../layout/Searcher";
import { Sidebar } from "../layout/Sidebar";
import { MemberList } from "../components/MembersList";

export function Members() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar currentView="members" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10 bg-cyan-950">
        <div className="flex flex-col justify-center max-w-2xl mx-auto">
          <h1 className="mb-5">Deportistas</h1>
        </div>
        <Searcher
          onChangeSearch={setSearch}
          placeholder="Buscar deportista ..."
        />
        <MemberList search={search} />
      </div>
    </>
  );
}
