import db from './database'

export const getAllUser = async () => {
    try {
        const getAll = db.query(`SELECT * FROM users`);
        const result = getAll.all();

        return result;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const getUserId = async (id: number) => {
    try {
        const getId = db.query(`SELECT * FROM users WHERE id = ?`);
        const result = getId.get(id);

        return result;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const addUser = async (options: { name: string, email: string }) => {
    try {
        const { name, email } = options;
        const add = db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`);
        add.run(name, email);

        return 'User added successfully';
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export const updateUser = async (id: number, options: { name: string, email: string }) => {
    try {
        const { name, email } = options;
        const update = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
        const result = update.run(name, email, id);

        if (result.changes === 0) {
            return { message: 'No user found with the given ID' };
        }

        return 'User updated successfully';
    } catch (error) {
        console.error('Error updating user:', error);
        throw Error('Error updating user');
    }
}

export const deleteUser = async (id: number) => {
    try {
        const delUser = db.prepare('DELETE FROM users WHERE id = ?');
        const result = delUser.run(id);

        if (result.changes === 0) {
            return 'No user found with the given ID';
        }

        return 'User deleted successfully';
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    }
}