import Authbar from '@/app/components/Authbar'
import React, {ReactNode} from 'react'

const SignUpLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Authbar />
      {children}
    </>
  )
}

export default SignUpLayout