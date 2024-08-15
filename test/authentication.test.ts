import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { authentication } from '../src/controller/controller';
import db from '../src/database';

//TODO: Unit Testing
describe('Authentication', () => {
    let server: any;
    const port = 3001;

    beforeAll(() => {
        server = authentication.listen({ port: port });
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
    });

    afterAll(() => {
        db.query('DELETE FROM users').run();
        server.stop();
    });

    it('Should register a new user', async () => {
        const response = await fetch(`http://localhost:${port}/register`, {
            method: 'POST',
            body: JSON.stringify({ 
                name: 'User Dummy', 
                email: 'user@dummy.com', 
                password: 'dummy12345678' 
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        expect(response.status).toBe(201);
        expect(result.message).toBe('User registered successfully.');
        expect(result.token).toBeTruthy();
    });

    it('should not register a user with an existing email', async () => {
        const response = await fetch(`http://localhost:${port}/register`, {
            method: 'POST',
            body: JSON.stringify({ 
                name: 'User Dummy', 
                email: 'user@dummy.com',
                password: 'dummy12345678' 
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.message).toBe('User already exist, try another user!');
    });

    it('Should login if an existing user', async () => {
        const response = await fetch(`http://localhost:${port}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: 'user@dummy.com', 
                password: 'dummy12345678' 
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.message).toBe('Login successful.');
        expect(result.token).toBeTruthy();
    });

    it('Should not login with incorrect password', async () => {
        const response = await fetch(`http://localhost:${port}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: 'user@dummy.com', 
                password: 'wrongpassword' 
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.message).toBe('Invalid email or password.');
    });
});