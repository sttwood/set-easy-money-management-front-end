import {activateUser} from '@/lib/actions/authAction'
import {signIn} from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: {
    jwt: string
  }
}

const ActivationPage = async ({params}: Props) => {
  const result = await activateUser(params.jwt)

  const handleSignInClick = () => {
    signIn()
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/images/bg-auth.png')]">
      {result === "userNotExist" ? (
        <p className='text-[30px]'>The user does not exist</p>
      ) : result === "alreadyActivated" ? (
        <p className='text-[30px] text-bold'>The user is already activated</p>
      ) : result === "success" ? (
        <p className='text-[30px]'>Success! The user has been activated</p>
      ) : (
        <p className='text-[30px]'>Oops! Something went wrong!</p>
      )}
      <p>
        <Link href="/" className='text-primary hover:text-hoverPrimary transition-all underline'>Click Here!</Link> to return to the Home page
      </p>
    </div>
  )
}

export default ActivationPage