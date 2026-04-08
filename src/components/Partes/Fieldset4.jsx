import { useNavigate, useOutletContext } from "react-router-dom";
import "./Fieldset4.css";
import serviciosData from "../../services/servicios";
import Tareas from "../Tareas";

function Fieldset4() {
  const navigate = useNavigate();
  const { formData, updateField } = useOutletContext();

  const servicios = Array.isArray(formData.servicios) ? formData.servicios : [];
  const serv = serviciosData.getServicios("servicio") ?? [];
  const roles = serviciosData.getRoles("rol") ?? [];

  const servicioVacio = {
    tipo: '',
    nombre: '',
    puntos: []
  }

  const puntoVacio = {
    direccion: '',
    agentes : []
  }


  const agregarServicio = () => {
    updateField("servicios", [...servicios, { ...servicioVacio}]);
  };

  const eliminarServicio = (index) => {
    updateField(
      "servicios",
      servicios.filter((_, i) => i !== index),
    );
  };

  const labelServicio = (servicio, index) => {
    const label = servicio.tipo === 'Otro'
      ? (servicio.nombre || 'Sin Nombre')
      : (servicio.tipo || 'Sin tipo')

      return ` Servicio ${index + 1} - ${label}`
  }

  return (
    <div className="step-content fade-in">
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-[#FFCB27] text-[#153244]">
          4
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#153244]">Servicios</h2>
          <p className="text-gray-600">Agrega los servicios y puntos</p>
        </div>
      </div>

      {
        servicios.map((servicio, index)=> (
          <div key={index}>
            <Tareas
              titulo={labelServicio(servicio,index)}
              punto={servicio}
              serv={serv}
              roles={roles}
              mostrarTipo={true}
              mostrarCampos={false}
              onDelete={()=> eliminarServicio(index)}
              onUpdate={(actualizado)=> {
                const nuevos = servicios.map((s,i)=> i === index ? actualizado : s)
                updateField('servicios',nuevos)
              }}/>
              {(servicio.puntos ?? []).map((punto,pi)=> (
                <Tareas
                  key={pi}
                  mostrarTipo={false}
                  mostrarCampos={true}
                  titulo={`↳ Punto ${pi + 1}${punto.direccion ? `: 📍 ${punto.direccion}`: ''}`}
                  punto={{...punto, tipo: servicio.tipo}}
                  serv={serv}
                  roles={roles}
                  onDelete={()=> {
                    const nuevosPuntos = (servicio.puntos ?? []).filter((_,idx)=> idx !== pi)
                    const nuevos = servicios.map((s,i)=> i===index ? {...s,puntos: nuevosPuntos} : s)
                    updateField('servicios',nuevos)
                  }}
                  onUpdate={(actualizado) => {
                    const nuevosPuntos = (servicio.puntos ?? []).map((p,idx) => idx === pi ? actualizado : p)
                    const nuevos = servicios.map((s,i)=> i === index ? {...s,puntos: nuevosPuntos}:s)
                    updateField('servicios',nuevos)
                  }}
                  />
              ))}
              {servicio.tipo && (
                <button type="button"
                className="w-full bg-white border-2 py-2 rounded-lg text-sm font-semibold hover:shadow-md transition-all border-[#8DE2D6] text-[#153244]"
                onClick={()=> {
                  const puntos = [...(servicio.puntos ?? []), {...puntoVacio}]
                  const nuevos = servicios.map((s, i) => i === index ? { ...s, puntos } : s);
                  updateField("servicios", nuevos);
                }}>
                  + Agregar Punto
                </button>
              )}
          </div>
        ))
      }
      <div className="border-2 border-dashed rounded-xl p-4 border-[#8DE2D6]">
  <button
    type="button"
    onClick={agregarServicio}
    className="w-full btn-secondary py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 bg-[#8DE2D6] text-[#153244]"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
    Agregar Servicio
  </button>
</div>
    </div> 

    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => navigate("/formulario/fieldset3")}
        className="flex-1 bg-gray-500 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all"
      >
        ← Atrás
      </button>
      <button
        type="button"
        onClick={() => navigate("/formulario/fieldset5")}
        className="flex-1 btn-primary py-4 rounded-xl font-bold shadow-lg bg-[#FFCC27] text-[#153244] hover:shadow-xl transition-all"
        >
        Continuar →
      </button>
    </div>
  </div>
  );
}

export default Fieldset4;
