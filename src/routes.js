import express from 'express';

import { showIndexPage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showNewOrganizationForm} from './controllers/organizations.js';
import { processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm} from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { show500ErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
router.post('/edit-organization/:id', processEditOrganizationForm);

const router = express.Router();

router.get('/', showIndexPage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation ,processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', processEditOrganizationForm);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
// error-handling routes
router.get('/test-error', show500ErrorPage);

export {router};