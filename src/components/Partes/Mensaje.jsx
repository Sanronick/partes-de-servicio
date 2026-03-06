function FormatearMensaje(formData) {

  
  const lineas = []

  lineas.push('📝 *Parte de Servicio*')
  lineas.push('')

  //Fecha de Hoy
  const dia = new Date().toLocaleDateString()
  lineas.push(`📅 *Fecha:* ${dia}`)

  // Datos del agente
  if (formData.nombre) lineas.push(`👤 *Nombre:* ${formData.nombre}`)
  if (formData.cat) lineas.push(`🪪 *N° CAT:* ${formData.cat}`)

  // Despliegue
  if (formData.baseDespliegue && formData.lugarDespliegue){
    const emoji = formData.baseDespliegue === 'Base' ? '🏢' : '🏙️'
    const etiqueta = formData.baseDespliegue === 'Base' ? 'Base' : 'Despliegue'
    lineas.push(`${emoji} *${etiqueta}:* ${formData.lugarDespliegue}`)
    }
  if (formData.turnoDespliegue) lineas.push(`🕧 *Turno:* ${formData.turnoDespliegue}`)
  if (formData.supervisor) lineas.push(`⭐ *Supervisor:* ${formData.supervisor}`)

  // Dotación
  lineas.push('')
  if (formData.conduccion) lineas.push(`🕴🏻 *Conducción:* ${formData.conduccion}`)
  if (formData.motorizados) lineas.push(`🏍️ *Motorizados:* ${formData.motorizados}`)
  if (formData.infantes) lineas.push(`🚶🏻 *Infantes:* ${formData.infantes}`)
  if (formData.totalAgentes) lineas.push(`#️⃣ *Total Agentes:* ${formData.totalAgentes}`)
  if (formData.totalPresentes) lineas.push(`✅ *Presentes:* ${formData.totalPresentes}`)
  if (formData.ausentes) lineas.push(`❌ *Ausentes:* ${formData.ausentes}`)
  if (formData.total) lineas.push(`☑️ *Total:* ${formData.total}`)

  // Ausentes detallados
  if (Array.isArray(formData.listaAusentes) && formData.listaAusentes.length > 0) {
    lineas.push('')
    lineas.push('🔻 *Detalle Ausentes:*')
    formData.listaAusentes.forEach((aus, i) => {
      const motivo = aus.motivo === 'Otro' ? aus.motivoPersonalizado || 'Sin especificar' : aus.motivo
      lineas.push(` ${i + 1}. ${aus.nombre || '—'} — ${motivo || 'Sin motivo'}`)
    })
  }

  // Servicios
  if (Array.isArray(formData.servicios) && formData.servicios.length > 0) {
    lineas.push('')
    lineas.push('📋 *Servicios:*')
    formData.servicios.forEach((servicio, i) => {
      lineas.push('')
      lineas.push(` *Servicio ${i + 1}*`)
      lineas.push(` ↳ Punto 1: ${servicio.tipo === 'Otro' ? servicio.nombre : servicio.tipo}`)
      if (servicio.direccion) lineas.push(`   📍 ${servicio.direccion}`)
      if (servicio.agentes && servicio.agentes.trim()) {
        servicio.agentes.split(/[\n,]/).map(a => a.trim()).filter(a => a !== '')
          .forEach((nombre, j) => {
            lineas.push(`   • ${nombre} (${servicio.roles?.[j] ?? 'Sin rol'})`)
          })
      }

      // Puntos adicionales
      if (Array.isArray(servicio.puntos)) {
        servicio.puntos.forEach((punto, pi) => {
          lineas.push(` ↳ Punto ${pi + 2}: ${punto.tipo === 'Otro' ? punto.nombre : punto.tipo}`)
          if (punto.direccion) lineas.push(`   📍 ${punto.direccion}`)
          if (punto.agentes && punto.agentes.trim()) {
            punto.agentes.split(/[\n,]/).map(a => a.trim()).filter(a => a !== '')
              .forEach((nombre, j) => {
                lineas.push(`   • ${nombre} (${punto.roles?.[j] ?? 'Sin rol'})`)
              })
          }
        })
      }
    })
  }

  // Observaciones
  if (formData.observaciones && formData.observaciones.trim()) {
    lineas.push('')
    lineas.push(`🅾️ *Observaciones:* ${formData.observaciones}`)
  }

  lineas.push('')

  return lineas.join('\n')
}

export default FormatearMensaje