import db from './db.js'

const getAllServiceProjects = async () => {
    const query = `
        SELECT
	        SERVICE_PROJECT.PROJECT_TITLE,
	        ORGANIZATION.ORGANIZATION_NAME 
        FROM
	        SERVICE_PROJECT
	    JOIN 
            ORGANIZATION ON ORGANIZATION.ORGANIZATION_ID = SERVICE_PROJECT.ORGANIZATION_ID;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllServiceProjects }