import { Box, Typography, IconButton } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box className="footer">
      <Box className="footer-contenido">

        <Box className="footer-texto">
          <Typography variant="body2">
            © Grupo 18 - Facultad de Ingeniería - UNJu.
            Todos los derechos reservados - 2026
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: .75 }}
          >
            Analista Programador Universitario
          </Typography>
        </Box>

        <Box className="footer-redes">

          <IconButton
            color="inherit"
            href="https://instagram.com"
            target="_blank"
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            color="inherit"
            href="https://facebook.com"
            target="_blank"
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            color="inherit"
            href="https://linkedin.com"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>

          <IconButton
            color="inherit"
            href="https://github.com"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>

        </Box>

      </Box>
    </Box>
  );
};

export default Footer;