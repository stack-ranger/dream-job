import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { env } from '~/env/server.mjs'
import { prisma } from '~/server/db/client'
import { verify } from 'argon2';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    // invoked whenever session is checked
    // returns info about userID or tokenID
    session({ session, user, token }) {
      console.log(session, user, token)
      if (session.user) {
        session.user.id = user.id
      }
      else if(token){
        session.id = token.id
      }
      return session
    },
    // invoked when a token is created or updated
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      
      return token;
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
      authorize: async(credentials, req) => {
        console.log(req)

        // User input
        const {email, password} = credentials as {
          email: string;
          password: string;
        };

        // Find User in DB
        const user = await prisma.credentialUser.findFirst({
          where: { email: email },
        });
        
        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.hashedPassword || '', password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };

        /*
        // perform login logic here
        // find out user from DB here
        if(email !== 'aksel@live.se' || password !== '1234'){
          throw new Error('Invalid Credentials')
        }

        return {id: '1234', name:'Aksel Uhr', email:'aksel@live.se'} */
      }, 
    }),
],


//specify where we can use our sign in function.
// can also specify error page and signout page

jwt: {
  secret: "super-secret",
  maxAge: 15 * 24 * 30 * 60, // 15 days
},
pages: {
  signIn: '/auth/signin', 
  newUser: '/auth/protected',
  error: ''
}

}

export default NextAuth(authOptions)
