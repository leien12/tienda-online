import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField,
    Grid, FormControl, InputLabel, Select, MenuItem, InputAdornment, Divider, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
// import { activeDiscounts, generateDiscountId } from '../../data/adminMockData';

const DiscountManager = () => {
    const [discounts, setDiscounts] = useState([]);
    const [products, setProducts] = useState([]); // Need products for the select
    const [open, setOpen] = useState(false);
    const [newDiscount, setNewDiscount] = useState({
        name: '',
        productId: '',
        discountPercentage: 10,
        endDate: '',
        endTime: '23:59'
    });

    useEffect(() => {
        fetchDiscounts();
        fetchProducts();
    }, []);

    const fetchDiscounts = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/discounts');
            setDiscounts(res.data);
        } catch (error) {
            console.error('Error fetching discounts:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products for discounts:', error);
        }
    };

    const handleOpen = () => {
        setNewDiscount({
            name: '',
            productId: '',
            discountPercentage: 10,
            endDate: new Date().toISOString().split('T')[0],
            endTime: '23:59'
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        const product = products.find(p => p.id === newDiscount.productId);
        const endDateTime = new Date(`${newDiscount.endDate}T${newDiscount.endTime}`);

        const discountToAdd = {
            name: newDiscount.name,
            product_id: newDiscount.productId,
            percentage: parseInt(newDiscount.discountPercentage),
            start_date: new Date().toISOString(),
            end_date: endDateTime.toISOString(),
        };

        try {
            await axios.post('http://localhost:3001/api/discounts', discountToAdd);
            fetchDiscounts();
            setOpen(false);
        } catch (error) {
            console.error('Error creating discount:', error);
            alert('Error al crear descuento');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este descuento?')) {
            try {
                await axios.delete(`http://localhost:3001/api/discounts/${id}`);
                fetchDiscounts();
            } catch (error) {
                console.error('Error deleting discount:', error);
                alert('Error al eliminar el descuento');
            }
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Descuentos</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    sx={{ backgroundColor: '#1a237e' }}
                >
                    Nuevo Descuento
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Porcentaje</TableCell>
                            <TableCell>Termina</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {discounts.map((discount) => (
                            <TableRow key={discount.id}>
                                <TableCell>{discount.name}</TableCell>
                                <TableCell>{discount.product_name || 'Producto eliminado'}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'green' }}>{discount.percentage}%</TableCell>
                                <TableCell>{new Date(discount.end_date).toLocaleDateString()} {new Date(discount.end_date).toLocaleTimeString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={discount.is_active ? 'Activo' : 'Inactivo'}
                                        color={discount.is_active ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="error" onClick={() => handleDelete(discount.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
                <DialogTitle sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0', pb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Crear Nuevo Descuento
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Box component="form" sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nombre de la Promoción"
                                    placeholder="Ej. Oferta de Verano"
                                    value={newDiscount.name}
                                    onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Producto en Oferta</InputLabel>
                                    <Select
                                        value={newDiscount.productId}
                                        label="Producto en Oferta"
                                        onChange={(e) => setNewDiscount({ ...newDiscount, productId: e.target.value })}
                                    >
                                        {products.map(p => (
                                            <MenuItem key={p.id} value={p.id}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                    <Typography variant="body2">{p.name}</Typography>
                                                    <Typography variant="caption" color="textSecondary">${p.price}</Typography>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Porcentaje de Descuento"
                                    value={newDiscount.discountPercentage}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    onChange={(e) => setNewDiscount({ ...newDiscount, discountPercentage: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ p: 1, bgcolor: '#e8f5e9', borderRadius: 1, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body2" color="success.main" fontWeight="bold">
                                        ¡Ahorro del {newDiscount.discountPercentage}%!
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 1 }}><Typography variant="caption" color="textSecondary">VIGENCIA</Typography></Divider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Fecha de Finalización"
                                    InputLabelProps={{ shrink: true }}
                                    value={newDiscount.endDate}
                                    onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="time"
                                    label="Hora de Finalización"
                                    InputLabelProps={{ shrink: true }}
                                    value={newDiscount.endTime}
                                    onChange={(e) => setNewDiscount({ ...newDiscount, endTime: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, bgcolor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}>
                    <Button onClick={handleClose} sx={{ color: '#666' }}>Cancelar</Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        sx={{ px: 4 }}
                    >
                        Crear Descuento
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DiscountManager;
