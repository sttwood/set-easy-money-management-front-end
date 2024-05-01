"use server"

import {User} from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt"
import {compileActivationTemplate, compileResetTemplate, sendMail} from "../mail";
import {signJwt, verifyJwt} from "../jwt";

export async function registerUser(user: Omit<User, 'id' | 'email_verified' | 'image'>) {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10)
    }
  })
  const {password: hasNewPassword, ...data} = result

  const jwtUserId = signJwt({
    id: result.id
  })
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`
  const body = compileActivationTemplate(user.first_name ?? '', activationUrl)
  await sendMail({
    to: user.email ?? '',
    subject: "Activate your Account",
    body
  })

  if (data) {
    return "success"
  } else {
    throw new Error("Something went wrong! Please try again.")
  }
}

type ActivateUserFunc = (jwtUserId: string) => Promise<"userNotExist" | "alreadyActivated" | "success">

export const activateUser: ActivateUserFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId)
  const userId = payload?.id
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!user) return "userNotExist"
  if (user.email_verified) return "alreadyActivated"
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      email_verified: new Date()
    }
  })

  return "success"
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) throw new Error("User does not exist")

  // ToDo: Send Email with Password Reset Link
  const jwtUserId = signJwt({
    id: user.id
  })
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`
  const body = compileResetTemplate(user.first_name ?? '', resetPassUrl)
  const sendResult = await sendMail({
    to: user.email ?? '',
    subject: "Reset Password",
    body: body
  })

  return true
}

type ResetPasswordFunc = (jwtUserId: string, password: string) => Promise<"userNotExist" | "success">

export const resetPassword: ResetPasswordFunc = async (jwtUserId, password) => {
  const payload = verifyJwt(jwtUserId)
  if (!payload) return "userNotExist"

  const userId = payload.id
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!user) return "userNotExist"

  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password: await bcrypt.hash(password, 10)
    }
  })
  if (result) {
    return "success"
  } else {
    throw new Error("Something went wrong! Please try again.")
  }

}