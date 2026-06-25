import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Vistas
import ListaClientes from "./views/ListaClientes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Inicio */}
        <Route path="/" element={<Navigate to="/clientes" />} />

        {/* Login — Módulo A */}
        <Route path="/login" element={<div>Inicio de sesión (Módulo A)</div>} />

        {/* Clientes — Módulo B + C */}
        <Route path="/clientes" element={<ListaClientes />} />

        {/* Alta Cliente — Módulo C */}
        <Route path="/clientes/nuevo" element={<div>Alta de Cliente</div>} />

        {/* Detalle Cliente — Módulo D */}
        <Route path="/clientes/:id" element={<div>Detalle Cliente</div>} />

        {/* Error */}
        <Route path="*" element={<div>Error 404 Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
