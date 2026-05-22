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
        project_title,
        project_description,
        project_location,
        project_date
      FROM service_project
      WHERE organization_id = $1
      ORDER BY project_date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);
    console.log(result.rows);
    return result.rows;
}

const getUpcomingProjects = async (number_of_projects) => {
    const query =
        `SELECT
            PROJECT_ID,
            PROJECT_TITLE,
            PROJECT_DESCRIPTION,
            PROJECT_DATE,
            PROJECT_LOCATION,
            ORGANIZATION.ORGANIZATION_ID,
            ORGANIZATION_NAME
        FROM
            SERVICE_PROJECT
        JOIN ORGANIZATION ON ORGANIZATION.ORGANIZATION_ID = SERVICE_PROJECT.ORGANIZATION_ID 
        LIMIT $1;`;
    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query =
        `SELECT
            PROJECT_ID,
            PROJECT_TITLE,
            PROJECT_DESCRIPTION,
            PROJECT_DATE,
            PROJECT_LOCATION,
            ORGANIZATION.ORGANIZATION_ID,
            ORGANIZATION_NAME
        FROM
            SERVICE_PROJECT
            JOIN ORGANIZATION ON ORGANIZATION.ORGANIZATION_ID = SERVICE_PROJECT.ORGANIZATION_ID
        WHERE
	        PROJECT_ID = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

export { getAllServiceProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };