import express from 'express';

import { showIndexPage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showNewOrganizationForm} from './controllers/organizations.js';
import { processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm} from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidation, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { show500ErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showUsersPage, requireRoleD } from './controllers/users.js';


const router = express.Router();
//default route
router.get('/', showIndexPage);

//organization routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization',requireRole('admin'),  organizationValidation ,processNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), processEditOrganizationForm);
//project routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);

//category routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

// error-handling routes
router.get('/test-error', show500ErrorPage);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

// User List routes
router.get('/users', requireRoleD('admin'), showUsersPage);

export {router};