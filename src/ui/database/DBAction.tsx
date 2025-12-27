import { useState } from "react";
import { ConfirmModal } from "../components/ConfirmModal";
import { FolderDown, FolderUp } from "lucide-react";

export default function DBActions() {
  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalDelOpen, setModalDelOpen] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      //@ts-ignore
      await window.electronAPI.exportDB();
      setAlert("Base de datos exportada correctamente.");
    } catch (error) {
      console.error(error);
      setAlert("Error al exportar la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      //@ts-ignore
      await window.electronAPI.selectDB();
      setAlert("Base de datos importada correctamente.");
    } catch (error) {
      console.error(error);
      setAlert("Error al importar la base de datos.");
    } finally {
      setLoading(false);
      setModalDelOpen(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={modalDelOpen}
        message={
          "Esta acción sobrescribirá la base de datos actual. ¿Deseas continuar?"
        }
        onConfirm={handleImport}
        onCancel={() => setModalDelOpen(false)}
      />

      <div className="mt-15">
        {alert && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg border border-green-300 text-sm text-center">
            {alert}
          </div>
        )}

        <div className="flex flex-row justify-between space-y-4">
          <button
            onClick={handleExport}
            disabled={loading}
            title="Crear una copia de la base de datos actual"
            className="w-fit p-5 flex gap-5 items-center rounded-2xl text-3xl bg-blue-500 hover:bg-blue-400 cursor-pointer"
          >
            {loading ? (
              "Exportando..."
            ) : (
              <>
                <p>Exportar Base de Datos</p>
                <FolderDown size={32} />
              </>
            )}
          </button>

          <button
            onClick={() => setModalDelOpen(true)}
            disabled={loading}
            title="Importar una base de datos existente"
            className="w-fit p-5 flex gap-5 items-center rounded-2xl text-3xl bg-amber-500 hover:bg-amber-400 cursor-pointer"
          >
            {loading ? (
              "Importando..."
            ) : (
              <>
                <p>Importar Base de Datos</p>
                <FolderUp size={32} />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
