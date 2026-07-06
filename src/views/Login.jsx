import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Alert,
  Avatar,
} from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const { iniciarSesion } = useContext(AdminContext);

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("");

  const [errores, setErrores] = useState({});

  const formatearNombre = (texto) => {
    return texto.toLowerCase().replace(/\b\w/g, (letra) => letra.toUpperCase());
  };

  const validar = () => {
    let nuevo = {};

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      nuevo.nombre = "Ingrese su nombre";
    } else if (nombreLimpio.length < 3) {
      nuevo.nombre = "Debe tener al menos 3 caracteres";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombreLimpio)) {
      nuevo.nombre = "Solo se permiten letras";
    }

    if (!sector) {
      nuevo.sector = "Seleccione un sector";
    }

    setErrores(nuevo);

    return Object.keys(nuevo).length === 0;
  };

  const ingresar = () => {
    if (!validar()) return;

    iniciarSesion({
      nombre,
      sector,
    });

    navigate("/clientes");
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Paper className="login-card">
        <Avatar className="login-avatar">
          <AdminPanelSettingsIcon fontSize="large" />
        </Avatar>

        <Typography className="login-titulo">Inicio de Sesión</Typography>

        <Typography className="login-subtitulo">
          Sistema de Administración de Clientes
        </Typography>

        <Box className="login-form">
          <TextField
            label="Nombre del Administrador"
            value={nombre}
            onChange={(e) => setNombre(formatearNombre(e.target.value))}
            error={Boolean(errores.nombre)}
            helperText={errores.nombre}
            fullWidth
          />

          <TextField
            select
            label="Sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            error={Boolean(errores.sector)}
            helperText={errores.sector}
            fullWidth
          >
            <MenuItem value="Soporte">Soporte</MenuItem>
            <MenuItem value="Gerencia">Gerencia</MenuItem>
          </TextField>

          <Button
            variant="contained"
            className="login-boton"
            onClick={ingresar}
          >
            Ingresar al Sistema
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
