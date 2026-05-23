import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT
	        CATEGORY_NAME, CATEGORY_ID
        FROM
	        CATEGORY;`;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            CATEGORY_NAME, CATEGORY_ID
        FROM
            CATEGORY
        WHERE
            CATEGORY_ID = $1;`;

    const result = await db.query(query, [categoryId]);

    return result.rows[0];
}

const getAllServiceProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            CTP.PROJECT_ID, CTP.CATEGORY_ID, SP.PROJECT_TITLE, SP.PROJECT_DESCRIPTION, C.CATEGORY_NAME
        FROM
            CATEGORY_TO_PROJECT CTP
        JOIN
            CATEGORY C ON CTP.CATEGORY_ID = C.CATEGORY_ID
        JOIN
            SERVICE_PROJECT SP ON SP.PROJECT_ID = CTP.PROJECT_ID
        WHERE
            CTP.CATEGORY_ID = $1;`;

    const result = await db.query(query, [categoryId]);

    return result.rows;
}

const getAllCategoriesbyServiceProjectID = async (projectId) => {
    const query = `
        SELECT
            CTP.PROJECT_ID, CTP.CATEGORY_ID, SP.PROJECT_TITLE, SP.PROJECT_DESCRIPTION, C.CATEGORY_NAME
        FROM
            CATEGORY_TO_PROJECT CTP
        JOIN
            CATEGORY C ON CTP.CATEGORY_ID = C.CATEGORY_ID
        JOIN
            SERVICE_PROJECT SP ON SP.PROJECT_ID = CTP.PROJECT_ID
        WHERE
            CTP.Project_ID = $1;`;

    const result = await db.query(query, [projectId]);
    if (result.rows.length === 0) {
        return [];
    }
    return result.rows;
};

export { getAllCategories, getCategoryDetails, getAllServiceProjectsByCategoryId, getAllCategoriesbyServiceProjectID };