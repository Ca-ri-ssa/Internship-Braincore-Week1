import db from './database'

interface User {
    id: number;
    name: string;
    email: string;
}

export const getUserId = async (id: number) => {
    try {
        const result = db.query(`SELECT * FROM users WHERE id = ${id}`).all();
        return result;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const addUser = async (options: { name: string, email: string }) => {
    try {
        const { name, email } = options;
        db.query(`INSERT INTO users (name, email) VALUES (?, ?)`).get(name, email);
        return 'User added successfully';
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}