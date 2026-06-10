
import { getAllServiceProjects, getProjectDetails, getUpcomingProjects, createProject, updateProject } from '../models/projects.js';
import { getAllCategoriesbyServiceProjectID } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
import { addUserToProject, removeUserFromProject, getUserProjects } from '../models/users.js';
import { body, validationResult } from 'express-validator';

const projectValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required')
    .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Date must be a valid date format'),
  body('organizationId')
    .notEmpty().withMessage('Organization is required')
    .isInt().withMessage('Organization must be a valid integer')
];

const showProjectsPage = async (req, res) => {
  const NUMBER_OF_UPCOMING_PROJECTS = 5;
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

const showProjectDetailsPage = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const categories = await getAllCategoriesbyServiceProjectID(projectId);
    let userProject = false;
    if (req.session.user) {
      const userProjects = await getUserProjects(req.session.user.user_id);
      if (userProjects != null) {
        userProject = userProjects.some(p => p.project_id === parseInt(projectId));
      };
    };

    console.log("Categories: ", categories);
    const title = 'Service Project';
    res.render('project', { title, project, categories, userProject });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

const showNewProjectForm = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Add New Service Project';

  res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
  // Extract form data from req.body
  const { title, description, location, date, organizationId } = req.body;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Loop through validation errors and flash them
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    // Redirect back to the new project form
    return res.redirect('/new-project');
  }

  try {
    // Create the new project in the database
    const newProjectId = await createProject(title, description, location, date, organizationId);

    req.flash('success', 'New service project created successfully!');
    res.redirect(`/project/${newProjectId}`);
  } catch (error) {
    console.error('Error creating new project:', error);
    req.flash('error', 'There was an error creating the service project.');
    res.redirect('/new-project');
  }
};

// edit project forms

const showEditProjectForm = async (req, res) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails(projectId);
  const organizations = await getAllOrganizations();
  const title = 'Edit Project';
  console.log(projectDetails.project_date.toISOString().split('T')[0]);
  res.render('edit-project', { title, projectDetails, organizations });
};

const processEditProjectForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // Validation failed - loop through errors
    results.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    // Redirect back to the edit organization form
    return res.redirect('/edit-project/' + req.params.id);
  }

  const projectId = req.params.id;
  const { organizationId, title, description, location, date } = req.body;
  console.log(date);
  await updateProject(projectId, organizationId, title, description, location, date);

  // Set a success flash message
  req.flash('success', 'Organization updated successfully!');

  res.redirect(`/project/${projectId}`);

};

const processAddVolunteer = async (req, res) => {
  const project_id = req.params.projectID;
  const user_id = req.session.user.user_id;
  const result = await addUserToProject(user_id, project_id);
  req.flash('success', 'You have successfully volunteered for this project!');
  res.redirect(`/project/${project_id}`);
};

const processRemoveVolunteer = async (req, res) => {
  const project_id = req.params.projectID;
  const user_id = req.session.user.user_id;
  const result = await removeUserFromProject(user_id, project_id);
  req.flash('success', 'You have successfully removed yourself from this project.');
  res.redirect(`/project/${project_id}`);
};


export { showProjectsPage, showProjectDetailsPage, processNewProjectForm, showNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm, processAddVolunteer, processRemoveVolunteer };