import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT
	        CATEGORY_NAME
        FROM
	        CATEGORY;`;

    const result = await db.query(query);

    return result.rows;
}

export { getAllCategories }