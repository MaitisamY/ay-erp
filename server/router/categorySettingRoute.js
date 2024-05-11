import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

/* Get all categories */
router.get('/get/categories', async (req, res) => {
    try {
        const result = await Category.findAll({
            order: [['id', 'ASC']]
        });

        if (result.length === 0) {
            res.json({ status: 500, message: 'No categories found' });
        } else {
            res.json({ status: 200, data: result });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

/* Add new category */
router.post('/add/category', async (req, res) => {
    const { category } = req.body;

    try {
        const check = await Category.findOne({
            where: { name: category }
        });

        if (check) {
            res.json({ status: 400, message: 'Category already exists' });
            return;
        }
            
        await Category.create({
            name: category,
            status: 1
        });

        res.json({ status: 200, message: 'Category added successfully' });
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
        const result = await Category.update(
            { status: updater },
            { where: { id: id } }
        );

        if (result[0] === 0) {
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
        const result = await Category.destroy({
            where: { id: id }
        });

        if (result === 0) {
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
        const result = await Category.destroy({
            where: { id: ids }
        });

        if (result === 0) {
            res.json({ status: 400, message: 'Error deleting categories' });
            return;
        } else {
            res.json({ status: 200, message: 'Categories deleted successfully' });
        }
    } catch (error) {
        res.json({ status: 500, message: error.message });
    }
});

export default router;
