"use client"

import React from 'react'
import SignInForm from '@/app/components/auth/SignInForm'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const SigninPage = ({searchParams}: Props) => {

  return (
    <div className="flex flex-col items-center px-[5%] pt-[3%] pb-[10%] h-screen bg-[url('/images/bg-auth.png')]">
      <SignInForm callbackUrl={searchParams?.callbackUrl} />
    </div>
  )
}

export default SigninPage