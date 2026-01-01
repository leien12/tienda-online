import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
  CircularProgress
} from "@mui/material";
import { ArrowForward, LocalOffer } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";

const FeaturedProducts = () => {
  const theme = useTheme();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/products");
        // Filtrar productos destacados y mapear a estructura de ProductCard
        const mappedProducts = data
          // .filter(p => p.is_featured) // Si tienes flag is_featured en DB
          .slice(0, 6) // Mostrar solo 6 por ahora
          .map(p => ({
            id: p.id,
            name: p.name,
            category: p.category_name || "General",
            shortDescription: p.description?.substring(0, 100) + (p.description?.length > 100 ? '...' : ''),
            rating: 5.0, // Mock: DB no tiene ratings aún
            reviewCount: 0,
            price: p.discount_percentage
              ? (p.price * (1 - p.discount_percentage / 100)).toFixed(2)
              : p.price,
            originalPrice: p.price,
            discount: p.discount_percentage || 0,
            inStock: p.stock > 0,
            stock: p.stock,
            discountEndTime: p.discount_end_date,
            images: [p.image_url]
          }));
        setFeaturedProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: "white" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              px: 3,
              py: 1,
              backgroundColor: theme.palette.primary.main,
              borderRadius: "50px",
              color: "white",
            }}
          >
            <LocalOffer sx={{ fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Productos Destacados
            </Typography>
          </Box>

          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Los Mejores Productos
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Descubre nuestra selección especial de productos con la mejor
            calidad y precios increíbles
          </Typography>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            component={Link}
            to="/productos"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: "50px",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: "0 8px 25px rgba(46, 125, 50, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 35px rgba(46, 125, 50, 0.4)",
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              },
            }}
          >
            Ver Todos los Productos
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
