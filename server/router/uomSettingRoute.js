import express from 'express';
import { db } from '../config/connectDB.js';

const router = express.Router();

/* Get all uoms */
router.get('/get/uoms', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM uom ORDER BY id ASC');

        if (!result) {
            res.json({ status: 500, message: 'Internal server error' });
        } else {
            res.json({ status: 200, data: result.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Add new uom */
router.post('/add/uom', async (req, res) => {
    const { uom } = req.body;

    try {
        const check = await db.query('SELECT * FROM uom WHERE name = $1', [uom]);

        if (check.rows.length > 0) {
            res.json({ status: 400, message: 'UOM already exists' });
            return;
        }

        const result = await db.query('INSERT INTO uom (name, status) VALUES ($1, $2) RETURNING *', [uom, 1]);

        if (!result) {
            res.json({ status: 400, message: 'Error adding UOM' });
            return;
        } else {
            res.json({ status: 200, message: 'UOM added successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Update uom */
router.put('/update/uom/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updater = status === 0 ? 1 : 0;

    try {
        const result = await db.query('UPDATE uom SET status = $1 WHERE id = $2 RETURNING *', [updater, id]);

        if (!result) {
            res.json({ status: 400, message: 'Error updating UOM' });
            return;
        } else {
            res.json({ status: 200, message: 'UOM updated successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Delete single uom */
router.delete('/delete/uom/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM uom WHERE id = $1', [id]);

        if (!result) {
            res.json({ status: 400, message: 'Error deleting UOM' });
            return;
        } else {
            res.json({ status: 200, message: 'UOM deleted successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Delete multiple uoms */
router.delete('/delete/uoms', async (req, res) => {
    const { ids } = req.body;

    try {
        const result = await db.query('DELETE FROM uom WHERE id = ANY($1) RETURNING *', [ids]);

        if (!result) {
            res.json({ status: 400, message: 'Error deleting uoms' });
            return;
        } else {
            res.json({ status: 200, message: 'Uoms deleted successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
})

export default router;
