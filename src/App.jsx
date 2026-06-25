import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ListaClientes from "./views/ListaClientes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Inicio */}
        <Route path="/" element={<Navigate to="/clientes" replace />} />

        {/* Login */}
        <Route path="/login" element={<div>Inicio de sesión (Módulo A)</div>} />

        {/* Clientes */}
        <Route path="/clientes" element={<ListaClientes />} />

        {/* Alta */}
        <Route path="/clientes/nuevo" element={<div>Alta de Cliente</div>} />

        {/* Detalle */}
        <Route path="/clientes/:id" element={<div>Detalle Cliente</div>} />

        {/* Error */}
        <Route path="*" element={<div>Error 404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
