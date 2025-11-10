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
