import db from "./database";

export class userModel {
    static getAllUser() {
        const getQuery = db.query('SELECT * FROM users');
        return getQuery.all();
    }

    static getUserId(id: number) {
        const getQuery = db.query('SELECT * FROM users WHERE id = ?');
        return getQuery.get(id);
    }

    static getUserEmail(email: string) {
        const getQuery = db.query('SELECT * FROM users WHERE email = ?');
        return getQuery.get(email);
    }

    static getUserName(name: string) {
        const getQuery = db.query('SELECT * FROM users WHERE name = ?');
        return getQuery.get(name);
    }

    static addUser(
        name: string,
        email: string,
        password: string
    ) {
        const getQuery = db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        return getQuery.run(name, email, password)
    }
}