import express from 'express';
import { db } from '../config/connectDB.js';

const router = express.Router();

/* Get the tax info */
router.get('/get/tax', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tax LIMIT 1');

        if (result.rows.length === 0) {
            res.json({ status: 404, message: 'No data found' });
        } else {
            res.json({ status: 200, data: result.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
})

/* Add new tax */
// Update name
router.post('/update/tax/name', async (req, res) => {
    const { name } = req.body;

    try {
        const check = await db.query('SELECT * FROM tax WHERE id = 1');
        
        if (check.rows.length === 0) {
            const insert = await db.query('INSERT INTO tax (name) VALUES ($1) RETURNING *', [name]);
            res.json({ status: 200, message: 'Tax name added successfully', data: insert.rows });
        } else {
            const update = await db.query('UPDATE tax SET name = $1 WHERE id = 1 RETURNING *', [name]);
            res.json({ status: 200, message: 'Tax name updated successfully', data: update.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

// Update rate
router.post('/update/tax/rate', async (req, res) => {
    const { rate } = req.body;

    try {
        const check = await db.query('SELECT * FROM tax WHERE id = 1');
        
        if (check.rows.length === 0) {
            const insert = await db.query('INSERT INTO tax (rate) VALUES ($1) RETURNING *', [rate]);
            res.json({ status: 200, message: 'Tax rate added successfully', data: insert.rows });
        } else {
            const update = await db.query('UPDATE tax SET rate = $1 WHERE id = 1 RETURNING *', [rate]);
            res.json({ status: 200, message: 'Tax rate updated successfully', data: update.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

// Update type
router.post('/update/tax/type', async (req, res) => {
    const { type } = req.body;

    try {
        const check = await db.query('SELECT * FROM tax WHERE id = 1');
        
        if (check.rows.length === 0) {
            const insert = await db.query('INSERT INTO tax (type) VALUES ($1) RETURNING *', [type]);
            res.json({ status: 200, message: 'Tax type added successfully', data: insert.rows });
        } else {
            const update = await db.query('UPDATE tax SET type = $1 WHERE id = 1 RETURNING *', [type]);
            res.json({ status: 200, message: 'Tax type updated successfully', data: update.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

// Update authority
router.post('/update/tax/authority', async (req, res) => {
    const { authority } = req.body;

    try {
        const check = await db.query('SELECT * FROM tax WHERE id = 1');
        
        if (check.rows.length === 0) {
            const insert = await db.query('INSERT INTO tax (authority) VALUES ($1) RETURNING *', [authority]);
            res.json({ status: 200, message: 'Tax authority added successfully', data: insert.rows });
        } else {
            const update = await db.query('UPDATE tax SET authority = $1 WHERE id = 1 RETURNING *', [authority]);
            res.json({ status: 200, message: 'Tax authority updated successfully', data: update.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

// Update calculation method
router.post('/update/tax/calculation-method', async (req, res) => {
    const { calculation_method } = req.body;

    try {
        const check = await db.query('SELECT * FROM tax WHERE id = 1');
        
        if (check.rows.length === 0) {
            const insert = await db.query('INSERT INTO tax (calculation_method) VALUES ($1) RETURNING *', [calculation_method]);
            res.json({ status: 200, message: 'Tax calculation method added successfully', data: insert.rows });
        } else {
            const update = await db.query('UPDATE tax SET calculation_method = $1 WHERE id = 1 RETURNING *', [calculation_method]);
            res.json({ status: 200, message: 'Tax calculation method updated successfully', data: update.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

// Update effective date
router.post('/update/tax/effective-date', async (req, res) => {
    const { effective_date } = req.body;

    try {
        const check = await db.query('SELECT * FROM tax WHERE id = 1');
        
        if (check.rows.length === 0) {
            const insert = await db.query('INSERT INTO tax (effective_date) VALUES ($1) RETURNING *', [effective_date]);
            res.json({ status: 200, message: 'Tax effective date added successfully', data: insert.rows });
        } else {
            const update = await db.query('UPDATE tax SET effective_date = $1 WHERE id = 1 RETURNING *', [effective_date]);
            res.json({ status: 200, message: 'Tax effective date updated successfully', data: update.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

// Update notes
router.post('/update/tax/notes', async (req, res) => {
    const { notes } = req.body;

    try {
        const check = await db.query('SELECT * FROM tax WHERE id = 1');
        
        if (check.rows.length === 0) {
            const insert = await db.query('INSERT INTO tax (notes) VALUES ($1) RETURNING *', [notes]);
            res.json({ status: 200, message: 'Tax notes added successfully', data: insert.rows });
        } else {
            const update = await db.query('UPDATE tax SET notes = $1 WHERE id = 1 RETURNING *', [notes]);
            res.json({ status: 200, message: 'Tax notes updated successfully', data: update.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});


export default router