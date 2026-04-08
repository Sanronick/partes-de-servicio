import { useNavigate, useOutletContext } from "react-router-dom";
import "./Fieldset3.css";
import { useEffect } from "react";

function Fieldset3() {
  const navigate = useNavigate();
  const { formData, updateField } = useOutletContext();

  const infantes = Number(formData.infantes ?? 0)
  const motorizados = Number(formData.motorizados ?? 0)
  const conduccion = Number(formData.conduccion ?? 0)
  const ausentes = Number(formData.ausentes ?? 0)

  const totalAgentes = infantes + motorizados
  const totalPresentes = totalAgentes + conduccion
  const total = totalPresentes + ausentes

  useEffect(() => {
    if(!Number.isNaN(totalAgentes)) updateField("totalAgentes", totalAgentes)
    if(!Number.isNaN(totalPresentes)) updateField("totalPresentes", totalPresentes)
    if(!Number.isNaN(total)) updateField("total", total);
  }, [totalAgentes, totalPresentes, total]);

  

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6">
      <div className="step-content fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-[#FFCB27] text-[#153244]">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#153244]">
                Números de Dotación
              </h2>
              <p className="text-gray-600">Cargá la cantidad de Agentes</p>
            </div>
          </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="conduccion"
                    className="block text-sm font-semibold mb-1 text-[#153244]"
                  >
                    Conducción
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Presentes con rol de conducción
                  </p>
                  <input
                    type="number"
                    min="0"
                    className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-lg"
                    placeholder="0"
                    value={formData.conduccion ?? ''}
                    onChange={(e) => {
                      const v = e.target.value
                      updateField("conduccion", v === "" ? "": Number(v));
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="motorizados"
                    className="block text-sm font-semibold mb-1 text-[#153244]"
                  >
                    Motorizados
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Agentes Motorizados
                  </p>
                  <input
                    type="number"
                    min="0"
                    className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-lg"
                    placeholder="0"
                    value={formData.motorizados ?? '' }
                    onChange={(e) => {
                      const v = e.target.value
                      updateField("motorizados",v === '' ? '':Number(v));
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="infantes"
                    className="block text-sm font-semibold mb-1 text-[#153244]"
                  >
                    Infantes
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Agentes Infantes</p>
                  <input
                    type="number"
                    min="0"
                    className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-lg"
                    placeholder="0"
                    value={formData.infantes ?? ''}
                    onChange={(e) => {
                      const v = e.target.value
                      updateField("infantes", v === '' ? '' : Number(v));
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ausentes"
                    className="block text-sm font-semibold mb-1 text-[#153244]"
                  >
                    Ausentes
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Quienes no prestaron servicio
                  </p>
                  <input
                    type="number"
                    min="0"
                    className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-lg"
                    placeholder="0"
                    value={formData.ausentes ?? ""}
                    onChange={(e) => {
                      const v = e.target.value
                      updateField("ausentes", v === '' ? '' : Number(v));
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="agentes"
                    className="block text-sm font-semibold mb-1 text-[#153244]"
                  >
                    Total Agentes
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Agentes Infantes + Agentes Motorizados
                  </p>
                  <input
                    type="number"
                    id="motos"
                    min="0"
                    className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-lg disabled:bg-gray-100 disabled:text-gray-800 disabled:cursor-not-allowed"
                    placeholder="0"
                    disabled
                    value={totalAgentes}
                  />
                </div>
                <div>
                  <label
                    htmlFor="presentes"
                    className="block text-sm font-semibold mb-1 text-[#153244]"
                  >
                    Presentes
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Agentes + Conduccion
                  </p>
                  <input
                    type="number"
                    min="0"
                    className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-lg disabled:bg-gray-100 disabled:text-gray-800 disabled:cursor-not-allowed"
                    placeholder="0"
                    disabled
                    value={totalPresentes}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="total"
                    className="block text-sm font-semibold mb-1 text-[#153244]"
                  >
                    Dotacion Total
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Presentes + Ausentes
                  </p>
                  <input
                    type="number"
                    className="input-field w-full px-4 py-3 rounded-xl text-lg disabled:bg-gray-100 disabled:text-gray-800 disabled:cursor-not-allowed"
                    placeholder="0"
                    disabled
                    value={total}
                  />
                </div>
              </div>
            </div>

        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/formulario/fieldset2")}
            className="w-full btn-primary py-4 rounded-xl font-bold text-lg shadow-lg bg-gray-500 text-gray-800 hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="none">
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </svg>
            Atrás
          </button>
          <button
            type="button"
            onClick={() => navigate("/formulario/fieldset4")}
            className="w-full btn-primary py-4 rounded-xl font-bold text-lg shadow-lg bg-[#FFCC27] text-[#153244] hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Continuar
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
    </div>
  );
}

export default Fieldset3;
