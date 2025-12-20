export function WarningDelete({
  txt,
  isOpen,
  fn_end,
  onCancel,
}: {
  txt: string;
  isOpen: boolean;
  fn_end: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Fondo semitransparente */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onCancel} />

      {/* Modal centrado */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-gray-800 text-2xl">{txt}</p>

          <div className="mt-6 flex justify-between space-x-4">
            <div
              onClick={async () => {
                fn_end();
              }}
              title="Eliminar"
              className="col-span-2 justify-center rounded-2xl items-center text-3xl p-3 bg-blue-700 hover:bg-blue-500 cursor-pointer flex gap-5"
            >
              <p>Eliminar</p>
            </div>
            <div className="col-span-5 2xl:col-span-6"></div>

            <div
              title="Cancelar"
              onClick={() => {
                onCancel();
              }}
              className="col-span-3 2xl:col-span-2 justify-center rounded-2xl items-center text-2xl 2xl:text-3xl p-3 bg-red-600 hover:bg-red-500 cursor-pointer flex gap-5"
            >
              <p>Cancelar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
