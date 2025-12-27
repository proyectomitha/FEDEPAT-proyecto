import { Sidebar } from "../layout/Sidebar";
import DBActions from "./DBAction";

export function Database() {
  return (
    <>
      <Sidebar currentView="database" />
      <div className="ml-20 mt-0 h-full p-10 ">
        <h1 className="col-span-8 border-3 rounded-2xl text-4xl mb-5 text-left font-semibold text-black p-3">
          Base de datos
        </h1>
        <DBActions />
      </div>
    </>
  );
}
