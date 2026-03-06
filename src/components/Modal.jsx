import "./Modal.css";

function Modal({ mensaje, tipo, onClose, mostrar }) {
  if (!mostrar) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 border-t-4 ${
          tipo === "exito" ? "border-[#8DE2D6]" : "border-red-400"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                tipo === "exito"
                  ? "bg-[#FFCB27] text-[#153244]"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {tipo === "exito" ? "✓" : "!"}
            </div>
            <h3 className="text-xl font-bold text-[#153244]">
              {tipo === "exito" ? "¡Éxito!" : "Error"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Mensaje */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">{mensaje}</p>
        </div>

        {/* Botón */}
        <button
          onClick={onClose}
          className={`w-full py-3 rounded-xl font-bold text-[#153244] transition-all hover:shadow-lg ${
            tipo === "exito"
              ? "bg-[#FFCC27] hover:bg-[#f0bd1a]"
              : "bg-red-100 hover:bg-red-200 text-red-600"
          }`}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default Modal;
