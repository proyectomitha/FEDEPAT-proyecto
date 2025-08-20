import { useState } from "react";
import { Sidebar } from "../../layout/Sidebar";

export function ClubSingle() {
  const [searchMember, setSearchMember] = useState("");
  return (
    <>
      <Sidebar currentView="members" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10 bg-cyan-950">
        <h2>Información de club</h2>
        <div>
          <h3>Nombre</h3>
          <h3>Dirección</h3>
          <h3>Miembros totales</h3>
          <h3>Participaciones</h3>
          <h3>Puntuación total</h3>
          <h3>Puesto en el rankig global</h3>
        </div>
        <h2>Miembros del club</h2>
        {/* Añadir barra de busqueda, lista y botón para agregar miembro */}
        <h2>Participaciones</h2>
        {/* Añadir barra de busqueda, lista (nombre de evento, descripción, posición, puntaje)*/}
      </div>
    </>
  );
}
