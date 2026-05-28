import { getAllCategories, getCategoryDetails, getAllServiceProjectsByCategoryId, getAllCategoriesbyServiceProjectID, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getAllCategoriesbyServiceProjectID(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };