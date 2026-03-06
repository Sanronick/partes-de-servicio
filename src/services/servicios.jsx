const despliegues = {
    comuna: ['Comuna 1', 'Comuna 2', 'Comuna 3', 'Comuna 4', 'Comuna 5', 'Comuna 6', 'Comuna 7', 'Comuna 8', 'Comuna 9', 'Comuna 10', 'Comuna 11', 'Comuna 12','Comuna 13','Comuna 14','Comuna 15'],
    base: ['Piedras', 'Luro', 'Ocampo', 'Cochabamba','Vedia', 'Araoz de Lamadrid','Couture', 'BRD Sarmiento','BRD Tacuari']
}

const turnos = {
    comunas: {
        'Comuna 1': ['Mañana', 'Tarde'],
        'Comuna 2': ['Mañana', 'Tarde'],
        'Comuna 3': ['Mañana', 'Tarde'],
        'Comuna 4': ['Mañana', 'Tarde'],
        'Comuna 5': ['Mañana', 'Tarde'],
        'Comuna 6': ['Mañana', 'Tarde'],
        'Comuna 7': ['Mañana', 'Tarde'],
        'Comuna 8': ['Mañana', 'Tarde'],
        'Comuna 9': ['Mañana', 'Tarde'],
        'Comuna 10': ['Mañana', 'Tarde'],
        'Comuna 11': ['Mañana', 'Tarde'],
        'Comuna 12': ['Mañana', 'Tarde'],
        'Comuna 13': ['Mañana', 'Tarde'],
        'Comuna 14': ['Mañana', 'Tarde'],
        'Comuna 15': ['Mañana', 'Tarde']
    },
    bases: {
        Piedras: ['Mañana','Tarde','Intermedio'],
        Luro: ['Mañana','Tarde','Intermedio'],
        Ocampo: ['Mañana','Tarde','Intermedio'],
        Cochabamba: ['Mañana','Tarde','Noche','Fin de Semana Noche'],
        Vedia: ['Mañana','Tarde'],
        'Araoz de Lamadrid': ['Mañana','Tarde','Fin de Semana Diurno','Fin de Semana Intermedio'],
        Couture: ['Mañana','Tarde','Noche', 'Fin de Semana Diurno','Fin de Semana Noche'],
        'BRD Sarmiento': ['Mañana','Tarde','Noche', 'Fin de Semana Diurno','Fin de Semana Noche'],
        'BRD Tacuari': ['Mañana','Tarde','Noche', 'Fin de Semana Diurno','Fin de Semana Noche']
    }
}

const servicios = {
    servicio: ['Reordenamiento', 'Control de Estacionamiento', 'Recorrido Poligonos', 'Curso Motos', 'Chofer', 'Otro']
}

const ausencias = {
    ausencia: ['Franco','Enfermedad','Licencia','Comision','Inasistencia','Otro']
}

const roles = {
    rol: ['Motorizado','Acompañante','Infante','Chofer']
}

const getBases = (base) => {
    return despliegues[base] || []
}

const getTurnos = (base, turno) => {
    if(!base || !turno) return []
    const collection = base === 'comuna'?'comunas':'bases'
    return turnos[collection]?.[turno] || []
}

const getServicios = (servicio) => {
    return servicios[servicio]
}

const getAusencias = (ausencia) => {
    return ausencias[ausencia]
}

const getRoles = (rol) => {
    return roles[rol]
}

const parsearLinea = (linea) =>{
    const partes = linea.split(/\*(.+?)\*/g)
    return partes.map((parte,i) => i % 2 === 1 ? <strong key={i}>{parte}</strong> : parte)
}

export default {
    getBases,
    getTurnos,
    getServicios,
    getAusencias,
    getRoles,
    parsearLinea
}