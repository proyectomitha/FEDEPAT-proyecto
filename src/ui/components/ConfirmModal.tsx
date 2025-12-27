type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
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
          <p className="text-gray-800 text-lg">{message}</p>

          <div className="mt-6 flex justify-between space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 cursor-pointer rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 cursor-pointer rounded bg-red-600 text-white hover:bg-red-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
