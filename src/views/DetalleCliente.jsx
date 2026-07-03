import React, { useEffect, useState, useContext } from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  Box,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

import { AdminContext } from "../context/AdminContext";

const DetalleCliente = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { admin } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [mensaje, setMensaje] = useState(false);

  const [confirmarEliminar, setConfirmarEliminar] = useState(false);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);

        if (!respuesta.ok) {
          throw new Error();
        }

        const datos = await respuesta.json();

        setCliente(datos);
      } catch {
        setError("No se pudo cargar el cliente.");
      } finally {
        setLoading(false);
      }
    };

    obtenerCliente();
  }, [id]);

  const eliminarCliente = async () => {
    try {
      const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error();
      }

      const eliminados =
        JSON.parse(localStorage.getItem("clientesEliminados")) || [];

      if (!eliminados.includes(Number(id))) {
        eliminados.push(Number(id));
      }

      localStorage.setItem("clientesEliminados", JSON.stringify(eliminados));

      setConfirmarEliminar(false);

      setMensaje(true);

      localStorage.setItem("actualizarClientes", "true");

      setTimeout(() => {
        navigate("/clientes");
      }, 1000);
    } catch {
      alert("No se pudo eliminar el cliente.");
    }
  };

  if (loading) {
    return (
      <Box className="cargando">
        <CircularProgress />
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
    <>
      <Dialog
        open={true}
        onClose={() => navigate("/clientes")}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 3 }}>
          <Card elevation={0}>
            <CardContent>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={() => navigate("/clientes")}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Typography variant="h4" gutterBottom>
                Ficha Completa del Cliente
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Typography>
                <strong>ID:</strong> {cliente.id}
              </Typography>

              <Typography>
                <strong>Nombre:</strong> {cliente.name?.firstname}{" "}
                {cliente.name?.lastname}
              </Typography>

              <Typography>
                <strong>Email:</strong> {cliente.email}
              </Typography>

              <Typography>
                <strong>Teléfono:</strong> {cliente.phone}
              </Typography>

              <Typography>
                <strong>Usuario:</strong> {cliente.username}
              </Typography>

              <Typography>
                <strong>Contraseña:</strong> {cliente.password}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Dirección
              </Typography>

              <Typography>
                <strong>Calle:</strong> {cliente.address?.street}
              </Typography>

              <Typography>
                <strong>Número:</strong> {cliente.address?.number}
              </Typography>

              <Typography>
                <strong>Código Postal:</strong> {cliente.address?.zipcode}
              </Typography>

              <Typography>
                <strong>Ciudad:</strong> {cliente.address?.city}
              </Typography>

              {admin?.sector === "Gerencia" && (
                <Box display="flex" justifyContent="flex-end" mt={4}>
                  <Tooltip title="Eliminar cliente">
                    <IconButton
                      color="error"
                      onClick={() => setConfirmarEliminar(true)}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      <Dialog
        open={confirmarEliminar}
        onClose={() => setConfirmarEliminar(false)}
      >
        <DialogTitle>
          ¿Seguro que quiere eliminar al cliente:{" "}
          <strong>
            {cliente?.name?.firstname} {cliente?.name?.lastname}
          </strong>
          ?
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setConfirmarEliminar(false)}>Cancelar</Button>

          <Button color="error" variant="contained" onClick={eliminarCliente}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={mensaje}
        autoHideDuration={1000}
        message="Cliente eliminado correctamente"
      />
    </>
  );
};

export default DetalleCliente;
