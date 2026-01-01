import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Divider,
  Paper
} from "@mui/material";
import { Add, Remove, Delete, ArrowBack } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, cartTotal, clearCart } = useCart();
  const theme = useTheme();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Box sx={{ py: 8, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            ¡Parece que aún no has agregado productos!
          </Typography>
          <Button
            component={Link}
            to="/productos"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Explorar Productos
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, backgroundColor: theme.palette.background.default, minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Seguir Comprando
        </Button>

        <Typography variant="h3" fontWeight="bold" sx={{ mb: 4, color: theme.palette.primary.main }}>
          Tu Carrito
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cartItems.map((item) => (
                <Card key={item.id} sx={{ display: 'flex', borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{
                    width: 140,
                    height: 140,
                    minWidth: 140,
                    p: 1,
                    bgcolor: '#f9f9f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        mixBlendMode: 'multiply'
                      }}
                      image={item.images[0] || "https://via.placeholder.com/150"}
                      alt={item.name}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto', display: 'flex', justifyContent: 'space-between', pb: 1 }}>
                      <Box>
                        <Typography component="div" variant="h6" fontWeight="bold">
                          {item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          ${item.price}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2, pr: 2, justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2, minWidth: 20, textAlign: 'center' }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.stock <= item.quantity}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                      <Button
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => removeItem(item.id)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Resumen del Pedido
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight="bold">${cartTotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Envío</Typography>
                <Typography color="success.main" fontWeight="bold">Gratis</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Total</Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">${cartTotal.toFixed(2)}</Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 1.5, fontSize: '1.1rem' }}
                onClick={() => alert("¡Funcionalidad de pago próximamente!")}
              >
                Checkout
              </Button>

              <Button
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mt: 2 }}
                onClick={clearCart}
              >
                Vaciar Carrito
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
