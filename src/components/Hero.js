import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
} from "@mui/material";
import {
  ShoppingBag,
  LocalShipping,
  Security,
  Star,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Hero = () => {
  const theme = useTheme();

  const features = [
    {
      icon: (
        <ShoppingBag sx={{ fontSize: 30, color: theme.palette.secondary.main }} />
      ),
      title: "Calidad",
      description: "Productos seleccionados",
    },
    {
      icon: (
        <LocalShipping
          sx={{ fontSize: 30, color: theme.palette.secondary.main }}
        />
      ),
      title: "Envío Gratis",
      description: "En pedidos +$50",
    },
    {
      icon: (
        <Security sx={{ fontSize: 30, color: theme.palette.secondary.main }} />
      ),
      title: "Seguro",
      description: "Pago protegido",
    },
  ];

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
        color: "white",
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Text Content */}
          <Grid item xs={12} md={7}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: theme.palette.secondary.main,
                  mb: 1,
                  display: 'block'
                }}
              >
                BIENVENIDO A TU TIENDA
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "2rem", md: "3rem" },
                  lineHeight: 1.1,
                }}
              >
                Tecnología y Estilo <br />
                <Box component="span" sx={{ color: theme.palette.blue }}>
                  al Mejor Precio
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 300,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  maxWidth: { xs: "100%", md: "85%" },
                }}
              >
                Descubre las últimas novedades en electrónica y accesorios.
                Calidad garantizada en cada compra.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  component={Link}
                  to="/productos"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1,
                    fontSize: "1rem",
                    borderRadius: "8px",
                    fontWeight: 600,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                  }}
                >
                  Ver Catálogo
                </Button>
                <Button
                  component={Link}
                  to="/ofertas"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.5)",
                    px: 4,
                    py: 1,
                    fontSize: "1rem",
                    borderRadius: "8px",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Ofertas
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Feature Cards (Instead of giant emoji) */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.9)', p: 1, borderRadius: 1 }}>
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">{feature.title}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>{feature.description}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
