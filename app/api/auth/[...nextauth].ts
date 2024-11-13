import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/app/lib/helpers/auth";
import dbConnect from "@/app/lib/utils/dbConnect";
import UserModel from "@/models/user";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials) {
          throw new Error("No credentials!");
          // Promise.reject("No credentials!");
        }
        if (!credentials?.email) {
          throw new Error("No email!");
          // Promise.reject("No email!");
        }
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found!");
          // Promise.reject("No user found!");
        }
        const isValid = await verifyPassword(
          credentials?.password,
          user.password,
        );
        if (!isValid) {
          throw new Error("Could not log you in!");
          // Promise.reject("Could not log you in!");
        }
        return {
          email: user.email,
          id: user._id.toString(),
          role: user.role,
          username: user.username,
          provider: user.provider,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    // async jwt({ token, user, other1, other2 }) {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.username = token.username;
      return session;
    },
  },
};

export default NextAuth(authOptions);