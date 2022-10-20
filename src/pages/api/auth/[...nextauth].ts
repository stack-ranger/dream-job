import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { env } from '~/env/server.mjs'
import { prisma } from '~/server/db/client'
import { verify } from 'argon2'
interface IUser {
  
}
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  callbacks: {
    // invoked whenever session is checked
    // returns info about userID or tokenID
    session({ session, token, user }) {
      // if jw. token, give session some of its info
      if (token) {
        session.id = token.id
        session.sessionToken = token.id
        session.userId = token.id
       // session.user = token.user

      }

      return session
    },

    // invoked when signIn is triggered
    // We grab the id and email and put on the token
    // invoked before session callback
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.user = user
        token.email = user.email
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

      // fires off when we sends signIn request to backend API
      authorize: async (credentials, req) => {
        //user input
        const input = JSON.parse(JSON.stringify(credentials))
        
        const user = await prisma.user.findFirst({
          where: { email: input.email },
        })
        console.log(input)
        console.log("från trpx auth",user)

        if (!user) {
          return null
        }
        return{
          userId: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image
        }
        // Compare user object hashed password from db with inputPassword
       /*
        const isValidPassword = await verify(user.hashedPassword || '', input.password)

        if (!isValidPassword) {
          throw new Error('Password not valid')
          return null
        }

        return {
          userId: user.userId,
          email: user.email,
        } */
      },
    }),
  ],
}

export default NextAuth(authOptions)
