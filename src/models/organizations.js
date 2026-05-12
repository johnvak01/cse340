import db from './db.js'

const getAllOrganizations = async () => {
    const query = `
        SELECT ORGANIZATION_NAME,
		ORGANIZATION_DESCRIPTION,
		CONTACT_EMAIL,
		LOGO_FILENAME
      FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllOrganizations }