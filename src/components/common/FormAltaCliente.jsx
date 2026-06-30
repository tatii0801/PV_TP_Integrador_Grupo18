import { useState } from "react";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  MenuItem,
} from "@mui/material";

const FormularioAltaCliente = ({ setClientes, cerrarFormulario }) => {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const telefonoRegex = /^[0-9]{8,15}$/;

    if (
      !nuevoCliente.nombre.trim() ||
      !nuevoCliente.apellido.trim() ||
      !nuevoCliente.correo.trim() ||
      !nuevoCliente.telefono.trim() ||
      !nuevoCliente.ciudad
    ) {
      setMensaje("Complete todos los campos");
      return;
    }

    if (nuevoCliente.nombre.length < 3) {
      setMensaje("Nombre demasiado corto");
      return;
    }

    if (nuevoCliente.apellido.length < 3) {
      setMensaje("Apellido demasiado corto");
      return;
    }

    if (!emailRegex.test(nuevoCliente.correo)) {
      setMensaje("Correo inválido");
      return;
    }

    if (!telefonoRegex.test(nuevoCliente.telefono)) {
      setMensaje("Teléfono inválido");
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

      setMensaje(`Cliente agregado correctamente`); //· ID ${nuevoId}

      setNuevoCliente({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        ciudad: "",
      });

      setTimeout(() => {
        setMensaje("");
        cerrarFormulario();
      }, 1500);
    } catch {
      setMensaje("No se pudo registrar el cliente");
    }
  };

  const ciudades = [
    "San Salvador de Jujuy",
    "Palpalá",
    "Yala",
    "Perico",
    "El Carmen",
    "Libertador",
    "Humahuaca",
    "Tilcara",
    "San Pedro",
  ];

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

          <Grid item xs={12} md={12}>
            <TextField
              select
              fullWidth
              label="Selecciona la Ciudad"
              name="ciudad"
              value={nuevoCliente.ciudad}
              onChange={handleChange}
              sx={{
                minWidth: 240,
              }}

            >
              {ciudades.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
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
