import { Elysia } from 'elysia';
import { authentication } from './controller/controller';
import db from './database';

const app = new Elysia()
    .get("/", () => "Welcome to Elysia Server")
    .get("/users", ({ set }) => {
        try {
            set.status = 200;
            return db.query('SELECT * FROM users').all();
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    })
    .use(authentication)
    .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)