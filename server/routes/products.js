const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT p.*, 
                   c.name as category_name, 
                   c.slug as category_slug,
                   d.percentage as discount_percentage,
                   d.end_date as discount_end_date
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN discounts d ON p.id = d.product_id 
                AND d.is_active = 1 
                AND d.end_date > NOW() 
                AND d.start_date <= NOW()
            ORDER BY p.created_at DESC
        `);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (products.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(products[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un producto
router.post('/', async (req, res) => {
    const { name, price, stock, category_id, description, image_url } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO products (name, price, stock, category_id, description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [name, price, stock, category_id, description, image_url]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { name, price, stock, category_id, description, image_url } = req.body;
    try {
        await db.query(
            'UPDATE products SET name=?, price=?, stock=?, category_id=?, description=?, image_url=? WHERE id=?',
            [name, price, stock, category_id, description, image_url, req.params.id]
        );
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
