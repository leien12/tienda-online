import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, Alert, AlertTitle, Button } from '@mui/material';
import { dashboardStats, inventoryAlerts, activeDiscounts, getRealTimeStats, getSystemAlerts } from '../../data/adminMockData';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const StatCard = ({ title, value, subtext, icon, color }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: subtext.includes('+') ? 'success.main' : 'error.main', mt: 1 }}>
                        {subtext}
                    </Typography>
                </Box>
                <Box sx={{
                    backgroundColor: `${color}.light`,
                    color: `${color}.main`,
                    p: 1,
                    borderRadius: 2,
                    display: 'flex'
                }}>
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [stats, setStats] = useState(dashboardStats);
    const [alerts, setAlerts] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        // Simulate fetching fresh data
        const fetchDashboardData = () => {
            const liveStats = getRealTimeStats();
            setStats(liveStats);
            setAlerts(getSystemAlerts());
            setDiscounts(activeDiscounts.filter(d => d.isActive));
        };

        fetchDashboardData();
        // Optional: Set up interval for "live" updates
    }, []);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Dashboard</Typography>

            {/* Alertas del Sistema */}
            {alerts.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    {alerts.map(alert => (
                        <Alert severity={alert.severity === 'high' ? 'error' : 'warning'} key={alert.id} sx={{ mb: 1 }}>
                            <AlertTitle>{alert.title}</AlertTitle>
                            {alert.message}
                        </Alert>
                    ))}
                </Box>
            )}

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Ingresos Totales (Mes)"
                        value={`$${stats.totalRevenue.month.toLocaleString()}`}
                        subtext="+12.5% vs mes anterior"
                        icon={<AttachMoneyIcon />}
                        color="success"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Pedidos (Mes)"
                        value={stats.totalOrders.month}
                        subtext="+5.2% vs mes anterior"
                        icon={<ShoppingCartIcon />}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Clientes Nuevos"
                        value={stats.totalCustomers.new}
                        subtext="+18% vs mes anterior"
                        icon={<PeopleIcon />}
                        color="info"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Stock Crítico"
                        value={stats.lowStockProducts}
                        subtext="Artículos con pocas unidades"
                        icon={<WarningIcon />}
                        color="warning"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Recent Alerts / Warnings Details */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>Inventario Bajo</Typography>
                        {inventoryAlerts.filter(i => i.status === 'critical').map(item => (
                            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid #eee' }}>
                                <Box>
                                    <Typography variant="subtitle2">{item.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">Stock actual: {item.currentStock}</Typography>
                                </Box>
                                <Button size="small" variant="outlined" color="error">Reabastecer</Button>
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* Active Discounts */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>Descuentos Activos</Typography>
                        {discounts.map(discount => (
                            <Box key={discount.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid #eee' }}>
                                <Box>
                                    <Typography variant="subtitle2">{discount.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {discount.discountPercentage}% OFF - Termina: {new Date(discount.endDate).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" color="primary.main">{discount.usageCount}</Typography>
                                    <Typography variant="caption" display="block">Usos</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
