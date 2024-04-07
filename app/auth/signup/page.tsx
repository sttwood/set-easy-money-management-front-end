import SignUpForm from '@/app/components/auth/SignUpForm'
import {Image, Link} from '@nextui-org/react'
import React from 'react'

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center px-[5%] pt-[3%] pb-[10%] bg-[url('/images/bg-auth.png')]">
      <SignUpForm />
    </div>
  )
}

export default SignupPage