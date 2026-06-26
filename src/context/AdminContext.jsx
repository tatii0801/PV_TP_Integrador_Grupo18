import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const AdminContext = createContext();

// Proveedor del contexto
export const AdminProvider = ({ children }) => {

  // Estado inicial: intenta leer del localStorage.
  // Si no existe información, comienza en null.
  const [admin, setAdmin] = useState(() => {
    const adminGuardado = localStorage.getItem("admin");

    if (adminGuardado) {
      return JSON.parse(adminGuardado);
    }

    return null;
  });

  // Guardar automáticamente cuando cambie el administrador
  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    } else {
      localStorage.removeItem("admin");
    }
  }, [admin]);

  // Iniciar sesión
  const iniciarSesion = (datosAdministrador) => {
    setAdmin(datosAdministrador);
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};