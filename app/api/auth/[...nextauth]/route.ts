import {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth/next"
import * as bcrypt from "bcrypt"
import {PrismaAdapter} from "@auth/prisma-adapter"
import type {Adapter} from "next-auth/adapters";

import prisma from "@/lib/prisma"
import {User} from "@prisma/client"

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  // adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password"
        }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          }
        })

        if (!user) throw new Error("Username or Password is not correct")

        // This is naive way of comparing the password
        // const isPasswordCorrect = (credentials?.password === user.password)

        if (!credentials?.password) throw new Error("Please provide your password")
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) throw new Error("Username or Password is not correct")

        if (!user.emailVerified) throw new Error("Please verify your email first!")

        const {password, ...userWithoutPass} = user
        return userWithoutPass
      }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       email: profile.email,
    //       name: profile.name,
    //       image: profile.picture,
    //       role: profile.role ? profile.role : "user"
    //     }
    //   }
    // })
  ],
  callbacks: {
    // async signIn({account, profile}) {
    //   if (account?.provider === "google" && profile) {
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: profile.email
    //       }
    //     })

    //     if (!user) {
    //       await prisma.user.create({
    //         data: {
    //           email: profile.email,
    //           firstName: profile.given_name,
    //           lastName: profile.family_name,
    //           image: profile.picture ?? ''
    //         }
    //       })
    //     }
    //   }
    //   return true
    // },
    async jwt({user, token}) {
      if (user) token.user = user as User

      return token
    },
    async session({session, token}) {
      session.user = token.user

      return session
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}