import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

  const [admin, setAdmin] = useState(() => {
    const adminGuardado = localStorage.getItem("admin");

    if (adminGuardado) {
      return JSON.parse(adminGuardado);
    }

    return null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    } else {
      localStorage.removeItem("admin");
    }
  }, [admin]);

  const iniciarSesion = (datosAdministrador) => {
    setAdmin(datosAdministrador);
  };

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