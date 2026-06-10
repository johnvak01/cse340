import db from './db.js'
import bcrypt from 'bcrypt';
const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
    SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name, u.role_id 
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.email = $1
    `;
    const queryParams = [email];

    const result = await db.query(query, queryParams);
    if (result.rows.length === 0) {
        return null; // User not found
    }
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    const results = await bcrypt.compare(password, passwordHash);
    return results;
};

const authenticateUser = async (email, password) => {
    let user = await findUserByEmail(email);
    if (user == null) {
        return null; // User not found
    }
    const verifyPasswordResult = await verifyPassword(password, user.password_hash);
    if (!verifyPasswordResult) {
        return null; // Password does not match
    }
    delete user.password_hash;
    return user; // Authentication successful
};

const findAllUsers = async () => {
    const query = `
    SELECT u.user_id, u.name, u.email, r.role_name, u.role_id 
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    `;

    const result = await db.query(query);
    if (result.rows.length === 0) {
        console.log("No Users Found");
        return null; // User not found
    }
    return result.rows;
};

const addUserToProject = async (userId, projectId) => {
    const query = `
            INSERT INTO user_to_project (user_id, project_id)
            VALUES ($1, $2)
            RETURNING user_id, project_id
        `;
    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to add user to project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log(`Added user ${userId} to project ${projectId}`);
    }

    return result.rows[0];
};

const removeUserFromProject = async (userId, projectId) => {
    const query = `
    DELETE FROM user_to_project
    WHERE user_id = $1 AND project_id = $2
    `;
    const queryParams = [userId, projectId]; 
    const result = await db.query(query, queryParams);

    if (result.rowCount === 0) {
        throw new Error('Failed to remove user from project');
    }
    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log(`Removed user ${userId} from project ${projectId}`);
    }
    
    return true;


};

const getUserProjects = async (userId) => {
    const query = `
    SELECT utp.project_id, p.project_title
    FROM user_to_project utp
    JOIN service_project p ON p.project_id = utp.project_id
    WHERE utp.user_id = $1
    `;
    const queryParams = [userId];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        console.log(`No projects found for user ${userId}`);
        return []; // No projects found for the user
    }

    return result.rows;
};


export { createUser, authenticateUser, findAllUsers, addUserToProject, removeUserFromProject, getUserProjects };