import React, { useContext, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// CONTEXTO
import { AdminProvider, AdminContext } from "./context/AdminContext";

// LAYOUT
import Header from "./components/layout/Header";

// VISTAS
import Login from "./views/Login";
import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";
import Dashboard from "./views/Dashboard";
import Footer from "./components/layout/Footer";
// RUTAS PROTEGIDAS
const RutasProtegidas = () => {
  const { admin } = useContext(AdminContext);

  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/clientes" element={<ListaClientes />} />

        <Route path="/clientes/nuevo" element={<div>Alta de Cliente</div>} />

        <Route path="/clientes/:id" element={<DetalleCliente />} />

        <Route path="*" element={<div>Error 404 Página no encontrada</div>} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/clientes/:id" element={<DetalleCliente />} />
        </Routes>
      )}
    </>
  );
};

// APP

const App = () => {
  const [modoOscuro, setModoOscuro] = useState(false);

  const cambiarTema = () => {
    document.body.classList.toggle("modo-oscuro");

    setModoOscuro((prev) => !prev);
  };

  const Contenido = ({ modoOscuro, cambiarTema }) => {
    const { admin } = useContext(AdminContext);

    return (
      <>
        {admin && <Header modoOscuro={modoOscuro} cambiarTema={cambiarTema} />}

        <Routes>
 
          <Route
            path="/login"
            element={admin ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          <Route path="/*" element={<RutasProtegidas />} />
        </Routes>

        {admin && <Footer />}
      </>
    );
  };

  return (
    <AdminProvider>
      <BrowserRouter>
        <Contenido modoOscuro={modoOscuro} cambiarTema={cambiarTema} />
      </BrowserRouter>
    </AdminProvider>
  );
};

export default App;
