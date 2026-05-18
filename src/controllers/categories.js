
import { getAllCategories } from '../models/categories.js';


const showCategoriesPage = async (req, res) => {
    try {
        const title = 'Categories';
        const categories = await getAllCategories();
        res.render('categories', { title, categories });

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export { showCategoriesPage };