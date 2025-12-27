import { useState } from "react";
import { Searcher } from "../layout/Searcher";
import { Sidebar } from "../layout/Sidebar";
import { MemberList } from "../components/MembersList";
import { getMembers } from "../fetchs";

export function Members() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar currentView="members" />
      <div className="ml-20 mt-0 h-full p-10 ">
        <h1 className="col-span-8 border-3 rounded-2xl text-4xl mb-5 text-left font-semibold text-black p-3">
          Atletas
        </h1>
        <Searcher
          onChangeSearch={setSearch}
          placeholder="Buscar deportista ..."
        />
        <div>
          <MemberList search={search} getMembersFunction={getMembers} />
        </div>
      </div>
    </>
  );
}
