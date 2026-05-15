import db from './db.js'

const getAllServiceProjects = async () => {
    const query = `
        SELECT PROJECT_Title,
		ORGANIZATION_NAME,
      FROM public.service_project join public.organization on organization.organization_id = service_project.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllServiceProjects }