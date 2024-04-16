import express from 'express';
import multer from 'multer';
import path from 'path';
import { db } from '../config/connectDB.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

/* Get all organization */
router.get('/get/organization', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM org_info');

        if (result.rows.length === 0) {
            res.json({ status: 404, message: 'No data found' });
        } else {
            res.json({ status: 200, data: result.rows });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Update organization */
router.post('/update/organization', async (req, res) => {
    const { name, email, phone, address, website } = req.body

    try {
        // Check if organization details exist in the database
        const result = await db.query('SELECT * FROM org_info LIMIT 1');
        const existingOrg = result.rows[0];

        if (!existingOrg) {
            // Insert new organization details if they don't exist
            const fieldsToInsert = [];
            const valuesToInsert = [];
            if (name !== undefined && name !== null && name !== '') {
                fieldsToInsert.push('name');
                valuesToInsert.push(name);
            }
            if (email !== undefined && email !== null && email !== '') {
                fieldsToInsert.push('email');
                valuesToInsert.push(email);
            }
            if (phone !== undefined && phone !== null && phone !== '') {
                fieldsToInsert.push('phone');
                valuesToInsert.push(phone);
            }
            if (address !== undefined && address !== null && address !== '') {
                fieldsToInsert.push('address');
                valuesToInsert.push(address);
            }
            if (website !== undefined && website !== null && website !== '') {
                fieldsToInsert.push('website');
                valuesToInsert.push(website);
            }

            await db.query(
                `INSERT INTO org_info (${fieldsToInsert.join(', ')}) VALUES (${valuesToInsert.map((_, i) => `$${i + 1}`).join(', ')})`,
                valuesToInsert
            );
        } else {
            // Determine which fields are filled in the incoming request
            const updatedFields = [];
            const values = [];
            if (name) {
                updatedFields.push('name = $1');
                values.push(name);
            }
            if (email) {
                updatedFields.push('email = $2');
                values.push(email);
            }
            if (phone) {
                updatedFields.push('phone = $3');
                values.push(phone);
            }
            if (address) {
                updatedFields.push('address = $4');
                values.push(address);
            }
            if (website) {
                updatedFields.push('website = $5');
                values.push(website);
            }

            // Construct the SQL query for updating the organization
            const query = `UPDATE org_info SET ${updatedFields.join(', ')} WHERE id = $${values.length + 1}`;
            values.push(existingOrg.id);

            // Execute the update query
            await db.query(query, values);
            res.status(200).json({ status: 200, message: 'Organization details updated successfully' });
        }
    } catch (error) {
        console.error('Error updating organization details:', error);
        res.status(500).json({ status: 500, error: 'Internal server error' });
    }
})

router.post('/update/logo', upload.single('logo'), async (req, res) => {
    const logo = req.file
    const logoName = logo ? logo.originalname : null;

    try {
        const result = await db.query('UPDATE org_info SET logo = $1 WHERE id = 1 RETURNING *', [logoName]);

        if (!result) {
            res.json({ status: 400, message: 'Error updating logo' });
            return;
        } else {
            res.json({ status: 200, message: 'Logo updated successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
})

export default router;
