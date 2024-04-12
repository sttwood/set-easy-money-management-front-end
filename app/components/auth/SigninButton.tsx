"use client"
import {signIn} from 'next-auth/react'
import React, {Dispatch, SetStateAction} from 'react'
import SETButton, {ButtonType} from '../ui/SETButton'
import {useRouter} from 'next/navigation'

type Props = {
  containerStyle?: string
  signInStyle?: string
  signUpStyle?: string
  handleClick?: () => void
}

const SigninButton = (props: Props) => {
  const router = useRouter()
  const {
    containerStyle,
    signInStyle,
    signUpStyle,
    handleClick
  } = props

  return (
    <div className={`flex items-center gap-4 ${containerStyle}`}>
      <SETButton
        handleClick={() => {
          handleClick && handleClick()
          signIn()
        }}
        title="Sign In"
        type={ButtonType.borderPrimary}
        buttonStyle={`max-h-[40px] min-h-[40px] h-full rounded-[8px] ${signInStyle}`}
      />
      <SETButton
        handleClick={() => {
          handleClick && handleClick()
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