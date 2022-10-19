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
  session: { strategy: 'jwt' },
  callbacks: {
    // invoked whenever session is checked
    // returns info about userID or tokenID
    session({ session, token }) {
      // if jw. token, 
      if(token){
        session.id = token.id
        session.email = token.email
      }
      return session
    }, 
    
    // invoked when signIn is triggered
    // We grab the id and email and put on the token
    // invoked before session callback
    jwt: async ({ token, user }) => {

      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      
      return token;
    }, 


  },
secret: "test",
jwt: {
  secret: "super-secret",
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
      
      // fires off when we sends sign in request to backend API
      authorize: async(credentials, req) => {

        // User input
        console.log(credentials)

        console.log(credentials)
        const input = JSON.parse(JSON.stringify(credentials)) 


        if(input){
          console.log(input.email)

        }
        // Find User in DB

   
          const user = await prisma.credentialUser.findFirst({
            where: { email: input.email },

          })

        console.log(user)
        if(!user){
          return null
        }
        
        // Check user object password from db with inputPassword
        const isValidPassword = await verify(user.hashedPassword || '', input.password);

        if (!isValidPassword) {
          throw new Error('Password not valid')

          return null;
        } 

        return {
          id: user.id,
          email: user.email,
        }; 

        
        // perform login logic here
        // find out user from DB here
//        return {email: user?.email, id: user?.id, hashedpw: user?.hashedPassword}
        
      }, 
    }),
],


//specify where we can use our sign in function.
// can also specify error page and signout page

pages: {
  //signIn: '../../protected', 
  //newUser: '/auth/protected',
  error: ''
}

}

export default NextAuth(authOptions)
