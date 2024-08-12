import { Elysia } from 'elysia';

const app = new Elysia()
    .get('/', () => "Hello World", {
            beforeHandle() {
                const time = new Date();
                const wib = new Date(time.getTime() + (7 * 60 * 60 * 1000)); // Convert to WIB (GMT+7)
                console.log(`Time Request: ${wib.toISOString()}`);
            }
        }
    )
    .listen(3000)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)