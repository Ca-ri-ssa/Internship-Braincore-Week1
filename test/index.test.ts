import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import { app } from '../src/index';
import db from '../src/database';

//TODO: Unit Testing
describe('Elysia', () => {
    let server: any;
    const port = 3002;

    beforeAll(async () => {
        server = app.listen({ port: port });

        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
        .run('User Dummy', 'user@dummy.com', 'dummy12345678');
    })

    afterAll(async () => {
        db.query('DELETE FROM users').run();
        server.stop();
    })

    it('Should return a list of users to GET /users', async () => {
        const response = await fetch(`http://localhost:${port}/users`);
        const users = await response.json();

        expect(response.status).toBe(200);
        expect(users).toEqual([
            { 
                id: 1, 
                name: 'User Dummy', 
                email: 'user@dummy.com', 
                password: 'dummy12345678' 
            }
        ]);
    })

    it('Should return a welcome message at GET /', async () => {
        const response = await fetch(`http://localhost:${port}/`);
        const text = await response.text();

        expect(response.status).toBe(200);
        expect(text).toBe('Welcome to Elysia Server');
    });
});