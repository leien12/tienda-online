const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener órdenes de un usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.params.userId]);

        // Para cada orden, obtener items
        for (let order of orders) {
            const [items] = await db.query(`
                SELECT oi.*, p.name as productName, p.image_url 
                FROM order_items oi 
                LEFT JOIN products p ON oi.product_id = p.id 
                WHERE oi.order_id = ?
            `, [order.id]);
            order.items = items;
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear orden
router.post('/', async (req, res) => {
    const { userId, items, total, shippingAddress, paymentMethod } = req.body;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total, status, shipping_address, payment_method) VALUES (?, ?, ?, ?, ?)',
            [userId, total, 'pending', shippingAddress, paymentMethod]
        );

        const orderId = orderResult.insertId;

        for (let item of items) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
                [orderId, item.id, item.quantity, item.price]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Orden creada exitosamente', orderId });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: error.message });
    } finally {
        connection.release();
    }
});

module.exports = router;
