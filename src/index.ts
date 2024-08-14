import { Elysia } from 'elysia';

const app = new Elysia()
    // TODO: Create a basic Elysia app with one route, which returns "Hello World"
    .get('/', () => "Hello World", {
            // TODO: Add middleware to write the time request
            beforeHandle() {
                const time = new Date();
                const wib = new Date(time.getTime() + (7 * 60 * 60 * 1000)); // Convert to WIB (GMT+7)
                console.log(`Time Request: ${wib.toISOString()}`);
            }
        }
    )
    .listen(3000)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)