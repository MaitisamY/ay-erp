import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

// Validation middleware
const validations = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
    body('role').notEmpty().withMessage('Role is required')
];

// Add new user
router.post('/add/user', validations, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { name, email, phone, address, role, password } = req.body;

    try {
        const check = await User.findOne({ where: { email } });

        if (check) {
            return res.status(400).json({ status: 400, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Construct the user data object
        const userData = { name, email, role, password: hashedPassword };
        if (phone) userData.phone = phone;
        if (address) userData.address = address;

        await User.create(userData);

        res.status(200).json({ status: 200, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error.message); // Log the error message
        console.error(error.stack); // Log the stack trace
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

export default router;