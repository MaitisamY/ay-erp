import express from 'express';
import { db } from '../config/connectDB.js';

const router = express.Router();

/* Get all categories */
router.get('/get/categories', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM category ORDER BY id ASC');

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
router.post('/add/category', async (req, res) => {
    const { category } = req.body;

    try {
        const check = await db.query('SELECT * FROM category WHERE name = $1', [category]);

        if (check.rows.length > 0) {
            res.json({ status: 400, message: 'Category already exists' });
            return;
        }
            
        const result = await db.query('INSERT INTO category (name, status) VALUES ($1, $2) RETURNING *', [category, 1]);

        if (!result) {
            res.json({ status: 400, message: 'Error adding category' });
        } else {
            res.json({ status: 200, message: 'Category added successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Update category */
router.put('/update/category/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updater = status === 0 ? 1 : 0;

    try {
        const result = await db.query('UPDATE category SET status = $1 WHERE id = $2 RETURNING *', [updater, id]);

        if (!result) {
            res.json({ status: 400, message: 'Error updating category' });
            return;
        } else {
            res.json({ status: 200, message: 'Category updated successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Delete single category */
router.delete('/delete/category/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM category WHERE id = $1 RETURNING *', [id]);

        if (!result) {
            res.json({ status: 400, message: 'Error deleting category' });
            return;
        } else {
            res.json({ status: 200, message: 'Category deleted successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Delete multiple categories */
router.delete('/delete/categories', async (req, res) => {
    const { ids } = req.body;

    try {
        const result = await db.query('DELETE FROM category WHERE id = ANY($1) RETURNING *', [ids]);

        if (!result) {
            res.json({ status: 400, message: 'Error deleting categories' });
            return;
        } else {
            res.json({ status: 200, message: 'Categories deleted successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
})

export default router;
