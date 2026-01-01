import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, CircularProgress, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/products");
      // Mapear datos a la estructura del card
      const mappedProducts = data.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category_name || "General",
        shortDescription: p.description?.substring(0, 100) + (p.description?.length > 100 ? '...' : ''),
        rating: 5.0,
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
      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ py: 4, minHeight: '80vh', backgroundColor: '#f4f6f8' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2, color: '#1a237e' }}>
            Nuestros Productos
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            Explora nuestro catálogo completo de productos de alta calidad.
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 600, bgcolor: 'white', borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Products;
