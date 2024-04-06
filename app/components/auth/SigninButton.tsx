"use client"
import {signIn, signOut, useSession} from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import CustomButton, {ButtonType} from '../ui/CustomButton'
import {useRouter} from 'next/navigation'

const SigninButton = () => {
  const {data: session} = useSession()
  const router = useRouter()

  return (
    <div className='flex items-center gap-4'>
      {session && session.user ? (
        <>
          <Link href={"/profile"} className='hover:text-[#959595]'>
            {`${session.user.firstName} ${session.user.lastName}`}
          </Link>
          <button onClick={() => signOut()} className='text-sky-500 hover:text-sky-600 trasition-colors'>Sign Out</button>
        </>
      ) : (
        <>
          <CustomButton
            handleClick={() => signIn()}
            title="Sign In"
            type={ButtonType.borderPrimary}
            buttonStyle="max-h-[40px] min-h-[40px] h-full rounded-[8px]"
          />
          <CustomButton
            handleClick={() => {
              router.push('/auth/signup')
            }}
            title="Sign Up"
            type={ButtonType.primary}
            buttonStyle="max-h-[40px] min-h-[40px] h-full rounded-[8px]"
          />
        </>
      )}
    </div>
  )
}

export default SigninButton