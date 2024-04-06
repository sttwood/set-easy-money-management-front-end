import SignUpForm from '@/app/components/auth/SignUpForm'
import {Image, Link} from '@nextui-org/react'
import React from 'react'

const SignupPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3 p-10'>
      <div className='md:col-span-2 flex justify-center items-center'>
        <p className='text-center p-2'>Already Signed up?</p>
        <Link href={'/auth/signin'}>Sign In</Link>
      </div>
      <SignUpForm />
      <Image
        src='/images/login.png'
        alt='login form'
        width={500}
        height={500}
      />
    </div>
  )
}

export default SignupPage