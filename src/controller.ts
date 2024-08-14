import db from './database'

//TODO: Create a simple API to retrieve user data
//TODO: Implement CRUD operation: Read
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

//TODO: Create a simple API to retrieve user data
//TODO: Implement CRUD operation: Read
export const getUserId = async (id: number) => {
    try {
        const getId = db.query(`SELECT * FROM users WHERE id = ?`);
        const result = getId.get(id);

        if (!result) {
            return new Response(JSON.stringify({
                error: "User not found"
            }, null, 2), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(
            result
        ), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

//TODO: Create a simple API to add user data
//TODO: Implement CRUD operation: Create
export const addUser = async (options: { name: string, email: string }) => {
    try {
        const { name, email } = options;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ 
                error: "Invalid email format" 
            }, null, 2), {
                status: 400,
            });
        }

        const add = db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`);
        add.run(name, email);

        return new Response(JSON.stringify({ 
            message: "User added successfully" 
        }, null, 2), {
            status: 201,
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

//TODO: Implement CRUD operation: Update
export const updateUser = async (id: number, options: { name: string, email: string }) => {
    try {
        const { name, email } = options;
        const update = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
        const result = update.run(name, email, id);

        if (result.changes === 0) {
            return { message: 'No user was found with the given ID' };
        }

        return 'User updated successfully';
    } catch (error) {
        console.error('Error:', error);
        throw Error('Error updating user');
    }
}

//TODO: Implement CRUD operation: Delete
export const deleteUser = async (id: number) => {
    try {
        const delUser = db.prepare('DELETE FROM users WHERE id = ?');
        const result = delUser.run(id);

        if (result.changes === 0) {
            return 'No user was found with the given ID';
        }

        return 'User deleted successfully';
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error deleting user');
    }
}