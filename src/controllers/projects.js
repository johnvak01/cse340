
import { getAllServiceProjects } from '../models/projects.js';


const showProjectsPage = async (req, res) => {
  try {
    const projects = await getAllServiceProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export { showProjectsPage };