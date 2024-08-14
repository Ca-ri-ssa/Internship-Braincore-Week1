import { Elysia, t } from 'elysia';
import { getUserId, addUser } from './controller';

const app = new Elysia()
    .get("/", () => "Welcome to Elysia Server")
    .get("/users/:id", ({params: {id}}) => getUserId(id), {
        params: t.Object({
            id: t.Numeric(),
        })
    })
    .post("/users", ({body}) => addUser(body), {
        body: t.Object({
            name: t.String(),
            email: t.String(),
        })
    })
    .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)