import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const FormAltaCliente = ({ setClientes }) => {
  const [mensaje, setMensaje] = useState("");

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    ciudad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNuevoCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const crearCliente = async () => {
    if (
      !nuevoCliente.nombre.trim() ||
      !nuevoCliente.apellido.trim() ||
      !nuevoCliente.correo.trim() ||
      !nuevoCliente.telefono.trim() ||
      !nuevoCliente.ciudad.trim()
    ) {
      setMensaje("Complete todos los campos");
      return;
    }

    try {
      const clienteAPI = {
        email: nuevoCliente.correo,

        username: nuevoCliente.nombre.toLowerCase(),

        password: "123456",

        name: {
          firstname: nuevoCliente.nombre,
          lastname: nuevoCliente.apellido,
        },

        address: {
          city: nuevoCliente.ciudad,
        },

        phone: nuevoCliente.telefono,
      };

      const respuesta = await fetch("https://fakestoreapi.com/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(clienteAPI),
      });

      if (respuesta.status !== 200 && respuesta.status !== 201) {
        throw new Error();
      }

      const data = await respuesta.json();

      setClientes((prev) => [
        {
          id: data.id,

          name: {
            firstname: nuevoCliente.nombre,

            lastname: nuevoCliente.apellido,
          },

          email: nuevoCliente.correo,

          phone: nuevoCliente.telefono,

          address: {
            city: nuevoCliente.ciudad,
          },
        },

        ...prev,
      ]);

      setMensaje(`Cliente agregado correctamente · ID ${data.id}`);

      setNuevoCliente({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        ciudad: "",
      });

      setTimeout(() => {
        setMensaje("");
      }, 4000);
    } catch {
      setMensaje("No se pudo registrar el cliente");
    }
  };

  return (
    <Card className="formulario-card">
      <CardContent>
        <Typography className="formulario-titulo">Agregar Cliente</Typography>
<hr />
        {mensaje && (
          <Alert
            severity={mensaje.includes("correctamente") ? "success" : "error"}
            className={
              mensaje.includes("correctamente") ? "alerta-ok" : "alerta-error"
            }
          >
            {mensaje}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={nuevoCliente.nombre}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Apellido"
              name="apellido"
              value={nuevoCliente.apellido}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correo"
              value={nuevoCliente.correo}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={nuevoCliente.telefono}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ciudad"
              name="ciudad"
              value={nuevoCliente.ciudad}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={crearCliente}
              className="formulario-boton"
            >
              Registrar Cliente
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FormAltaCliente;
