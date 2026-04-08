import './Tareas.css'

function Tareas ({punto,onUpdate, onDelete, serv, roles, titulo, mostrarTipo= true, mostrarCampos = true}) {

  const agentes = Array.isArray(punto.agentes) ? punto.agentes : []

  const agregarAgente = (nombreRaw) => {
    const nombre = nombreRaw.trim()
    if (!nombre) return
    onUpdate({...punto, agentes: [...agentes, {nombre, rol: ''}]})
  }

  const eliminarAgente = (i) => {
    onUpdate({...punto, agentes: agentes.filter((_,idx) => idx !== i)})
  }

  const actualizarRol = (i, rol) => {
    const nuevos = agentes.map((a,idx) => idx === i ? { ...a,rol } : a)
    onUpdate({...punto, agentes:nuevos})
  }

  return(
    <div className='border-2 border-[#8DE2D6] border-dashed rounded-xl p-4 space-y-3'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-[#153244]'>{titulo}</span>
        { onDelete && (
          <button type='button' onClick={onDelete} className='text-red-400 hover:text-red-600 text-xs'>
            Eliminar🗑️
          </button>
        )}
      </div>

      {mostrarTipo && (
        <>
          <label className='block text-sm font-semibold text-[#153244]'>Tipo de Servicio</label>
          <select
            className='w-full px-4 py-3 rounded-xl text-black border border-gray-300 focus:outline-none focus:border-[#FFCC27]'
            value={punto.tipo ?? ''}
            onChange={(e) => {
              const val = e.target.value
              onUpdate({...punto, tipo: val, nombre: val !== 'Otro' ? '' : punto.nombre})
            }} 
            >
              <option value="">Selecciona una opcion...</option>
              {serv.map((ser) => <option value={ser} key={ser}>{ser}</option>)}
            </select>
        </>
      )}

      {mostrarTipo && punto.tipo === 'Otro' && (
        <>
        <label className='block text-sm font-semibold text-[#153244]'>Nombre del Servicio</label>
        <input type="text" 
          className='input-field w-full px-4 py-3 rounded-xl focus:outline-none text-black'
          placeholder='Nombre del Servicio'
          value={punto.nombre ?? ''}
          onChange={(e) => onUpdate({...punto, nombre: e.target.value})}
          />
        </>
      )}

      {punto.tipo && mostrarCampos && (
        <input type="text" 
          value={punto.direccion ?? ''}
          onChange={(e) => onUpdate({...punto, direccion: e.target.value})}
          placeholder='Direccion...'
          className='input-field w-full px-4 py-3 rounded-xl focus:outline-none text-black'/>
      )}

      {punto.tipo && mostrarCampos && (
        <input 
          type="text"
          placeholder='Agregar Agente (Enter para confirmar)' 
          className='input-field w-full px-4 py-3 rounded-xl focus:outline-none text-black'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              agregarAgente(e.target.value)
              e.target.value = ''
            }
          }}
          />
      )}

      {mostrarCampos && agentes.length > 0 && (
        <div className='mt-2 space-y-2'>
          {agentes.map((agente, i) => (
            <div key={i}
            className='flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2 w-full border-[#e5e7eb]'>
              <span className='text-sm text-[#153244] w-1/3'>{agente.nombre}</span>
              <div className='flex gap-1 flex-wrap justify-end items-center'>
                {roles.map((rol) => (
                  <button
                    type='button'
                    key={rol}
                    className={`px-2 py-1 rounded-md border text-xs transition-colors ${
                      agente.rol === rol
                        ? "bg-[#FFCC27] border-[#FFCC27] text-[#153244] font-bold"
                        : "border-gray-300 text-gray-600 hover:border-[#FFCC27]"
                    }`}
                    onClick={() => actualizarRol(i,rol)}>
                      {rol}
                  </button>
                ))}
                <button
                  type='button'
                  onClick={() => eliminarAgente(i)}
                  className='ml-1 text-red-400 hover:text-red-600 transition-colors'>
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