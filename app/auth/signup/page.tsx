/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import SignUpForm from '@/app/components/auth/SignUpForm'
import {useSidebarData} from '@/context/SidebarContext'
import Link from 'next/link'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import {Spin} from 'antd'

const SignupPage = () => {
  const {isRedirect, updateIsRedirect} = useSidebarData()
  const [ mobileSize, setMobileSize ] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobileSize(true);
      } else {
        setMobileSize(false);
      }
    };

    updateIsRedirect(false)

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const onRedirect = () => {
    updateIsRedirect(true)
  }

  return (
    mobileSize ? (
      <div className='flex flex-col justify-center items-center h-screen gap-10'>
        <h2 className='text-center text-xl text-mainDark'>
          You can use our app from download application in the store
        </h2>
        <Link href='/'>
          <Image
            src="/images/googleplay.png"
            alt="google play"
            width={150}
            height={100}
          />
        </Link>
      </div>
    ) : (
      <>
        <div className="flex flex-col items-center px-[5%] pt-[3%] pb-[10%] bg-[url('/images/bg-auth.png')]">
          <SignUpForm handleClick={onRedirect} />
        </div>
        <Spin spinning={isRedirect} fullscreen />
      </>
    )
  )
}

export default SignupPage