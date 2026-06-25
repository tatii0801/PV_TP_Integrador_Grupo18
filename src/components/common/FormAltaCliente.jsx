import { useState } from "react";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const FormularioAltaCliente = ({ setClientes }) => {
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

        username: nuevoCliente.nombre,

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

      let nuevoId = 1;

      //No repetir el ID que devuelve FakeStore (que muchas veces devuelve 1),
      //  sino generar IDs consecutivos locales para mostrarlos
      setClientes((prev) => {
        const ultimoId =
          prev.length > 0 ? Math.max(...prev.map((c) => Number(c.id) || 0)) : 0;

        nuevoId = ultimoId + 1;

        const clienteNuevo = {
          id: nuevoId,

          reactKey: Date.now(),

          ...clienteAPI,
        };
        
        //ordena cuando se agrega un nuevo cliente al colocolar uno abajo del otro
        return [...prev, clienteNuevo];
      });

      setMensaje(`Cliente agregado correctamente · ID ${nuevoId}`);
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
    <Card className="animacion" elevation={0}>
      <CardContent>
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

        <Grid container spacing={3} className="formulario-grid">
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={nuevoCliente.nombre}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Apellido"
              name="apellido"
              value={nuevoCliente.apellido}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correo"
              value={nuevoCliente.correo}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={nuevoCliente.telefono}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label="Ciudad"
              name="ciudad"
              value={nuevoCliente.ciudad}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              className="formulario-boton"
              onClick={crearCliente}
            >
              Registrar Cliente
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FormularioAltaCliente;
