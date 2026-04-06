import { useEffect, useState } from "react"
import serviceReportes from "../services/serviceReportes"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Dialog } from "primereact/dialog"
import { Badge, Info, Seccion } from "./helpers"
import { FiEye } from "react-icons/fi"



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
        <h2 className="text-lg text-white font-bold m-4">Partes de Servicio</h2>
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

            {/* Modal Reporte Completo*/}
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
                        "bg-[#0f2235] text-[#FFCC27] border-b border-white/10 px-6 py-4",
                    },
                    headerTitle: {
                        className: "font-bold text-lg",
                    },
                    headerIcons: {
                        className: "text-white/60 hover:text-white",
                    },
                    content: {
                        className: "bg-[#0f2235] px-6 py-6",
                    },
                }}
                header="Reporte Completo"
                style={{ width: "60vw"}}
                
                >
                    {parteSeleccionado && (
                        <div className="space-y-6">
                            <div className="text-[#FFCC27] font-bold text-lg">
                                Reporte de {parteSeleccionado.nombre}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <Info label="CAT" value={parteSeleccionado.cat} />
                                <Info label="Lugar" value={parteSeleccionado.lugarDespliegue} />
                                <Info label="Turno" value={parteSeleccionado.turnoDespliegue} />
                                <Info label="Supervisor" value={parteSeleccionado.supervisor} />
                                <Info label="Total Presentes" value={parteSeleccionado.totalPresentes} />
                            </div>
                            <Seccion titulo="Servicios">
                                {parteSeleccionado.servicios.map((s, i) => (
                                    <Badge key={i} text={s.tipo} />
                                ))}
                                </Seccion>

                                <Seccion titulo="Ausentes">
                                {parteSeleccionado.listaAusentes.length === 0
                                    ? "Sin ausentes"
                                    : parteSeleccionado.listaAusentes.map((a, i) => (
                                        <p key={i}>• {a.nombre} — {a.motivo}</p>
                                    ))}
                                </Seccion>

                                <Seccion titulo="Observaciones">
                                {parteSeleccionado.observaciones || "Sin observaciones"}
                                </Seccion>
                        </div>
                    )}
            </Dialog>

        </div>


                                    </>
    )

}

export default Reportes