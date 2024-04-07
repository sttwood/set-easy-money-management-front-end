import Authbar from '@/app/components/Authbar'
import React, {ReactNode} from 'react'

const SignInLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Authbar />
      {children}
    </>
  )
}

export default SignInLayout