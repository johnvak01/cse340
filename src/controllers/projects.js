
import { getAllServiceProjects, getProjectDetails, getUpcomingProjects } from '../models/projects.js';
import {getAllCategoriesbyServiceProjectID} from '../models/categories.js';


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
    console.log("Categories: ", categories);
    const title = 'Service Project';
    res.render('project', { title, project, categories});
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export { showProjectsPage, showProjectDetailsPage };