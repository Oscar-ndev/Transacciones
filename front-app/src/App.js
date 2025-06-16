import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import Listado from "./transacciones/Listado";
import Agregar from "./transacciones/Agregar";
import Estatus from "./transacciones/Estatus";
import Buscar from "./transacciones/Buscar";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion/>
        <Routes>
          <Route exact path="/" element={<Agregar/>}/>
          <Route exact path="/transacciones" element={<Listado/>}/>
          <Route exact path="/estatus" element={<Estatus/>}/>
          <Route exact path="/referencia" element={<Buscar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
