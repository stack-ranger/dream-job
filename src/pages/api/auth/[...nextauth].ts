import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { env } from '~/env/server.mjs'
import { prisma } from '~/server/db/client'
import { verify } from 'argon2'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  callbacks: {
    session({ session, token }) {
      // CREDENTIALS LOGIN
      // if jw. token and user in the session, give session the user ID.
      // session.user is created somewhere when we login successfully.
      if (token?.userId && session?.user) {
        session.user.id = String(token?.userId)
      }

      // token sub is attached to the JWT if user uses Google
      // The token sub = the userID so we append it to the session
      // It is then used for different functionality inside the app
      if (token?.sub && session?.user) {
        session.user.id = token?.sub
      }
      return session
    },

    // invoked when signIn() is triggered, before session callback.
    // In case of a credential signIn, We grab the user ID and put it on the token
    // In case of google signIn, we do nothing. Just return token
    jwt: async ({ token, user }) => {
      // @ts-ignore
      if (user?.userId) {
        // @ts-ignore
        token.userId = user?.userId
        // @ts-ignore
        token.isCredential = user?.isCredential
      }
      return token
    },
  },
  secret: 'test',
  jwt: {
    secret: 'super-secret',
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},

      // fires off when we send signIn request to backend API
      // @ts-ignore
      authorize: async (credentials) => {
        //user input
        const input = JSON.parse(JSON.stringify(credentials))

        // return user from db
        const user = await prisma.user.findFirst({
          where: { email: input.email },
        })

        // return hashed password from db (table: password)
        const userPassword = await prisma.password.findUnique({
          where: { email: input.email },
        })

        if (userPassword?.password) {
          await verify(userPassword.password, input.password)
        }

        if (!userPassword?.password) return null

        // check if password exist (not the case for Google)
        if (userPassword?.password) {
          if (!(await verify(userPassword.password, input.password))) {
            return null
          }
        } else {
          return null
        }

        // if user, return it
        if (user) {
          return {
            name: user.email,
            email: user.email,
            userId: user.id,
            isCredential: true,
          }
        }
        return null
      },
    }),
  ],
}

export default NextAuth(authOptions)
