import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string; // TODO: Change to Role type
      username?: string;
    } & DefaultSession["user"]
  }

  interface User {
    role?: string; // TODO: Change to Role type
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    sub?: string;
    role?: string;
    username?: string;
  }
}