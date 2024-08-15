import { Elysia, t } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { config } from 'dotenv';
import { userModel } from '../userModel';

config();

//TODO: Added login feature with the implementation of JWT token.
export const authentication = new Elysia()
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET_KEY!,
            exp: '7d'
        })
    )
    .post("/register", async ({ jwt, body, set }) => {
        try {
            const password = await Bun.password.hash(body.password, {
                algorithm: "bcrypt",
                cost: 4
            });
    
            const getUser = userModel.getUserEmail(body.email) as User;
    
            if (getUser && getUser.email === body.email) {
                set.status = 400;
                return {
                    message: "User already exist, try another user!"
                }
            }
    
            const addUser = userModel.addUser(body.name, body.email, password) as unknown as User;
            
            set.status = 201;
            return {
                message: "User registered successfully.",
                token: await jwt.sign({ id: addUser.id })
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }, {
        body: t.Object({
            name: t.String({
                required: true
            }),
            email: t.String({
                required: true,
                format: 'email'
            }),
            password: t.String({
                required: true
            })
        })
    })
    .post("/login", async ({ jwt, body, set }) => {
        try {
            const getUser = userModel.getUserEmail(body.email) as User;

            if (!getUser) {
                set.status = 400;
                return {
                    message: "Invalid email or password."
                }
            }

            const validatePass = await Bun.password.verify( 
                body.password,
                getUser.password,
                "bcrypt"
            );


            if (!validatePass) {
                set.status = 400;
                return {
                    success: false,
                    message: "Invalid email or password."
                }
            }

            set.status = 200;
            return {
                message: "Login successful.",
                token: await jwt.sign({ id: getUser.id })
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }, {
        body: t.Object({
            email: t.String({
                required: true,
                format: "email"
            }),
            password: t.String({
                required: true
            })
        }),
    })