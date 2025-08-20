import { Users, Database, Medal, PartyPopper, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Sidebar({
  currentView,
  open_t = true,
}: {
  currentView: string;
  open_t?: boolean;
}) {
  const navigate = useNavigate();
  const open: boolean = open_t;

  const navItems = [
    {
      label: "Deportistas",
      icon: <Users />,
      view: "members",
      path: "/members",
    },
    {
      label: "Clubes",
      icon: <Home />,
      view: "clubs",
      path: "/clubs",
    },
    {
      label: "Festivales",
      icon: <PartyPopper />,
      view: "festivals",
      path: "/",
    },
    {
      label: "Puntuación",
      icon: <Medal />,
      view: "puntuacion",
      path: "/puntuacion",
    },
    {
      label: "Base de datos",
      icon: <Database />,
      view: "database",
      path: "/database",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-auto left-0 h-full bg-cyan-600 text-white shadow-lg transition-transform z-30 
          w-19 p-4 flex flex-col gap-4
        ${open ? "lg:w-50 translate-x-0" : ""} 
        md:translate-x-0`}
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              navigate(item.path);
            }}
            title={item.label}
            className={`${
              currentView === item.view ? "bg-cyan-700" : ""
            } flex hover:cursor-pointer items-center gap-3 p-2 hover:bg-cyan-700 rounded transition`}
          >
            {item.icon}
            <span className={`hidden ${open ? "lg:inline-block" : ""}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
