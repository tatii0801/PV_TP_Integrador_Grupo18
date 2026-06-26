import React, { useContext } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Contexto
import { AdminProvider, AdminContext } from "./context/AdminContext";

// Layout
import Header from "./components/layout/Header";

// Vistas
import Login from "./views/Login";
import ListaClientes from "./views/ListaClientes";

const RutasProtegidas = () => {
  const { admin } = useContext(AdminContext);

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />

      <Routes>
        {/* Inicio */}
        <Route path="/" element={<Navigate to="/clientes" replace />} />

        {/* Clientes */}
        <Route path="/clientes" element={<ListaClientes />} />

        {/* Alta Cliente */}
        <Route path="/clientes/nuevo" element={<div>Alta de Cliente</div>} />

        {/* Detalle Cliente */}
        <Route path="/clientes/:id" element={<div>Detalle Cliente</div>} />

        {/* Error */}
        <Route path="*" element={<div>Error 404 Página no encontrada</div>} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/*"
            element={<RutasProtegidas />}
          />

        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
};

export default App;