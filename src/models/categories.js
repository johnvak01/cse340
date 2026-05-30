import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT
	        CATEGORY_NAME, CATEGORY_ID
        FROM
	        CATEGORY
        ORDER BY
            CATEGORY_ID ASC;`;

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

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO CATEGORY_TO_PROJECT (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM CATEGORY_TO_PROJECT
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO CATEGORY (CATEGORY_NAME)
        VALUES ($1)
        RETURNING CATEGORY_ID;
    `;

    const result = await db.query(query, [name]);
    return result.rows[0].category_id;
}

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE CATEGORY
        SET CATEGORY_NAME = $2
        WHERE CATEGORY_ID = $1
        RETURNING CATEGORY_ID;
    `;

    console.log(name, categoryId)

    const result = await db.query(query, [categoryId, name]);
    console.log(result);
    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', categoryId);
    }
    return result.rows[0].category_id
}

export { getAllCategories, getCategoryDetails, getAllServiceProjectsByCategoryId, getAllCategoriesbyServiceProjectID, updateCategoryAssignments, createCategory, updateCategory };