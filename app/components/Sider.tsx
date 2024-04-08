"use client"

import {signOut} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useState} from 'react'

const Siderbar = () => {
  const [ collapsed, setCollapsed ] = useState(window.innerWidth < 1024)
  const [ isDashboardHovered, setIsDashboardHovered ] = useState(false)
  const [ isInExHovered, setIsInExHovered ] = useState(false)
  const [ isSavingsHovered, setIsSavingsHovered ] = useState(false)
  const [ isSupportHovered, setIsSupportHovered ] = useState(false)
  const [ isSignOutHovered, setIsSignOutHovered ] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return (
    <div
      className={`flex flex-col justify-between bg-[#fff] h-screen py-6 transition-all ${collapsed ? 'w-[60px]' : 'w-[275px]'}`}
    >
      <div className='flex flex-col'>
        <div className='flex justify-center items-center mb-10'>
          <Image
            src={collapsed ? "/images/logo-set.png" : "/images/Logo.png"}
            alt="logo"
            width={collapsed ? 46 : 200}
            height={collapsed ? 46 : 50}
          />
        </div>
        <div className={`flex flex-row mb-5 ${collapsed ? 'px-0 justify-center' : 'px-[36px] justify-between'}`}>
          {!collapsed && <p className='m-0 p-0 text-[14px] text-[#B1B1B1]'>Menu</p>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className='bg-primary hover:bg-hoverPrimary border-0 w-[25px] h-[25px] rounded-full flex justify-center items-center transition-all'
          >
            <Image
              src="/icons/arrow_left.svg"
              alt="trigger"
              width={12}
              height={12}
              className={`transition-all ${collapsed ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>
        <div className='flex flex-col'>
          <Link
            href={"/dashboard"}
            onMouseEnter={() => setIsDashboardHovered(true)}
            onMouseLeave={() => setIsDashboardHovered(false)}
            className={`group relative flex flex-row items-center cursor-pointer hover:bg-secondaryBG transition-all ${collapsed && 'justify-center'}`}
          >
            {isDashboardHovered && <div className='absolute left-0 w-[6px] h-full bg-primary rounded-e-[10px] transition-all' />}
            <div className='py-4 flex flex-row gap-[25px] items-center'>
              <Image
                src={isDashboardHovered ? "/icons/dashboard-active.svg" : "/icons/dashboard.svg"}
                alt="dashboard icon"
                width={25}
                height={25}
                className={`icon-menu ${collapsed ? 'ml-0' : 'ml-[33px]'}`}
              />
              {!collapsed && <p className='m-0 p-0 text-[18px] text-secondaryText group-hover:text-primary transition-all leading-3'>Dashboard</p>}
            </div>
          </Link>
          <Link
            href={"/"}
            onMouseEnter={() => setIsInExHovered(true)}
            onMouseLeave={() => setIsInExHovered(false)}
            className={`group relative flex flex-row items-center gap-[25px]  cursor-pointer hover:bg-secondaryBG transition-all py-4 ${collapsed && 'justify-center'}`}
          >
            {isInExHovered && <div className='absolute left-0 w-[6px] h-full bg-primary rounded-e-[10px] transition-all' />}
            <Image
              src={isInExHovered ? "/icons/income-expense-active.svg" : "/icons/income-expense.svg"}
              alt="income-expense icon"
              width={25}
              height={25}
              className={`icon-menu ${collapsed ? 'ml-0' : 'ml-[33px]'} transition-all`}
            />
            {!collapsed && <p className='m-0 p-0 text-[18px] text-secondaryText group-hover:text-primary transition-all leading-3'>Income-Expense</p>}
          </Link>
          <Link
            href={"/"}
            onMouseEnter={() => setIsSavingsHovered(true)}
            onMouseLeave={() => setIsSavingsHovered(false)}
            className={`group relative flex flex-row items-center gap-[25px]  cursor-pointer hover:bg-secondaryBG transition-all py-4 ${collapsed && 'justify-center'}`}
          >
            {isSavingsHovered && <div className='absolute left-0 w-[6px] h-full bg-primary rounded-e-[10px] transition-all' />}
            <Image
              src={isSavingsHovered ? "/icons/savings-active.svg" : "/icons/savings.svg"}
              alt="savings icon"
              width={25}
              height={25}
              className={`icon-menu ${collapsed ? 'ml-0' : 'ml-[33px]'} transition-all`}
            />
            {!collapsed && <p className='m-0 p-0 text-[18px] text-secondaryText group-hover:text-primary transition-all leading-3'>Savings</p>}
          </Link>
        </div>
      </div>
      <div>
        <Link
          href={"/"}
          onMouseEnter={() => setIsSupportHovered(true)}
          onMouseLeave={() => setIsSupportHovered(false)}
          className={`group relative flex flex-row items-center cursor-pointer hover:bg-secondaryBG transition-all ${collapsed && 'justify-center'}`}
        >
          {isSupportHovered && <div className='absolute left-0 w-[6px] h-full bg-primary rounded-e-[10px] transition-all' />}
          <div className='py-4 flex flex-row gap-[25px] items-center'>
            <Image
              src={isSupportHovered ? "/icons/support.svg" : "/icons/support.svg"}
              alt="support icon"
              width={25}
              height={25}
              className={`icon-menu ${collapsed ? 'ml-0' : 'ml-[33px]'}`}
            />
            {!collapsed && <p className='m-0 p-0 text-[18px] text-secondaryText group-hover:text-primary transition-all leading-3'>Support</p>}
          </div>
        </Link>
        <div
          onClick={() => signOut()}
          onMouseEnter={() => setIsSignOutHovered(true)}
          onMouseLeave={() => setIsSignOutHovered(false)}
          className={`group relative flex flex-row items-center gap-[25px]  cursor-pointer hover:bg-secondaryBG transition-all py-4 ${collapsed && 'justify-center'}`}
        >
          {isSignOutHovered && <div className='absolute left-0 w-[6px] h-full bg-primary rounded-e-[10px] transition-all' />}
          <Image
            src={isSignOutHovered ? "/icons/sign-out-active.svg" : "/icons/sign-out.svg"}
            alt="sign-out icon"
            width={25}
            height={25}
            className={`icon-menu ${collapsed ? 'ml-0' : 'ml-[33px]'} transition-all`}
          />
          {!collapsed && <p className='m-0 p-0 text-[18px] text-secondaryText group-hover:text-primary transition-all leading-3'>Sign Out</p>}
        </div>
      </div>
    </div>
  )
}

export default Siderbar