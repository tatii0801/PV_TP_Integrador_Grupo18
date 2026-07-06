import React, { useState, useEffect, useMemo } from "react";
import "../css/style.css";
import FormularioAltaCliente from "../components/common/FormAltaCliente";

import { useNavigate, useLocation } from "react-router-dom";

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
  IconButton,
  Tooltip,
  Avatar,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const ListaClientes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [abrirFormulario, setAbrirFormulario] = useState(false);

  useEffect(() => {
    obtenerClientes();
  }, []);
  const actualizarListaClientes = async () => {
    await obtenerClientes();
    setAbrirFormulario(false);
  };
  const obtenerClientes = async () => {
    try {
      setLoading(true);
      setError(null);

      const respuesta = await fetch("https://fakestoreapi.com/users");

      if (!respuesta.ok) {
        throw new Error(`Error del servidor: ${respuesta.status}`);
      }

      const datos = await respuesta.json();

      const clientesLocales =
        JSON.parse(localStorage.getItem("clientesLocales")) || [];

      // Unificar clientes evitando duplicados por ID
      const mapaClientes = new Map();

      [...datos, ...clientesLocales].forEach((cliente) => {
        mapaClientes.set(Number(cliente.id), cliente);
      });

      const todosLosClientes = [...mapaClientes.values()];

      const eliminados =
        JSON.parse(localStorage.getItem("clientesEliminados")) || [];

      const clientesVisibles = todosLosClientes.filter(
        (cliente) => !eliminados.includes(Number(cliente.id)),
      );

      setClientes(clientesVisibles);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los clientes.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const actualizar = () => {
      if (localStorage.getItem("actualizarClientes")) {
        localStorage.removeItem("actualizarClientes");
        obtenerClientes();
      }
    };

    actualizar();
  }, [location]);

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
        <Alert severity="error">{error}</Alert>
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
        <DialogTitle>Alta de Cliente</DialogTitle>

        <DialogContent>
          <FormularioAltaCliente
            onClienteCreado={actualizarListaClientes}
            cerrarFormulario={() => setAbrirFormulario(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="buscador-card">
        <div className="buscador-titulo">Buscar Cliente</div>

        <TextField
          fullWidth
          label="Buscar por apellido o ciudad"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="buscador-titulo">Lista de Clientes</div>

      <Grid container spacing={3} justifyContent="center">
        {clientesFiltrados.map((cliente) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={cliente.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card className="cliente-card">
              <CardContent className="cliente-card-content">
                <Box className="cliente-header">
                  <Avatar className="cliente-avatar">
                    {cliente.name?.firstname?.charAt(0).toUpperCase()}
                  </Avatar>

                  <Box className="cliente-header-info">
                    <Typography className="cliente-nombre">
                      {cliente.name?.firstname} {cliente.name?.lastname}
                    </Typography>

                    <Chip
                      label={cliente.address?.city}
                      size="small"
                      className="cliente-chip"
                    />
                  </Box>
                </Box>

                <Box className="cliente-linea" />

                <Box className="cliente-info">
                  <Box className="cliente-item">
                    <EmailIcon />
                    <Typography noWrap>{cliente.email}</Typography>
                  </Box>

                  <Box className="cliente-item">
                    <PhoneIcon />
                    <Typography>{cliente.phone}</Typography>
                  </Box>

                  <Box className="cliente-item">
                    <LocationOnIcon />
                    <Typography>{cliente.address?.city}</Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FormatListBulletedIcon />}
                  className="cliente-boton formulario-boton"
                  onClick={() =>
                    navigate(`/clientes/${cliente.id}`, {
                      state: {
                        backgroundLocation: location,
                      },
                    })
                  }
                >
                 
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListaClientes;
