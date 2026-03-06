import { useNavigate, useOutletContext } from "react-router-dom";
import "./Fieldset5.css";
import inasistencias from '../../services/servicios'
import { useEffect } from "react";

function Fieldset5() {
  const navigate = useNavigate();
  const { formData, updateField } = useOutletContext();

  useEffect(() => {
    const cantAusentes = Number(formData.ausentes) || 0
    const actualizarCantidad = Array.isArray(formData.listaAusentes) ? formData.listaAusentes : []

    if (actualizarCantidad.length !== cantAusentes) {
      const nueva = Array.from({length: cantAusentes}, (_,i) => actualizarCantidad[i] ?? {nombre: '', motivo: '', motivoPersonalizado: ''})
      updateField('listaAusentes', nueva)
    }
  },[formData.ausentes])

  const ausencias = inasistencias.getAusencias('ausencia') ?? []

  const actualizarAusente = (index, campo, valor) => {
    const nuevos = (formData.listaAusentes ?? []).map((a,i) => i===index ? {...a,[campo]:valor}:a)
    updateField('listaAusentes',nuevos)
  }





  return (
        
    <div className="step-content fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-[#FFCB27] text-[#153244]">
            5
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#153244]">Ausentes</h2>
            <p className="text-gray-600">Detalla los ausentes (si los hubo)</p>
          </div>
        </div>
        {(formData.listaAusentes ?? []).map((aus,i)=> (
          <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-5 mb-3">
              <label className="block text-sm font-semibold text-[#153244] mb-1"> Ausente {i + 1}</label>
              <input type="text" 
                className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-black" 
                value={aus.nombre ?? ''}
                onChange={e => actualizarAusente(i,'nombre',e.target.value)}
                placeholder="Nombre y Apellido"/>
            </div>
            <div className="md:col-span-7 mb-3 flex gap-2 items-center">
              <select className="w-full px-3 py-3.5 rounded-xl text-black border border-gray-400 focus:outline-none focus:border-[#FFCC27]"
                value={aus.motivo ?? ''}
                onChange={e => {
                  const valor = e.target.value
                  const nuevos = (formData.listaAusentes ?? []).map((a,idx) => idx === i ? {...a,motivo: valor,motivoPersonalizado: valor !== 'Otro' ? '' : a.motivoPersonalizado}:a)
                  updateField('listaAusentes', nuevos)
                }}>
                  <option value="">Motivo</option>
                  {ausencias.map((au)=> (
                    <option key={au} value={au}>{au}</option>
                  ))}

              </select>
              {aus.motivo === 'Otro' && (
                <input type="text" 
                className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-black"
                value={aus.motivoPersonalizado ?? ''}
                onChange={e => actualizarAusente(i,'motivoPersonalizado',e.target.value)}
                placeholder="Motivo..."/>
              )}

            </div>
            

          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate("/formulario/fieldset4")}
          className="flex-1 bg-gray-500 text-gray-700 py-4 rounded-xl font-semibold  hover:bg-gray-300 transition-all"
        >
          ← Atrás
        </button>
        <button
          type="button"
          onClick={() => navigate("/formulario/fieldset6")}
          className="flex-1 btn-primary py-4 rounded-xl font-bold shadow-lg bg-[#FFCC27] text-[#153244] hover:shadow-xl transition-all"
        >
          Continuar →
        </button>
      </div>
    </div>

  );
}

export default Fieldset5;
