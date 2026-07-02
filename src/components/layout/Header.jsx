import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";

import { AdminContext } from "../../context/AdminContext";

const Header = ({ modoOscuro, cambiarTema }) => {
  const { admin, cerrarSesion } = useContext(AdminContext);

  const navigate = useNavigate();

  //================ CERRAR SESION ================

  const salir = () => {
    cerrarSesion();

    navigate("/login");
  };

  //================ RENDER ================

  return (
    <AppBar position="static">
      <Toolbar>
        {/*================ TITULO =================*/}

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
          }}
        >
          Panel de Control de Clientes
        </Typography>

        {/*================ PANEL DERECHO =================*/}

        <Box display="flex" alignItems="center" gap={3}>
          {/*================ BOTON MODO OSCURO =================*/}

          <FormControlLabel
            sx={{
              m: 0,

              background: modoOscuro ? "#1f1f1f" : "#ffffff",

              borderRadius: "30px",

              padding: "4px 10px",

              boxShadow: "0 6px 20px rgba(0,0,0,.15)",
            }}
            control={<Switch checked={modoOscuro} onChange={cambiarTema} />}
            label={modoOscuro ? "🌙" : "☀️"}
          />

          {/*ADMIN*/}

          <Typography>{admin.nombre}</Typography>

          {/*SECTOR*/}

          <Typography>{admin.sector}</Typography>

          {/*BOTON SALIR*/}

          <Button color="inherit" variant="outlined" onClick={salir}>
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
