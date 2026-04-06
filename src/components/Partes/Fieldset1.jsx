
import { useNavigate, useOutletContext } from "react-router-dom";
import "./Fieldset1.css";

function Fieldset1() {

  const { formData, updateField } = useOutletContext()
  const navigate = useNavigate()

  return (
    <div className="w-full overflow-x-hidden p-2 sm:p-4 lg:p-6">
      <div className="step-content fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-4 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-[#FFCB27] text-[#153244]">
              0
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#153244]">
                Registro
              </h2>
              <p className="text-gray-600">Identificate para comenzar</p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-semibold mb-2 text-[#153244]"
              >
                Nombre y Apellido *
              </label>
              <input
                id="nombre"
                type="text"
                className="input-field w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none text-lg text-black min-w-0"
                placeholder="Juan Pérez"
                required
                value={formData.nombre ?? ''}
                onChange={e => { updateField('nombre', e.target.value)}}
              />
            </div>
            <div>
              <label
                htmlFor="cat"
                className="block text-sm font-semibold mb-2 text-[#153244]"
              >
                Número de CAT *
              </label>
              <input
                id="cat"
                type="number"
                className="input-field w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none text-lg text-black min-w-0"
                placeholder="123456"
                inputMode="numeric"
                pattern="\\d*"
                step="1"
                min="0"
                required
                value={formData.cat ?? ''}
                onChange={e => updateField('cat', e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/formulario/fieldset2')}
          className="w-full btn-primary py-4 rounded-xl font-bold text-lg shadow-lg bg-[#FFCC27] text-[#153244] hover:shadow-xl transition-all flex items-center justify-center gap-2 min-w-0"
        >
          Iniciar Parte
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default Fieldset1;
