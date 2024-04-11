"use client"
import {signIn} from 'next-auth/react'
import React from 'react'
import SETButton, {ButtonType} from '../ui/SETButton'
import {useRouter} from 'next/navigation'

interface Props {
  containerStyle?: string
  signInStyle?: string
  signUpStyle?: string
}

const SigninButton = ({containerStyle, signInStyle, signUpStyle}: Props) => {
  const router = useRouter()

  return (
    <div className={`flex items-center gap-4 ${containerStyle}`}>
      <SETButton
        handleClick={() => signIn()}
        title="Sign In"
        type={ButtonType.borderPrimary}
        buttonStyle={`max-h-[40px] min-h-[40px] h-full rounded-[8px] ${signInStyle}`}
      />
      <SETButton
        handleClick={() => {
          router.push('/auth/signup')
        }}
        title="Sign Up"
        type={ButtonType.primary}
        buttonStyle={`max-h-[40px] min-h-[40px] h-full rounded-[8px] ${signUpStyle}`}
      />
    </div>
  )
}

export default SigninButton