import express from 'express';
import { db } from '../config/connectDB.js';

const router = express.Router();

/* Get all organization */
router.get('/get/organization', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM org_info');

        if (!result) {
            res.json({ status: 404, message: 'No data found' });
        } else {
            res.json({ status: 200, data: result.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

export default router;
