import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  lastname: string;
  birth: Date;
};

export function Home() {
  const [data, setData] = useState<[User]>([
    {
      id: "",
      name: "",
      lastname: "",
      birth: new Date(),
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //@ts-ignore
        const dfetch = await window.members.getMembers();
        console.log(dfetch);
        setData(dfetch);
      } catch (error) {
        console.error("Error al obtener datos de usuarios:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center max-w-2xl mx-auto">
        <h1>Electron template</h1>

        <h2 className="mt-10 text-2xl">Usuarios</h2>

        <p className="mb-10">
          Este es un ejemplo de captura de datos desde electron.
        </p>

        <table className="w-full p-10 text-left whitespace-nowrap bg-gray-800">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-4 pl-8">Nombre</th>
              <th className="p-4">Apellido</th>
              <th className="p-4 pr-8 text-right">Fecha de nacimiento</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {data.map((user) => (
              <tr key={user.id}>
                <td className="p-4 pl-8">{user.name}</td>
                <td className="p-4">{user.lastname}</td>
                <td className="p-4 pr-8 text-right">
                  {user.birth.toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <a href="https://github.com/sergioCaceresMC/Template-electron-react-sequelize.git">
        <button className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Ir a repositorio...
        </button>
      </a>
    </>
  );
}
