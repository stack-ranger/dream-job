import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { env } from '~/env/server.mjs'
import { prisma } from '~/server/db/client'

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
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
      
      // fires off when we sends sign in request to backend API
      authorize(credentials, req){
        console.log(req)
        const {id, email, password} = credentials as {
          id: string;
          email: string;
          password: string;
        };
        // perform login logic here
        // find out user from DB here
        if(email !== 'aksel@live.se' || password !== '1234'){
          throw new Error('Invalid Credentials')
        }

        return {id: '1234', name:'Aksel Uhr', email:'aksel@live.se'}
      }, 
    }),
],
//specify where we can use our sign in function.
// can also specify error page and signout page.
pages: {
  signIn: '/auth/signin', 
  error: ''
}

}

export default NextAuth(authOptions)
