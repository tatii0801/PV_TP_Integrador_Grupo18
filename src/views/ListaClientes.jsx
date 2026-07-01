import React, { useState, useEffect } from "react";
import "../css/style.css";

import { 
  TextField, CircularProgress, Alert, Typography, Box, Container, Grid, Card, CardContent
} from '@mui/material';

import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setLoading(true);
        setError(null);

        const respuesta = await fetch("https://fakestoreapi.com/users");
        
        if (!respuesta.ok) {
          throw new Error(`Error de servidor: Código ${respuesta.status}`);
        }

        const contentType = respuesta.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La API no devolvió un formato JSON válido.");
        }

        const datos = await respuesta.json();
        setClientes(datos);
      } catch (err) {
        setError("No se pudieron cargar los datos de los clientes. Compruebe su conexión a internet.");
      } finally {
        setLoading(false);
      }
    };
    obtenerClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = busqueda.toLowerCase();
    const apellido = cliente.name?.lastname?.toLowerCase() || "";
    const ciudad = cliente.address?.city?.toLowerCase() || "";
    return apellido.includes(texto) || ciudad.includes(texto);
  });

  if (loading) {
    return (
      <Box className="cargando">
        <CircularProgress size={60} />
        <Typography className="cargando-texto">Cargando clientes...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" className="alerta-error">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="panel-clientes">
      <div className="panel-titulo">
        <h1>Panel de Clientes</h1>
        <p>Administración y gestión de clientes en tiempo real</p>
      </div>

      <div className="buscador-card">
        <div className="buscador-titulo">Buscar Cliente</div>
        <TextField
          fullWidth
          label="Buscar por apellido o ciudad"
          placeholder="Ej: Perez o San Salvador"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="buscador-titulo">Lista de Clientes</div>

      <Grid container spacing={3}>
        {clientesFiltrados.map((cliente) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={cliente.reactKey || cliente.id}>
            <Card className="cliente-card" sx={{ display: "flex", flexDirection: "column", height: "100%", minHeight: "220px" }}>
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  className="cliente-nombre"
                  sx={{ textTransform: "capitalize", fontWeight: "bold", mb: 2 }}
                >
                  {cliente.name?.firstname} {cliente.name?.lastname}
                </Typography>

                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <EmailIcon sx={{ color: "action.active", fontSize: 20 }} />
                    <Typography className="cliente-dato" variant="body2" noWrap>{cliente.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <PhoneIcon sx={{ color: "action.active", fontSize: 20 }} />
                    <Typography className="cliente-dato" variant="body2">{cliente.phone}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <LocationOnIcon sx={{ color: "action.active", fontSize: 20 }} />
                    <Typography className="cliente-dato" variant="body2" sx={{ textTransform: "capitalize" }}>
                      {cliente.address?.city}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {clientesFiltrados.length === 0 && (
          <Grid item xs={12}>
            <Card className="cliente-card">
              <CardContent>
                <Typography align="center" className="tabla-vacia">
                  No se encontraron clientes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ListaClientes;
