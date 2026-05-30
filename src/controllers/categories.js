import { getAllCategories, getCategoryDetails, getAllServiceProjectsByCategoryId, getAllCategoriesbyServiceProjectID, updateCategoryAssignments, createCategory, updateCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import {body, validationResult} from 'express-validator';

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 150 }).withMessage('Title must be between 3 and 150 characters'),
];



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


const showNewCategoryForm = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Add New Service Project Category';

  res.render('new-category', { title, categories });
}

const processNewCategoryForm = async (req, res) => {
  // Extract form data from req.body
  const { name } = req.body;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Loop through validation errors and flash them
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    // Redirect back to the new project form
    return res.redirect('/new-category');
  }

  try {
    // Create the new project in the database
    const newCategoryId = await createCategory(name);

    req.flash('success', 'New service project category created successfully!');
    res.redirect(`/category/${newCategoryId}`);
  } catch (error) {
    console.error('Error creating new project:', error);
    req.flash('error', 'There was an error creating the service project category.');
    res.redirect('/new-category');
  }
};


const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const categoryDetails = await getCategoryDetails(categoryId);
  const title = 'Edit Category';
  res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // Validation failed - loop through errors
    results.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    // Redirect back to the edit organization form
    return res.redirect('/edit-category/' + req.params.id);
  }

  const categoryId = req.params.id;
  const { name } = req.body;

  console.log(categoryId);
  await updateCategory(categoryId,name);

  // Set a success flash message
  req.flash('success', 'Category updated successfully!');

  res.redirect(`/category/${categoryId}`);

};
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, processEditCategoryForm, showEditCategoryForm, categoryValidation };