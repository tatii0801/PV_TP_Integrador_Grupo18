import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { AdminContext } from "../../context/AdminContext";

const Header = () => {
  const { admin, cerrarSesion } = useContext(AdminContext);

  const navigate = useNavigate();

  const salir = () => {
    cerrarSesion();

    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Panel de Control de Clientes
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={3}
        >
          <Typography>
            {admin.nombre}
          </Typography>

          <Typography>
            {admin.sector}
          </Typography>

          <Button
            color="inherit"
            variant="outlined"
            onClick={salir}
          >
            Cerrar Sesión
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;