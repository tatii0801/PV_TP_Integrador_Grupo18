import React, { useState, useEffect } from "react";

import FormularioAltaCliente from "../components/common/FormAltaCliente";

import "../css/style.css";

import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, CircularProgress, Alert, Typography, Box, Container,
  Button, Dialog, DialogTitle, DialogContent,
} from '@mui/material';

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

        const respuesta = await fetch("https://fakestoreapi.com/users");

        if (!respuesta.ok) {
          throw new Error("Error de conexión");
        }

        const datos = await respuesta.json();

        setClientes(datos);
      } catch (err) {
        setError(err.message);
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
      {/* TITULO */}

      <div className="panel-titulo">
        <h1>Panel de Clientes</h1>

        <p>Administración y gestión de clientes en tiempo real</p>
      </div>

      {/* FORMULARIO */}

      {/* ALTA CLIENTE */}

      <div className="formulario-card">
        <div className="formulario-titulo">
          <h2>Agregar Cliente</h2>

          <p>Registrar nuevos clientes en la base de datos</p>
        </div>

        <Button
          variant="contained"
          className="formulario-boton"
          onClick={() => setAbrirFormulario(true)}
        >
          + Nuevo Cliente
        </Button>
      </div>

      {/* MODAL */}

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

      {/* BUSCADOR */}

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

      {/* TABLA */}

      <div className="buscador-titulo">Lista de Clientes</div>

      <TableContainer component={Paper} className="tabla-card">
        <Table>
          <TableHead className="tabla-header">
            <TableRow>
              {/*<TableCell>
                <strong>ID</strong>
              </TableCell>*/}

              <TableCell>
                <strong>Nombre Completo</strong>
              </TableCell>

              <TableCell>
                <strong>Correo</strong>
              </TableCell>

              <TableCell>
                <strong>Teléfono</strong>
              </TableCell>

              <TableCell>
                <strong>Ciudad</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <TableRow
                  key={cliente.reactKey || cliente.id}
                  className="tabla-fila"
                >
                  {/*<TableCell>{cliente.id}</TableCell>*/}

                  <TableCell>
                    {cliente.name?.firstname} {cliente.name?.lastname}
                  </TableCell>

                  <TableCell>{cliente.email}</TableCell>

                  <TableCell>{cliente.phone}</TableCell>

                  <TableCell>{cliente.address?.city}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" className="tabla-vacia">
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListaClientes;

//para probar si funciona bien el boton para dar de alta