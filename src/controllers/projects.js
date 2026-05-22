
import { getAllServiceProjects, getProjectDetails, getUpcomingProjects } from '../models/projects.js';


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
    const title = 'Service Project';
    console.log(project);
    res.render('project', { title, project});
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export { showProjectsPage, showProjectDetailsPage };