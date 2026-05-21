import db from './db.js'

const getAllServiceProjects = async () => {
    const query = `
        SELECT
	        SERVICE_PROJECT.PROJECT_TITLE,
	        ORGANIZATION.ORGANIZATION_NAME, 
            SERVICE_PROJECT.PROJECT_DATE 
        FROM
	        SERVICE_PROJECT
	    JOIN 
            ORGANIZATION ON ORGANIZATION.ORGANIZATION_ID = SERVICE_PROJECT.ORGANIZATION_ID;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
      SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        date
      FROM project
      WHERE organization_id = $1
      ORDER BY date;
    `;
    
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

export { getAllServiceProjects,getProjectsByOrganizationId };