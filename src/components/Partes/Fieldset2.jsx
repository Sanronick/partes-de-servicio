import { useNavigate, useOutletContext } from "react-router-dom";
import "./Fieldset2.css";
import servicios from "../../services/servicios";
import { useEffect, useState } from "react";

function Fieldset2() {
  const { formData, updateField } = useOutletContext();
  const [enabled, setEnabled] = useState(true);
  const navigate = useNavigate();

  const opciones = formData.baseDespliegue
    ? servicios.getBases(formData.baseDespliegue.toLowerCase())
    : [];

  const turnos = formData.lugarDespliegue
    ? servicios.getTurnos(
        formData.baseDespliegue.toLowerCase(),
        formData.lugarDespliegue,
      )
    : [];

  useEffect(() => {
    if (!formData.supervisor) updateField("supervisor", formData.nombre);
  }, []);

  const editar = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-6">
      <div className="step-content fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-[#FFCB27] text-[#153244]">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#153244]">Despliegue</h2>
              <p className="text-gray-600">Información del Servicio</p>
            </div>
          </div>
          <div className="flex items-center gap-5 mb-5">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#153244] mb-2">
              <input
                name="baseDespliegue"
                type="radio"
                className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-[#8EE2D5] checked:border-[#8EE2D5] cursor-pointer transition-colors"
                value="Comuna"
                checked={formData.baseDespliegue === "Comuna"}
                onChange={(e) => {
                  updateField("baseDespliegue", e.target.value);
                  updateField("lugarDespliegue", "");
                  updateField("turnoDespliegue", "");
                }}
              />
              COMUNA
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#153244] mb-2">
              <input
                name="baseDespliegue"
                type="radio"
                className="appearance-none w-4 h-4 rounded-full border-2 border-black checked:bg-[#8EE2D5] checked:border-[#8EE2D5] cursor-pointer transition-colors"
                value="Base"
                checked={formData.baseDespliegue === "Base"}
                onChange={(e) => {
                  updateField("baseDespliegue", e.target.value);
                  updateField("lugarDespliegue", "");
                  updateField("turnoDespliegue", "");
                }}
              />
              BASE
            </label>
          </div>
          <div>
            <select
              className="w-full px-4 py-3 rounded-xl text-black border border-gray-300 focus:outline-none mb-5 focus:border-[#FFCC27]"
              value={formData.lugarDespliegue ?? ""}
              onChange={(e) => updateField("lugarDespliegue", e.target.value)}
            >
              <option value="">Selecciona una Opcion</option>
              {opciones.map((opcion) => (
                <option value={opcion} key={opcion}>
                  {opcion}
                </option>
              ))}
            </select>

            <select
              className="w-full px-4 py-3 rounded-xl text-black border border-gray-300 focus:outline-none mb-5 focus:border-[#FFCC27]"
              value={formData.turnoDespliegue ?? ""}
              onChange={(e) => updateField("turnoDespliegue", e.target.value)}
            >
              <option value="">Selecciona una Opcion</option>
              {turnos.map((turno) => (
                <option value={turno} key={turno} className="bg-gray">
                  {turno}
                </option>
              ))}
            </select>
            <label
              htmlFor="spv"
              className="flex items-center gap-2 text-sm font-semibold text-[#153244] mb-2"
            >
              Coordinador
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="input-field w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none text-lg text-black disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={enabled}
              value={formData.supervisor}
              onChange={(e) => updateField("supervisor", e.target.value)}
            />
            <button
              type="button"
              className="p-2 rounded-lg border border-[#e5e7eb] text-gray-600 hover:text-gray-800"
              onClick={editar}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5h2m3.586 1.586a2 2 0 010 2.828L9 17l-4 1 1-4 7.586-7.586a2 2 0 012.828 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/formulario/fieldset1")}
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
            onClick={() => navigate("/formulario/fieldset3")}
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
export default Fieldset2;
