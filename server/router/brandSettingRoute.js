import express from 'express';
import { db } from '../config/connectDB.js';

const router = express.Router();

/* Get all categories */
router.get('/get/brands', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM brand ORDER BY id ASC');

        if (!result) {
            res.json({ status: 500, message: 'Internal server error' });
        } else {
            res.json({ status: 200, data: result.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Add new category */
router.post('/add/brand', async (req, res) => {
    const { brand } = req.body;

    try {
        const check = await db.query('SELECT * FROM brand WHERE name = $1', [brand]);

        if (check.rows.length > 0) {
            res.json({ status: 400, message: 'Brand already exists' });
            return;
        }
            
        const result = await db.query('INSERT INTO brand (name, status) VALUES ($1, $2) RETURNING *', [brand, 1]);

        if (!result) {
            res.json({ status: 400, message: 'Error adding category' });
        } else {
            res.json({ status: 200, message: 'Brand added successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Update category */
router.put('/update/brand/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updater = status === 0 ? 1 : 0;

    try {
        const result = await db.query('UPDATE brand SET status = $1 WHERE id = $2 RETURNING *', [updater, id]);

        if (!result) {
            res.json({ status: 400, message: 'Error updating brand' });
            return;
        } else {
            res.json({ status: 200, message: 'Brand updated successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Delete single brand */
router.delete('/delete/brand/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM brand WHERE id = $1 RETURNING *', [id]);

        if (!result) {
            res.json({ status: 400, message: 'Error deleting brand' });
            return;
        } else {
            res.json({ status: 200, message: 'Brand deleted successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Delete multiple categories */
router.delete('/delete/brands', async (req, res) => {
    const { ids } = req.body;

    try {
        const result = await db.query('DELETE FROM brand WHERE id = ANY($1) RETURNING *', [ids]);

        if (!result) {
            res.json({ status: 400, message: 'Error deleting categories' });
            return;
        } else {
            res.json({ status: 200, message: 'Brands deleted successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
})

export default router;
