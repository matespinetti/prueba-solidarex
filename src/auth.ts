import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import prisma from "../lib/prisma"
import authConfig from "./auth.config"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
})