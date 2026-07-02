import React, { useState, useEffect, useMemo } from "react";
import "../css/style.css";
import FormularioAltaCliente from "../components/common/FormAltaCliente";
import {
  TextField,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [abrirFormulario, setAbrirFormulario] = useState(false);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setLoading(true);
        setError(null);
        const respuesta = await fetch("https://fakestoreapi.com/users");

        if (!respuesta.ok) {
          throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        const contentType = respuesta.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La API no devolvió un JSON válido.");
        }

        const datos = await respuesta.json();
        setClientes(datos);
      } catch (err) {
        setError(err.message || "No se pudieron cargar los datos de los clientes.");
      } finally {
        setLoading(false);
      }
    };

    obtenerClientes();
  }, []);

  const clientesFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();
    if (!texto) return clientes;

    return clientes.filter((cliente) => {
      const apellido = cliente.name?.lastname?.toLowerCase() || "";
      const ciudad = cliente.address?.city?.toLowerCase() || "";
      return apellido.includes(texto) || ciudad.includes(texto);
    });
  }, [clientes, busqueda]);

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

      <div className="formulario-card">
        <div className="formulario-titulo">
          <h2>Agregar Cliente</h2>
          <p>Registrar nuevos clientes en la base de datos</p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="formulario-boton"
          onClick={() => setAbrirFormulario(true)}
        >
          Nuevo Cliente
        </Button>
      </div>

      <Dialog
        open={abrirFormulario}
        onClose={() => setAbrirFormulario(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Alta de Cliente
          <div className="modal-subtitulo">
            Complete los datos para registrar un nuevo cliente
          </div>
        </DialogTitle>
        <DialogContent>
          <FormularioAltaCliente
            setClientes={setClientes}
            cerrarFormulario={() => setAbrirFormulario(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="buscador-card">
        <div className="buscador-titulo">Buscar Cliente</div>
        <TextField
          fullWidth
          label="Buscar por apellido o ciudad"
          placeholder="Ej: Pérez o San Salvador"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="buscador-titulo">Lista de Clientes</div>

      <Grid container spacing={3}>
        {clientesFiltrados.length > 0 ? (
          clientesFiltrados.map((cliente) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cliente.id}>
              <Card
                className="cliente-card"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  minHeight: 220,
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      mb: 2,
                    }}
                  >
                    {cliente.name?.firstname} {cliente.name?.lastname}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      flexGrow: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      <Typography variant="body2" noWrap>
                        {cliente.email}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneIcon fontSize="small" />
                      <Typography variant="body2">{cliente.phone}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {cliente.address?.city}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card className="cliente-card">
              <CardContent>
                <Typography align="center">
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
