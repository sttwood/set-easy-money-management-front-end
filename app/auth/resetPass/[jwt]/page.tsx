import ResetPasswordForm from '@/app/components/auth/ResetPasswordForm'
import {verifyJwt} from '@/lib/jwt'
import React from 'react'

interface Props {
  params: {
    jwt: string
  }
}

const ResetPasswordPage = ({params}: Props) => {
  const payload = verifyJwt(params.jwt)

  if (!payload) return (
    <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
      The URL is not valid!
    </div>
  )

  return (
    <div className="flex flex-col items-center px-[5%] pt-[3%] pb-[10%] h-screen bg-[url('/images/bg-auth.png')]">
      <ResetPasswordForm jwtUserId={params.jwt} />
    </div>
  )
}

export default ResetPasswordPage