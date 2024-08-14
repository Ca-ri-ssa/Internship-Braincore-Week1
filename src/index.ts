import { Elysia, t } from 'elysia';
import { getAllUser, getUserId, addUser, updateUser, deleteUser } from './controller';

const app = new Elysia()
    .get("/", () => "Welcome to Elysia Server")
    .get("/users", () => getAllUser())
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
    .put("/users/:id", ({params: {id}, body}) => updateUser(id, body), {
        params: t.Object({
            id: t.Numeric(),
        }),
        body: t.Object({
            name: t.String(),
            email:t.String()
        })
    })
    .delete("/users/del/:id", ({params: {id}}) => deleteUser(id), {
        params: t.Object({
            id:t.Numeric(),
        })
    })
    .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)