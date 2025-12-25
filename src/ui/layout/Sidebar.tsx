import { Users, Database, Medal, PartyPopper, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Sidebar({
  currentView,
  open_t = false,
}: {
  currentView: string;
  open_t?: boolean;
}) {
  const navigate = useNavigate();
  const open: boolean = open_t;

  const navItems = [
    {
      label: "Deportistas",
      icon: <Users size={30} />,
      view: "members",
      path: "/members",
    },
    {
      label: "Clubes",
      icon: <Home size={30} />,
      view: "clubs",
      path: "/clubs",
    },
    {
      label: "Festivales",
      icon: <PartyPopper size={30} />,
      view: "festivals",
      path: "/",
    } /*
    {
      label: "Ranking",
      icon: <Medal size={30} />,
      view: "ranking",
      path: "/puntuacion",
    },*/,
    {
      label: "Base de datos",
      icon: <Database size={30} />,
      view: "database",
      path: "/database",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-auto left-0 h-full text-white transition-transform z-30 p-2
        ${open ? "lg:w-50 translate-x-0" : ""} 
        md:translate-x-0`}
      >
        <div className="bg-[#131314] w-20 p-2 flex flex-col gap-4 h-full rounded-3xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
              }}
              title={item.label}
              className={`${
                currentView === item.view ? "bg-[#47474c]" : ""
              } flex hover:cursor-pointer items-center gap-3 px-auto py-4 hover:bg-[#47474c] rounded-2xl transition`}
            >
              <span className="mx-auto">{item.icon}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
