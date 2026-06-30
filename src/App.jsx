import React, { useContext, useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//CONTEXTO
import { AdminProvider, AdminContext } from "./context/AdminContext";

//LAYOUT
import Header from "./components/layout/Header";

//VISTAS
import Login from "./views/Login";

import ListaClientes from "./views/ListaClientes";

//RUTAS PROTEGIDAS
const RutasProtegidas = () => {
  const { admin } = useContext(AdminContext);

  // Redirigir si no inició sesión

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
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
  );
};

//APP

const App = () => {
  // Estado modo oscuro

  const [modoOscuro, setModoOscuro] = useState(false);

  //CAMBIAR TEMA

  const cambiarTema = () => {
    document.body.classList.toggle("modo-oscuro");

    setModoOscuro((prev) => !prev);
  };

  //RENDER

  return (
    <AdminProvider>
      <BrowserRouter>
        {/* HEADER */}

        <Header modoOscuro={modoOscuro} cambiarTema={cambiarTema} />

        {/* RUTAS */}

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={<RutasProtegidas />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
};

export default App;
