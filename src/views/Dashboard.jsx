import React, { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider,
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const Dashboard = () => {
  const [clientes, setClientes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const respuesta = await fetch("https://fakestoreapi.com/users");

        if (!respuesta.ok) {
          throw new Error();
        }

        const datos = await respuesta.json();

        const eliminados =
          JSON.parse(localStorage.getItem("clientesEliminados")) || [];

        const clientesVisibles = datos.filter(
          (cliente) => !eliminados.includes(cliente.id)
        );

        setClientes(clientesVisibles);
      } catch {
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    obtenerClientes();
  }, []);

  if (loading) {
    return (
      <Box className="cargando">
        <CircularProgress size={60} />
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

  const totalClientes = clientes.length;

  const totalEmails = clientes.filter((c) => c.email).length;

  const totalTelefonos = clientes.filter((c) => c.phone).length;

  const ciudades = {};

  clientes.forEach((cliente) => {
    const ciudad = cliente.address?.city || "Sin ciudad";

    ciudades[ciudad] = (ciudades[ciudad] || 0) + 1;
  });

  const totalCiudades = Object.keys(ciudades).length;

  const datosCiudades = Object.entries(ciudades).map(
    ([ciudad, cantidad]) => ({
      ciudad,
      cantidad,
    })
  );

  const datosPie = datosCiudades.map((item) => ({
    name: item.ciudad,
    value: item.cantidad,
  }));

  const datosLinea = clientes.map((cliente, index) => ({
    nombre: `Cliente ${index + 1}`,
    clientes: index + 1,
  }));

  const datosArea = clientes.map((cliente, index) => ({
    nombre: `C${index + 1}`,
    valor: (index + 1) * 2,
  }));

  const colores = [
    "#1976d2",
    "#43a047",
    "#ff9800",
    "#e53935",
    "#7b1fa2",
    "#00897b",
    "#3949ab",
    "#ef6c00",
    "#8e24aa",
    "#5e35b1",
  ];

  const tarjeta = (titulo, valor, icono, color) => (
    <Card
      elevation={6}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        transition: "0.3s",
        minHeight: 170,
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      <Box
        sx={{
          height: 8,
          background: color,
        }}
      />

      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              color="text.secondary"
              sx={{
                fontWeight: 500,
              }}
            >
              {titulo}
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {valor}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            {icono}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
    return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
        }}
      >
        Panel de control y métricas generales del sistema
      </Typography>

      {/* TARJETAS SUPERIORES */}

      <Grid
        container
        spacing={4}
        sx={{
          mb: 5,
        }}
      >
        <Grid item xs={12} sm={6} lg={3}>
          {tarjeta(
            "Clientes",
            totalClientes,
            <PeopleAltIcon sx={{ fontSize: 38 }} />,
            "linear-gradient(135deg,#1976d2,#42a5f5)"
          )}
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          {tarjeta(
            "Ciudades",
            totalCiudades,
            <LocationCityIcon sx={{ fontSize: 38 }} />,
            "linear-gradient(135deg,#43a047,#66bb6a)"
          )}
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          {tarjeta(
            "Emails",
            totalEmails,
            <EmailIcon sx={{ fontSize: 38 }} />,
            "linear-gradient(135deg,#fb8c00,#ffb74d)"
          )}
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          {tarjeta(
            "Teléfonos",
            totalTelefonos,
            <PhoneIcon sx={{ fontSize: 38 }} />,
            "linear-gradient(135deg,#e53935,#ef5350)"
          )}
        </Grid>
      </Grid>

      {/* GRÁFICOS */}

      <Grid container spacing={4}>
        <Grid item xs={12} xl={8}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              height: 480,
              
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Clientes por Ciudad
              </Typography>

              <Divider sx={{ my: 2 }} />

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={datosCiudades}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="ciudad" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="cantidad"
                    radius={[8, 8, 0, 0]}
                    fill="#1976d2"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} xl={4}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              height: 480,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Distribución por Ciudad
              </Typography>

              <Divider sx={{ my: 2 }} />

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>
                  <Pie
                    data={datosPie}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label
                  >
                    {datosPie.map((item, index) => (
                      <Cell
                        key={index}
                        fill={
                          colores[
                            index % colores.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
                <Grid item xs={12} md={6}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              height: 480,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Crecimiento de Clientes
              </Typography>

              <Divider sx={{ my: 2 }} />

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <LineChart data={datosLinea}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="nombre" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="clientes"
                    stroke="#43a047"
                    strokeWidth={4}
                    dot={{
                      r: 5,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              height: 480,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Tendencia General
              </Typography>

              <Divider sx={{ my: 2 }} />

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <AreaChart data={datosArea}>
                  <defs>
                    <linearGradient
                      id="colorArea"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#1976d2"
                        stopOpacity={0.8}
                      />

                      <stop
                        offset="95%"
                        stopColor="#1976d2"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="nombre" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="valor"
                    stroke="#1976d2"
                    fillOpacity={1}
                    fill="url(#colorArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              background:
                "linear-gradient(135deg,#1565c0,#1e88e5)",
              color: "white",
            }}
          >
            <CardContent
              sx={{
                py: 5,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                Resumen del Sistema
              </Typography>

              <Typography
                sx={{
                  fontSize: 17,
                  lineHeight: 1.8,
                }}
              >
                Actualmente el sistema administra{" "}
                <strong>{totalClientes}</strong> clientes
                distribuidos en{" "}
                <strong>{totalCiudades}</strong> ciudades
                diferentes. Todos los registros contienen
                información de contacto mediante correo
                electrónico y teléfono, permitiendo una gestión
                completa de la base de datos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;