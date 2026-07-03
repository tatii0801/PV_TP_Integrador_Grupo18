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

  const obtenerClientes = async () => {
    try {
      setLoading(true);
      setError(null);

      const respuesta = await fetch("https://fakestoreapi.com/users");

      if (!respuesta.ok) {
        throw new Error(`Error del servidor: ${respuesta.status}`);
      }

      const datos = await respuesta.json();

      const eliminados =
        JSON.parse(localStorage.getItem("clientesEliminados")) || [];

      const clientesVisibles = datos.filter(
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
            setClientes={(actualizarClientes) => {
              setClientes((clientesActuales) => {
                const nuevosClientes =
                  typeof actualizarClientes === "function"
                    ? actualizarClientes(clientesActuales)
                    : actualizarClientes;

                const eliminados =
                  JSON.parse(localStorage.getItem("clientesEliminados")) || [];

                return nuevosClientes.filter(
                  (cliente) => !eliminados.includes(Number(cliente.id)),
                );
              });
            }}
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

      <Grid container spacing={3}>
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
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: 320,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    height: 60,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {cliente.name?.firstname} {cliente.name?.lastname}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" gap={1}>
                    <EmailIcon fontSize="small" />
                    <Typography variant="body2" noWrap>
                      {cliente.email}
                    </Typography>
                  </Box>

                  <Box display="flex" gap={1}>
                    <PhoneIcon fontSize="small" />
                    <Typography variant="body2" noWrap>
                      {cliente.phone}
                    </Typography>
                  </Box>

                  <Box display="flex" gap={1}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2" noWrap>
                      {cliente.address?.city}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                  }}
                >
                  <Tooltip title="Ver ficha completa">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/clientes/${cliente.id}`, {
                          state: {
                            backgroundLocation: location,
                          },
                        })
                      }
                    >
                      <FormatListBulletedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListaClientes;
