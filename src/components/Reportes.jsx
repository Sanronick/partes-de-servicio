import { useEffect, useState } from "react"
import serviceReportes from "../services/serviceReportes"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Dialog } from "primereact/dialog"
import { FiEye } from "react-icons/fi"
import { NavLink } from "react-router-dom"



function Reportes () {

    const [ reportes, setReportes ] = useState([])
    const [ parteSeleccionado, setParteSeleccionado ] = useState(null)
    const [ visible, setVisible ] = useState(false)

    const abrirReporte = (row) => {
        setParteSeleccionado(row)
        setVisible(true)
    }

    const verParte = (row) => (
        <button
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FFCC27]/10 hover:bg-[#FFCC27]/20 text-[#FFCC27] transition-colors"
            onClick={() => abrirReporte(row)}
            >
            <FiEye size={16}
            className="cursor-pointer"/>
        </button>
        )
    


    useEffect(() => {
        ;( async () => {
            const reportes = await serviceReportes.getAll()
            setReportes(reportes)
        })()

    },[])

    return (
        <>
        <div className="flex justify-between items-center w-full">
            <NavLink to='/' className="text-lg text-white font-bold m-4">Inicio</NavLink>
            <h2 className="text-lg text-white font-bold m-4">Partes de Servicio</h2>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <DataTable 
                value={reportes}
                rowGroupMode="subheader"
                groupRowsBy="baseDespliegue"
                sortField="baseDespliegue"
                sortOrder={1}
                responsiveLayout="scroll"
                className="text-sm"
                rowGroupHeaderTemplate={(reportes) => (
                    <div className="bg-[#FFCC27]/10 text-[#FFCC27] font-bold px-4 py-2 text-xs uppercase tracking-wider">
                        Base: {reportes.baseDespliegue}
                    </div>
                )}>
                <Column 
                    field="lugarDespliegue"
                    header="Lugar"
                    headerClassName="px-3 py-3 text-white/50 font-semibold text-xs uppercase"
                    bodyClassName="px-3 py-3 text-white/80"
                    />

                <Column 
                    field="turnoDespliegue"
                    header="Turno"
                    headerClassName="px-3 py-3 text-white/50 font-semibold text-xs uppercase"
                    bodyClassName="px-3 py-3 text-white/80"/>

                <Column 
                    field="supervisor"
                    header="Supervisor"
                    headerClassName="px-3 py-3 text-white/50 font-semibold text-xs uppercase"
                    bodyClassName="px-3 py-3 text-white/80"/>

                <Column 
                    field="totalPresentes"
                    header="Presentes"
                    headerClassName="px-3 py-3 text-white/50 font-semibold text-xs uppercase"
                    bodyClassName="px-3 py-3 text-white/80 font-bold"/>

                <Column 
                    body={verParte}
                    style={{ width: "4rem"}}/>
            </DataTable>

            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                modal
                dismissableMask
                pt={{
                    root: {
                        className:
                        "bg-[#0f2235] border border-white/10 rounded-2xl text-white overflow-hidden",
                    },
                    header: {
                        className:
                        "bg-[#8ee2d5] text-[#0f2235] border-b border-white/10 px-6 py-4",
                    },
                    headerTitle: {
                        className: "font-bold text-lg",
                    },
                    headerIcons: {
                        className: "text-[#0f2235]/60 hover:text-white",
                    },
                    content: {
                        className: "bg-[#FFFFFF]",
                    },
                }}
                header="Reporte Completo"
                style={{ width: "40vw"}}
                
                >
                    {parteSeleccionado && (
                        <div className="space-y-6 text-sm">
                            <div className="bg-[#0f2235] px-6 py-6">
                                <p className="text-[#FFCC27] text-xs font-bold uppercase mb-2">Datos Generales</p>
                                <p className="text-[#8ee2d5]/50 text-xs">Nombre</p>
                                <p className="font-semibold mb-1">{parteSeleccionado.nombre}</p>
                                <p className="text-[#8ee2d5]/50 text-xs">CAT</p>
                                <p className="font-semibold mb-1">{parteSeleccionado.cat}</p>
                                <p className="text-[#8ee2d5]/50 text-xs">BASE</p>
                                <p className="font-semibold mb-1">{parteSeleccionado.baseDespliegue}</p>
                                <p className="text-[#8ee2d5]/50 text-xs">Lugar</p>
                                <p className="font-semibold mb-1">{parteSeleccionado.lugarDespliegue}</p>
                                <p className="text-[#8ee2d5]/50 text-xs">Turno</p>
                                <p className="font-semibold mb-1">{parteSeleccionado.turnoDespliegue}</p>
                                <p className="text-[#8ee2d5]/50 text-xs">Supervisor</p>
                                <p className="font-semibold mb-1">{parteSeleccionado.supervisor}</p>

                            </div>
                                <div className="px-6 py-6">
                                    <p className="text-[#FFCC27] text-xs font-bold uppercase mb-2">Dotacion</p>
                                    <div className="text-sm text-[#0f2235]/80 space-y-1 font-bold">
                                        <p className="text-black/50 text-xs">Motorizados</p>
                                        <p className="font-semibold">{parteSeleccionado.motorizados}</p>
                                        <p className="text-black/50 text-xs">Infantes</p>
                                        <p className="font-semibold">{parteSeleccionado.infantes}</p>
                                        <p className="text-black/50 text-xs">Conduccion</p>
                                        <p className="font-semibold">{parteSeleccionado.conduccion}</p>
                                        <p className="text-black/50 text-xs">Ausentes</p>
                                        <p className="font-semibold">{parteSeleccionado.ausentes}</p>
                                    </div>
                                </div>

                            <div className="px-6 py-6 bg-[#FFFFFF]">
                                <p className="text-[#0f2235] text-xs font-bold uppercase mb-2">Servicios</p>
                                {parteSeleccionado.servicios.map((s,i) => (
                                    <div key={i} className="border-border-white/10 rounded-xl p-3 space-y-2">
                                        <p className="text-[#8ee2d5] font-semibold bg-[#0f2235]">{s.tipo}</p>
                                        <p className="text-[#0f2235] text-xs">Nombre</p>
                                        <p className="font-semibold text-[#0f2235]">{s.nombre}</p>
                                        <p className="text-[#0f2235] text-xs">Direccion</p>
                                        <p className="font-semibold text-[#0f2235]">{s.direccion}</p>
                                                                                <p className="text-[#0f2235] text-xs">Agentes</p>
                                                                                {Array.isArray(s.agentes) ? (
                                                                                    <p className="font-semibold text-[#0f2235]">
                                                                                        {s.agentes.map((a, idx) => (
                                                                                            <span key={idx}>{a.nombre} ({a.rol}){idx < s.agentes.length - 1 ? ', ' : ''}</span>
                                                                                        ))}
                                                                                    </p>
                                                                                ) : s.agentes ? (
                                                                                    <p className="font-semibold text-[#0f2235]">{s.agentes}</p>
                                                                                ) : null}
                                        {s.puntos.map((p,j) => (
                                            <div key={j} className="ml-4 border-l border-white/10 pl-3 mt-2e">
                                                <p className="text-white/60 text-xs uppercase">{p.tipo}</p>
                                                <p className="text-[#0f2235] text-xs">Nombre</p>
                                                <p className="font-semibold text-[#0f2235]">{p.nombre}</p>
                                                <p className="text-[#0f2235] text-xs">Direccion</p>
                                                <p className="font-semibold text-[#0f2235]">{p.direccion}</p>
                                                                                                <p className="text-[#0f2235] text-xs">Agentes</p>
                                                                                                {Array.isArray(p.agentes) ? (
                                                                                                    <p className="font-semibold text-[#0f2235]">
                                                                                                        {p.agentes.map((a, idx) => (
                                                                                                            <span key={idx}>{a.nombre} ({a.rol}){idx < p.agentes.length - 1 ? ', ' : ''}</span>
                                                                                                        ))}
                                                                                                    </p>
                                                                                                ) : p.agentes ? (
                                                                                                    <p className="font-semibold text-[#0f2235]">{p.agentes}</p>
                                                                                                ) : null}
                                            </div>
                                        ))}

                                    </div>
                                ))}
                            </div>

                            <div className="px-6 py-6 bg-[#8ee2d5]">
                                <p className="text-[#0f2235] text-xs font-bold uppercase mb-2">Ausentes</p>
                                {parteSeleccionado.listaAusentes.map((a,i) => (
                                    <p key={i} className="text-[#0f2235]">•  {a.nombre} - {a.motivo} {a.motivoPersonalizado && `(${a.motivoPersonalizado})` }</p>
                                ))}

                            </div>
                            <div className="px-6 py-6 bg-[#8ee2d5] text-[#0f2235]">
                                <p className="text-[#0f2235] text-xs font-bold uppercase mb-2">Observaciones</p>
                                {parteSeleccionado.observaciones || "Sin Observaciones"}
                            </div>
                        </div>
                    )}
            </Dialog>

        </div>


                                    </>
    )

}

export default Reportes