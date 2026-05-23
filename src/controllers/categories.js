
import { getAllCategories, getCategoryDetails, getAllServiceProjectsByCategoryId } from '../models/categories.js';


const showCategoriesPage = async (req, res) => {
    try {
        const title = 'Categories';
        const categories = await getAllCategories();
        res.render('categories', { title, categories });

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

const showCategoryDetailsPage = async (req, res) => {
    try {
        const title = 'Category Details';
        const category = await getCategoryDetails(req.params.id);
        const categoryProjects = await getAllServiceProjectsByCategoryId(req.params.id);
        console.log(category);
        res.render('category', { title, category, categoryProjects });

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export { showCategoriesPage, showCategoryDetailsPage };