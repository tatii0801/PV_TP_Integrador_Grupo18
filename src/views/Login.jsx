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
} from "@mui/material";

import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const { iniciarSesion } = useContext(AdminContext);

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");

  const [sector, setSector] = useState("Soporte");

  const ingresar = () => {
    if (!nombre.trim()) return;

    iniciarSesion({
      nombre,
      sector,
    });

    navigate("/clientes");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Inicio de Sesión
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Nombre del Administrador"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            fullWidth
          >
            <MenuItem value="Soporte">
              Soporte
            </MenuItem>

            <MenuItem value="Gerencia">
              Gerencia
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            size="large"
            onClick={ingresar}
          >
            Ingresar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;