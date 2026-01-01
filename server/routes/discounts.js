const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const [discounts] = await db.query(`
            SELECT d.*, p.name as product_name 
            FROM discounts d 
            LEFT JOIN products p ON d.product_id = p.id
        `);
        res.json(discounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, product_id, percentage, start_date, end_date } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO discounts (name, product_id, percentage, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
            [name, product_id, percentage, start_date, end_date]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM discounts WHERE id = ?', [req.params.id]);
        res.json({ message: 'Descuento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
