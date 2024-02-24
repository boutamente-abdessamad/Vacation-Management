import NextAuth ,{NextAuthOptions,User} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma  from "@prisma/client";
import { login } from "@api/client/login" 


const options : NextAuthOptions  = {
  providers: [
    CredentialsProvider({
        name : "Credentials",
        id : "credentials",
        credentials: { },
        async authorize(credentials : {  email: string; password: string; }  ): Promise<User | null> {
            try {
              const userCredentials = {
                email: credentials.email ,
                password: credentials.password,
              } 
              const user : User =  await login(userCredentials);
              return user ? user : null;
          } catch (e: any) {
              return null;
          }
          
        } 


    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  pages: {
    signIn: "/dashboard",
    signOut: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async session({session ,user, token} ) {
      if (token.user) {
        // console.log("User Account ", user);
        session.user = token.user as User;
      }
      // console.log(session, "as session user");
      return await session;
    },

    async jwt({ token, user }) {
      const isSignedIn = user ? true : false;
      if (isSignedIn) {
        token.user={...user as User};
      }

      return await token;
    },
  },
};

const handler = NextAuth(options);
export { handler as GET, handler as POST,options as nextAuthOptions };