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
} from "@mui/material";

import { AdminContext } from "../../context/AdminContext";
import Nav from "./Nav";

const Header = ({ modoOscuro, cambiarTema }) => {
  const { admin, cerrarSesion } =
    useContext(AdminContext);

  const navigate = useNavigate();
  const location = useLocation();

  const salir = () => {
    cerrarSesion();
    navigate("/login");
  };

  let tituloSeccion = "Dashboard";

  if (
    location.pathname === "/" ||
    location.pathname === "/dashboard"
  ) {
    tituloSeccion = "Dashboard";
  } else if (
    location.pathname === "/clientes"
  ) {
    tituloSeccion = "Clientes";
  } else if (
    location.pathname.startsWith("/clientes/")
  ) {
    tituloSeccion = "Detalle del Cliente";
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {/* TITULO + SUBTITULO */}
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h6">
            Panel de Control de Clientes
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.85,
            }}
          >
            {tituloSeccion}
          </Typography>
        </Box>

        {/* PANEL DERECHO */}
        <Box
          display="flex"
          alignItems="center"
          gap={3}
        >
          <FormControlLabel
            sx={{
              m: 0,
              background: modoOscuro
                ? "#1f1f1f"
                : "#ffffff",
              borderRadius: "30px",
              padding: "4px 10px",
              boxShadow:
                "0 6px 20px rgba(0,0,0,.15)",
            }}
            control={
              <Switch
                checked={modoOscuro}
                onChange={cambiarTema}
              />
            }
            label={modoOscuro ? "🌙" : "☀️"}
          />

          <Box textAlign="right">
            <Typography>
              {admin.nombre}
            </Typography>

            <Typography variant="body2">
              {admin.sector}
            </Typography>
          </Box>

          <Button
            color="inherit"
            variant="outlined"
            onClick={salir}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>

      <Nav />
    </AppBar>
  );
};

export default Header;