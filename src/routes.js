import express from 'express';

import { showIndexPage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { show500ErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';

const router = express.Router();

router.get('/', showIndexPage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
// error-handling routes
router.get('/test-error', show500ErrorPage);

export {router};