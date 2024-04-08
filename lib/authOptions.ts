import {AuthOptions} from "next-auth"
import * as bcrypt from "bcrypt"
import prisma from "./prisma"
import {User} from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
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

        if (!credentials?.password) throw new Error("Please provide your password")
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) throw new Error("Username or Password is not correct")

        if (!user.emailVerified) throw new Error("Please verify your email first!")

        const {password, ...userWithoutPass} = user
        return userWithoutPass
      }
    }),
  ],
  callbacks: {
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