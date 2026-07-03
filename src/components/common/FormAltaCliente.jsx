import { useState } from "react";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";

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

const FormularioAltaCliente = ({ setClientes, cerrarFormulario }) => {
  const [mensaje, setMensaje] = useState("");

  const [errores, setErrores] = useState({});

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    ciudad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nuevoValor = value;

    if (name === "telefono") {
      nuevoValor = value.replace(/\D/g, "");
    }

    setNuevoCliente((prev) => ({
      ...prev,
      [name]: nuevoValor,
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nuevoCliente.nombre.trim()) {
      nuevosErrores.nombre = "Campo obligatorio";
    } else if (!soloLetras.test(nuevoCliente.nombre)) {
      nuevosErrores.nombre = "Solo letras";
    } else if (nuevoCliente.nombre.length < 3) {
      nuevosErrores.nombre = "Mínimo 3 caracteres";
    }

    if (!nuevoCliente.apellido.trim()) {
      nuevosErrores.apellido = "Campo obligatorio";
    } else if (!soloLetras.test(nuevoCliente.apellido)) {
      nuevosErrores.apellido = "Solo letras";
    } else if (nuevoCliente.apellido.length < 3) {
      nuevosErrores.apellido = "Mínimo 3 caracteres";
    }

    if (!email.test(nuevoCliente.correo)) {
      nuevosErrores.correo = "Correo inválido";
    }

    if (nuevoCliente.telefono.length < 8 || nuevoCliente.telefono.length > 12) {
      nuevosErrores.telefono = "Entre 8 y 12 números";
    }

    if (!nuevoCliente.ciudad) {
      nuevosErrores.ciudad = "Seleccione una ciudad";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const crearCliente = async () => {
    if (!validarFormulario()) return;

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
let nuevoId = 1;

setClientes((prev) => {
  const ultimoId =
    prev.length > 0
      ? Math.max(...prev.map((c) => Number(c.id) || 0))
      : 0;

  nuevoId = ultimoId + 1;

  const clienteNuevo = {
    id: nuevoId,
    reactKey: Date.now(),
    ...clienteAPI,
  };

   
  const clientesLocales =
    JSON.parse(localStorage.getItem("clientesLocales")) || [];

  clientesLocales.push(clienteNuevo);

  localStorage.setItem(
    "clientesLocales",
    JSON.stringify(clientesLocales)
  );

  return [...prev, clienteNuevo];
});

      setMensaje(" ✅ Cliente agregado correctamente");

      setNuevoCliente({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        ciudad: "",
      });

      setErrores({});

      setTimeout(() => {
        setMensaje("");

        cerrarFormulario();
      }, 1500);
    } catch {
      setMensaje("No se pudo registrar el cliente");
    }
  };

  return (
    <Card elevation={0}>
      <CardContent>
        {mensaje && (
          <Alert
            severity={mensaje.includes("correctamente") ? "success" : "error"}
            sx={{
              mb: 3,
            }}
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
              error={!!errores.nombre}
              helperText={errores.nombre}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Apellido"
              name="apellido"
              value={nuevoCliente.apellido}
              onChange={handleChange}
              error={!!errores.apellido}
              helperText={errores.apellido}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo Electrónico ✉️"
              name="correo"
              value={nuevoCliente.correo}
              onChange={handleChange}
              error={!!errores.correo}
              sx={{
                minWidth: 300, // ancho del cuadro cerrado
              }}
              helperText={errores.correo}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Teléfono 📞"
              name="telefono"
              value={nuevoCliente.telefono}
              onChange={handleChange}
              error={!!errores.telefono}
              helperText={errores.telefono}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={!!errores.ciudad}
              sx={{
                minWidth: 240, // ancho del cuadro cerrado
              }}
            >
              <InputLabel>Selecciona la Ciudad</InputLabel>

              <Select
                name="ciudad"
                value={nuevoCliente.ciudad}
                label="Selecciona la Ciudad"
                onChange={handleChange}
                sx={{
                  minHeight: 58,
                  borderRadius: "14px",
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      width: 420,
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {ciudades.map((ciudad) => (
                  <MenuItem key={ciudad} value={ciudad}>
                    {ciudad}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{errores.ciudad}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
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
