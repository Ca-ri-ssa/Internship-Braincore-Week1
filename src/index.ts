import { Elysia } from 'elysia';
import { authentication } from './controller/controller';
import db from './database';
import { config } from 'dotenv';

config();

export const app = new Elysia()
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
    .use(authentication);

//TODO: Implement HTTPS
const server = Bun.serve({
    fetch: app.handle,
    port: 3000,
    hostname: "localhost",
    tls: {
        key: Bun.file(process.env.PATH_TO_KEY as string),
        cert: Bun.file(process.env.PATH_TO_CERT as string),
    }
});

console.log(`🦊 Elysia is running at https://${server.hostname}:${server.port}`);