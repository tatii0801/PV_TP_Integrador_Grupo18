import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Switch,
  FormControlLabel,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";

import { AdminContext } from "../../context/AdminContext";
import Nav from "./Nav";

const Header = ({ modoOscuro, cambiarTema }) => {
  const { admin, cerrarSesion } = useContext(AdminContext);

  const navigate = useNavigate();
  const location = useLocation();

  const salir = () => {
    cerrarSesion();
    navigate("/login");
  };

  let tituloSeccion = "Dashboard";

  if (location.pathname === "/" || location.pathname === "/dashboard") {
    tituloSeccion = "Dashboard";
  } else if (location.pathname === "/clientes") {
    tituloSeccion = "Clientes";
  } else if (location.pathname.startsWith("/clientes/")) {
    tituloSeccion = "Detalle del Cliente";
  }

  return (
    <AppBar position="sticky" elevation={0} className="header">
      <Toolbar className="header-toolbar">
        <Box className="header-titulo">
          <Typography variant="h5">📊 Panel de Control de Clientes</Typography>

          <Typography variant="body2">
            Sistema de Gestión de Clientes • {tituloSeccion}
          </Typography>
        </Box>

        <Box className="header-derecha">
          <FormControlLabel
            className="header-switch"
            control={<Switch checked={modoOscuro} onChange={cambiarTema} />}
            label={modoOscuro ? "🌙" : "☀️"}
          />

          <Paper elevation={0} className="header-usuario">
            <Avatar className="header-avatar">
              {admin.nombre.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography className="header-nombre">{admin.nombre}</Typography>

              <Chip
                size="small"
                label={admin.sector}
                color={admin.sector === "Gerencia" ? "warning" : "success"}
              />
            </Box>
          </Paper>

          <Button
            variant="contained"
            color="error"
            className="header-salir"
            onClick={salir}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>

      <Nav />
    </AppBar>
  );
};

export default Header;
