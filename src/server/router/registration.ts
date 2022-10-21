import { prisma } from '../db/client'
import { Prisma } from '@prisma/client'
import { createRouter } from './context'
import { z } from 'zod'
import * as trpc from '@trpc/server'
import { hash } from 'argon2'
import { TRPCError } from '@trpc/server'
import { checkValidEmail } from '~/utils/validator'

/*
type User = {
    id: string;
    email: string;
    password: string;
    repeatedPassword: string;
}
*/

// Google: trigger tRPC on button click (hook)
export const registrationRouter = createRouter().mutation('createUser', {
  //specifying the input types of the end point
  input: z.object({
    email: z.string(), //.min(2).max(20),
    password: z.string(), //.min(2).max(20),
  }),
  resolve: async function ({ input, ctx }) {
    const { email, password } = input
    console.log(email)
    console.log(password)

    
    if (!checkValidEmail(email)) {
        return {
            status: 400,
            message: 'Email format not valid.',
          }
    }

    // Check if user exists.
    // Here we can check the google table as well.
    const exists = await prisma.user.findFirst({
      where: { email },
    })

    if (exists) {
        return {
            status: 400,
            message: 'User already exists.',
          }
    }

    const hashedPassword = await hash(password)
    const userId = await hash(email)

    try {
      const userResult = await prisma.user.create({
        data: {
          id: userId,
          name: email,
          email: email,
          emailVerified: null,
          image: '',
          //hashedPassword: hashedPassword,
        },
      })
      await prisma.password.create({
        data: {
          userId: userId,
          email: email,
          password: hashedPassword,
        },
      })
      return {
        status: 201,
        message: 'Account created. You can now sign in.',
        result: userResult.email,
      }
    } catch (error) {
      console.log(error)
    }
  },
})
