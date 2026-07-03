import { Tabs, Tab, Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  let value = false;

  if (
    location.pathname === "/" ||
    location.pathname === "/dashboard"
  ) {
    value = "/dashboard";
  } else if (
    location.pathname.startsWith("/clientes")
  ) {
    value = "/clientes";
  }

  return (
    <Box
      sx={{
        borderTop: "1px solid rgba(255,255,255,0.15)",
        px: 2,
        bgcolor: "inherit",
      }}
    >
      <Tabs
        value={value}
        textColor="inherit"
        indicatorColor="secondary"
      >
        <Tab
          label="Clientes"
          value="/clientes"
          component={NavLink}
          to="/clientes"
        />
        <Tab
          label="Dashboard"
          value="/dashboard"
          component={NavLink}
          to="/dashboard"
        />

        
      </Tabs>
    </Box>
  );
};

export default Nav;