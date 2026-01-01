import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  Search,
  Favorite,
  Close,
  Dashboard,
  ExitToApp,
  ListAlt
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const navigationItems = [
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/productos" },
    { label: "Ofertas", path: "/ofertas" },
    { label: "Contacto", path: "/contacto" },
    { label: "Acerca de", path: "/acerca" },
  ];

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background: "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          TiendaOnline
        </Typography>
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{ color: "white" }}
        >
          <Close />
        </IconButton>
      </Box>
      <List sx={{ pt: 2 }}>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.label}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                mx: 1,
              },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemText
              primary={item.label}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "1.1rem",
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
        {/* Mobile Auth Links */}
        {!isAuthenticated && (
          <>
            <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />
            <ListItem button component={Link} to="/login" onClick={handleDrawerToggle} sx={{ color: 'white' }}>
              <ListItemText primary="Iniciar Sesión" />
            </ListItem>
            <ListItem button component={Link} to="/register" onClick={handleDrawerToggle} sx={{ color: 'white' }}>
              <ListItemText primary="Registrarse" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "white",
          color: theme.palette.text.primary,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 1,
            }}
          >
            {/* Logo y título */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  background:
                    "linear-gradient(135deg, #1a237e 0%, #534bae 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  boxShadow: "0 4px 12px rgba(26, 35, 126, 0.3)",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: "1.2rem",
                  }}
                >
                  T
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #1a237e 0%, #534bae 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: { xs: "none", sm: "block" },
                }}
              >
                TiendaOnline
              </Typography>
            </Box>

            {/* Navegación desktop */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: "10px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Iconos de acción */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="large"
                sx={{
                  color: theme.palette.text.primary,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Search />
              </IconButton>

              <IconButton
                size="large"
                component={Link}
                to="/carrito"
                sx={{
                  color: theme.palette.text.primary,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Badge badgeContent={itemCount} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* Lógica de Autenticación */}
              {isAuthenticated ? (
                <>
                  <IconButton
                    size="large"
                    onClick={handleMenuClick}
                    sx={{
                      color: theme.palette.text.primary,
                      transition: "all 0.3s ease",
                      ml: 1,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>

                  {/* Menú desplegable de usuario */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        borderRadius: "12px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        mt: 1,
                        minWidth: 200,
                      },
                    }}
                  >
                    <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                      <Typography variant="subtitle1" fontWeight="bold">{user?.name}</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.8rem' }}>{user?.email}</Typography>
                    </Box>

                    <MenuItem component={Link} to="/perfil" onClick={handleMenuClose} sx={{ py: 1.5 }}>
                      <Person sx={{ mr: 2, fontSize: 20, color: 'text.secondary' }} /> Mi Perfil
                    </MenuItem>

                    <MenuItem component={Link} to="/pedidos" onClick={handleMenuClose} sx={{ py: 1.5 }}>
                      <ListAlt sx={{ mr: 2, fontSize: 20, color: 'text.secondary' }} /> Mis Pedidos
                    </MenuItem>

                    {isAdmin() && (
                      <MenuItem component={Link} to="/admin" onClick={handleMenuClose} sx={{ py: 1.5, color: '#1a237e' }}>
                        <Dashboard sx={{ mr: 2, fontSize: 20 }} /> Panel Admin
                      </MenuItem>
                    )}

                    <Divider />

                    <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: theme.palette.error.main }}>
                      <ExitToApp sx={{ mr: 2, fontSize: 20 }} /> Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                !isMobile && (
                  <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      color="primary"
                      sx={{ borderRadius: '8px' }}
                    >
                      Ingresar
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                      color="primary"
                      sx={{ borderRadius: '8px', boxShadow: 'none' }}
                    >
                      Registrarse
                    </Button>
                  </Box>
                )
              )}

              {/* Menú móvil */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="abrir menú"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    ml: 1,
                    color: theme.palette.text.primary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
