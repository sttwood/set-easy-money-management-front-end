import {getServerSession} from 'next-auth'
import React from 'react'
import {authOptions} from '@/lib/authOptions'
import Image from 'next/image'
import {redirect} from 'next/navigation'

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  console.log(session)

  return (
    <div>
      <Image
        src={user?.image ?? ''}
        height={300}
        width={300}
        alt={`${user?.first_name ?? ''} profile image`}
      />
      <div className="grid grid-cols-4 gap-y-4">
        <p>First Name: </p>
        <p className='col-span-3'>{user?.first_name ?? ''}</p>
        <p>Last Name: </p>
        <p className='col-span-3'>{user?.last_name ?? ''}</p>
        <p>Phone: </p>
        <p className='col-span-3'>{user?.phone ?? ''}</p>
        <p>Email: </p>
        <p className='col-span-3'>{user?.email ?? ''}</p>
        <p>Role: </p>
        <p className='col-span-3'>{user?.role ?? ''}</p>
      </div>
    </div>
  )
}

export default ProfilePage