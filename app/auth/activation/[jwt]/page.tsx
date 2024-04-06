import {activateUser} from '@/lib/actions/authAction'
import React from 'react'

interface Props {
  params: {
    jwt: string
  }
}

const ActivationPage = async ({params}: Props) => {
  const result = await activateUser(params.jwt)
  console.log(result)

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      {result === "userNotExist" ? (
        <p className='text-red-500'>The user does not exist</p>
      ) : result === "alreadyActivated" ? (
        <p className='text-red-500'>The user is already activated</p>
      ) : result === "success" ? (
        <p className='text-green-500'>Success! The user has been activated</p>
      ) : (
        <p className='text-red-500 text-2xl'>Oops! Something went wrong!</p>
      )}
    </div>
  )
}

export default ActivationPage