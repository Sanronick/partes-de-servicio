import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Inicio from "./components/Inicio";
import Formulario from "./components/Formulario";
import Fieldset1 from "./components/Partes/Fieldset1";
import Fieldset2 from "./components/Partes/Fieldset2";
import Fieldset3 from "./components/Partes/Fieldset3";
import Fieldset4 from "./components/Partes/Fieldset4";
import Fieldset5 from "./components/Partes/Fieldset5";
import Fieldset6 from "./components/Partes/Fieldset6";
import escudo from '../public/img/escudo.png'
import logoBA from '../public/img/LogoBA-removebg-preview.png'
import Reportes from "./components/Reportes";

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="bg-white/5 backdrop-blur-sm text-white py-4 px-6 shadow-lg flex-shrink-0 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={escudo}
              alt="Logo institucional"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold">
                Partes de Servicio
              </h1>
              <p className="text-white/70 text-sm hidden sm:block">
                Dirección General Cuerpo de Agentes de Tránsito
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <HashRouter>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="formulario" element={<Formulario />}>
              <Route index element={<Fieldset1 />}/>
              <Route path="fieldset1" element={<Fieldset1 />} />
              <Route path="fieldset2" element={<Fieldset2 />} />
              <Route path="fieldset3" element={<Fieldset3 />} />
              <Route path="fieldset4" element={<Fieldset4 />} />
              <Route path="fieldset5" element={<Fieldset5 />} />
              <Route path="fieldset6" element={<Fieldset6 />} />
            </Route>
            <Route path="reportes" element={<Reportes />}/>
            <Route path="*" element={<Inicio />} />
          </Routes>
        </HashRouter>
      </main>
      <footer className="bg-white/5 backdrop-blur-sm py-4 px-6 shadow-lg flex-shrink-0 border-b border-white/10">
        <img src={logoBA} alt="Logo GCABA"/>
      </footer>
    </div>
  );
}

export default App;


