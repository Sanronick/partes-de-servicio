import { NavLink } from 'react-router-dom'
import './Inicio.css'

function Inicio() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        ¿Qué deseas hacer?
      </h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {/* Tarjeta Formulario */}
        <NavLink
          to="/formulario"
          className="group w-full md:w-80 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center"
        >
          <span className="text-7xl mb-4">📝</span>
          <h3 className="text-2xl font-semibold text-white mb-2">Formulario</h3>
          <p className="text-white/70">
            Completá un nuevo parte de servicio.
          </p>
        </NavLink>

        {/* Tarjeta Reporte */}
        <NavLink
          to="/reporte"
          className="group w-full md:w-80 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center"
        >
          <span className="text-7xl mb-4">📊</span>
          <h3 className="text-2xl font-semibold text-white mb-2">Reporte</h3>
          <p className="text-white/70">
            Visualizá y exportá los partes de servicio ya generados.
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default Inicio;
