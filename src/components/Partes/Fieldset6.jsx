import { useNavigate, useOutletContext } from "react-router-dom";
import "./Fieldset6.css";
import { useState } from "react";
import Modal from "../Modal";
import FormatearMensaje from "./Mensaje";
import serviceReportes from "../../services/serviceReportes";

function Fieldset6() {
  const navigate = useNavigate();
  const { formData, updateField, vaciarFormulario } = useOutletContext();
  const [modal, setModal] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "exito",
  });


  function cerrarModal() {
    setModal({ ...modal, mostrar: false });
  }



  const enviarParte = async () => {
    try{
      const mensaje = FormatearMensaje(formData);
      console.log(mensaje);
      await navigator.clipboard.writeText(mensaje);

        const { totalAgentes, totalPresentes, total, ...parteFinal} = formData

      await serviceReportes.guardarParte(parteFinal)
      console.log(parteFinal)

      setModal({
        mostrar: true,
        mensaje: "Parte Guardado Correctamente ✅",
        tipo: "exito"
      })
      vaciarFormulario()
      navigate("/")
    }catch(error) {
      console.error(error)

      console.log(formData)
      setModal({
        mostrar: true,
        mensaje: `Error: ${error.response.data.error} revisá los campos e intentalo nuevamente`,
        tipo: "error"
      })
    }
  }


  return (
    <div className="step-content fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-[#FFCB27] text-[#153244]">
            6
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#153244]">Observaciones</h2>
            <p className="text-gray-600">Informacion adicional (opcional)</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#153244]">
              Observaciones
            </label>
            <textarea
              rows="4"
              className="input-field w-full px-4 py-3 rounded-xl focus:outline-none resize-none boder border-2 border-[#153244] text-black"
              placeholder="Agregar cualquier observación relevante..."
              value={formData.observaciones}
              onChange={(e) => updateField("observaciones", e.target.value)}
            ></textarea>
          </div>

          <div className="border border-2 border-[#153244] rounded-xl p-2">
            <p className="text-black font-semibold">
              Controlá los datos ingresados en la vista previa antes de
              copiar. Podés volver a cualquier segmento con la barra de
              navegacion de arriba
            </p>
          </div>
        </div>
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
          onClick={enviarParte}
          className="flex-1 btn-primary py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center bg-[#FFCC27] text-[#153244]"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copiar al portapapeles
        </button>
        <Modal
          mostrar={modal.mostrar}
          mensaje={modal.mensaje}
          tipo={modal.tipo}
          onClose={cerrarModal}
        />
      </div>
        <button
          type="button"
          onClick={() => {
            vaciarFormulario()
            navigate('/')
          }}
          className="w-full mt-2 btn-primary py-4 rounded-xl font-bold shadow-lg bg-[#edebe6] text-[#153244] hover:shadow-xl transition-all"
        >
          Comenzar un nuevo parte 🔁
        </button>
    </div>
  );
}

export default Fieldset6;
