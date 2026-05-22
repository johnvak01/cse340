import db from './db.js'

const getAllOrganizations = async () => {
    const query = `
        SELECT 
        ORGANIZATION_ID,
        ORGANIZATION_NAME,
		ORGANIZATION_DESCRIPTION,
		CONTACT_EMAIL,
		LOGO_FILENAME
      FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getOrganizationDetails = async (organizationId) => {
      const query = `
      SELECT
        organization_id,
        organization_name,
        organization_description,
        contact_email,
        logo_filename
      FROM organization
      WHERE organization_id = $1;
    `;

      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      // Return the first row of the result set, or null if no rows are found
      return result.rows.length > 0 ? result.rows[0] : null;
};

export { getAllOrganizations, getOrganizationDetails }