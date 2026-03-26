import './Tareas.css'

function Tareas ({punto,onUpdate, onDelete, serv, roles, titulo, mostrarTipo= true}) {
    return (
    <div className="border-2 border-[#8DE2D6] border-dashed rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#153244]">{titulo}</span>
        {onDelete && (
          <button type="button" onClick={onDelete} className="text-red-400 hover:text-red-600 text-xs">
            Eliminar🗑️
          </button>
        )}
      </div>

      <label className="block text-sm font-semibold text-[#153244]">Tipo de servicio</label>
      {
        mostrarTipo && (
        <select
          className="w-full px-4 py-3 rounded-xl text-black border border-gray-300 focus:outline-none focus:border-[#FFCC27]"
          value={punto.tipo ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onUpdate({ ...punto, tipo: val, nombre: val !== "Otro" ? "" : punto.nombre });
          }}
        >
          <option value="">Selecciona una opcion...</option>
          {serv.map((ser) => <option value={ser} key={ser}>{ser}</option>)}
        </select>

)
}
        {mostrarTipo && punto.tipo === "Otro" && (
          <>
            <label className="block text-sm font-semibold text-[#153244]">Nombre del Servicio</label>
            <input type="text"
              className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-black"
              placeholder="Nombre del Servicio"
              value={punto.nombre ?? ""}
              onChange={(e) => onUpdate({ ...punto, nombre: e.target.value })}
            />
          </>
        )}


      {punto.tipo && (
        <>
          <input type="text"
            value={punto.direccion ?? ""}
            onChange={(e) => onUpdate({ ...punto, direccion: e.target.value })}
            placeholder="Direccion..."
            className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-black"
          />
          <input type="text"
            value={punto.agentes ?? ""}
            onChange={(e) => onUpdate({ ...punto, agentes: e.target.value })}
            placeholder="Agentes (separados por coma)"
            className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-black"
          />
        </>
      )}

      {punto.agentes && punto.agentes.trim() && (
        <div className="mt-2 space-y-2">
          {punto.agentes.split(/[\n,]/).map((a) => a.trim()).filter((a) => a !== "")
            .map((nombre, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2 w-full border-[#e5e7eb]">
                <span className="text-sm text-[#153244] w-1/3">{nombre}</span>
                <div className="flex gap-1 flex-wrap justify-end items-center">
                  {roles.map((rol) => (
                    <button type="button" key={rol}
                      className={`px-2 py-1 rounded-md border text-xs transition-colors ${
                        punto.roles?.[i] === rol
                          ? "bg-[#FFCC27] border-[#FFCC27] text-[#153244] font-bold"
                          : "border-gray-300 text-gray-600 hover:border-[#FFCC27]"
                      }`}
                      onClick={() => {
                        const funciones = [...(punto.roles ?? [])];
                        funciones[i] = rol;
                        onUpdate({ ...punto, roles: funciones });
                      }}
                    >
                      {rol}
                    </button>
                  ))}
                  <button type="button"
                    onClick={() => {
                      const agentesActuales = punto.agentes.split(/[\n,]/).map((a) => a.trim()).filter((a) => a !== "");
                      agentesActuales.splice(i, 1);
                      const nuevosRoles = [...(punto.roles ?? [])];
                      nuevosRoles.splice(i, 1);
                      onUpdate({ ...punto, agentes: agentesActuales.join(", "), roles: nuevosRoles });
                    }}
                    className="ml-1 text-red-400 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
    )
}

export default Tareas