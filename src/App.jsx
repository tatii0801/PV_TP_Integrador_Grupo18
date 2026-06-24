import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListaClientes from './views/ListaClientes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" replace />} />
        
        <Route path="/login" element={<div>Inicio de sesion (Módulo A)</div>} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/clientes/nuevo" element={<div>Alta de Cliente (Módulo C)</div>} />
        <Route path="/clientes/:id" element={<div>Detalle de Cliente (Módulo D)</div>} />
        
        <Route path="*" element={<div>Error 404 - Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
