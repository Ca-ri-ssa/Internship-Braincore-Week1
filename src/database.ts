import { Database } from "bun:sqlite";

const db = new Database('tugas2-db.sqlite');
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)');
console.log('Connected to the SQLite database.');

export default db;