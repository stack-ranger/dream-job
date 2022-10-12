
import { prisma } from "../db/client"
import { Prisma } from '@prisma/client';
import { createRouter } from "./context"
import { z } from "zod";

/*
type User = {
    id: string;
    email: string;
    password: string;
    repeatedPassword: string;
}
*/

// Google: trigger tRPC on button click (hook)
export const registrationRouter = createRouter()
    .mutation('createUser', { //specifying the input types of the end point
        input: z.object({ 
            id: z.string(),
            email: z.string().min(5).max(20),
            password: z.string().min(6).max(20),
         }),
        resolve: async function ({input}) {
            try {
                await prisma.akselTest.create({
                    data: {
                        ID: input.id,
                        Email: input.email,
                        Password: input.password,
                    }
                });
            } catch (error) {
                console.log(error)
            }
        },
    })