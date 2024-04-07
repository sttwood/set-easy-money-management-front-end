import Authbar from '@/app/components/Authbar'
import React, {ReactNode} from 'react'

const ForgotPassLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Authbar />
      {children}
    </>
  )
}

export default ForgotPassLayout