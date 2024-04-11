/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {useSidebarData} from '@/context/SidebarContext';
import {signOut} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useEffect} from 'react'

const Siderbar = () => {
  const pathname = usePathname()
  const {collapsed, updateSidebarData, updateTitlePage} = useSidebarData()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        updateSidebarData(true);
      } else {
        updateSidebarData(window.innerWidth < 1024);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const MenuItem = [
    {
      title: 'Dashboard',
      defaultIcon: "/icons/dashboard.svg",
      activeIcon: "/icons/dashboard-active.svg",
      path: '/dashboard'
    },
    {
      title: 'Income-Expense',
      defaultIcon: "/icons/income-expense.svg",
      activeIcon: "/icons/income-expense-active.svg",
      path: '/income-expense'
    },
    {
      title: 'Savings',
      defaultIcon: "/icons/savings.svg",
      activeIcon: "/icons/savings-active.svg",
      path: '/savings'
    }
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-screen flex flex-col justify-between bg-[#fff] py-6 transition-all border-r-1 border-borderBlueLight ${collapsed ? 'w-[60px]' : 'w-[275px]'}`}
    >
      <div className='flex flex-col'>
        <div className='flex justify-center items-center mb-10'>
          <Image
            src={collapsed ? "/images/logo-set.png" : "/images/logo.png"}
            alt="logo"
            width={collapsed ? 46 : 200}
            height={collapsed ? 46 : 50}
          />
        </div>
        <div className={`flex flex-row mb-5 ${collapsed ? 'px-0 justify-center' : 'px-[36px] justify-between'}`}>
          {!collapsed && <p className='m-0 p-0 text-[14px] text-[#B1B1B1]'>Menu</p>}
          <button
            onClick={() => updateSidebarData(!collapsed)}
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
          {MenuItem.map((item, index) => (
            <Link
              key={`menu-item-${index}`}
              href={item.path}
              className={`group relative flex flex-row items-center cursor-pointer transition-all ${pathname === item.path ? 'bg-secondaryBG' : ''} ${collapsed && 'justify-center'}`}
              onClick={() => updateTitlePage(item.title)}
            >
              {pathname === item.path && <div className='absolute left-0 w-[6px] h-full bg-primary rounded-e-[10px] transition-all' />}
              <div className='py-4 flex flex-row gap-[25px] items-center'>
                <Image
                  src={pathname === item.path ? item.activeIcon : item.defaultIcon}
                  alt="dashboard icon"
                  width={25}
                  height={25}
                  className={`icon-menu ${collapsed ? 'ml-0' : 'ml-[33px]'}`}
                />
                {!collapsed && <p className={`m-0 p-0 text-[18px] group-hover:text-primary transition-all leading-3 md:flex ${pathname === item.path ? 'text-primary' : 'text-secondaryText'}`}>{item.title}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Link
          href={"/support"}
          className={`group relative flex flex-row items-center cursor-default hover:bg-secondaryBG transition-all pointer-events-none ${collapsed && 'justify-center'}`}
        >
          {pathname === '/support' && <div className='absolute left-0 w-[6px] h-full bg-primary rounded-e-[10px] transition-all' />}
          <div className='py-4 flex flex-row gap-[25px] items-center'>
            <Image
              src={pathname === '/support' ? "/icons/support.svg" : "/icons/support.svg"}
              alt="support icon"
              width={25}
              height={25}
              className={`icon-menu ${collapsed ? 'ml-0' : 'ml-[33px]'}`}
            />
            {!collapsed && <p className={`m-0 p-0 text-[18px] group-hover:text-primary transition-all leading-3 ${pathname === '/support' ? 'text-primary' : 'text-secondaryText'}`}>Support</p>}
          </div>
        </Link>
        <div
          onClick={() => signOut()}
          className={`group relative flex flex-row items-center gap-[25px]  cursor-pointer hover:bg-secondaryBG transition-all py-4 ${collapsed && 'justify-center'}`}
        >
          <Image
            src="/icons/sign-out.svg"
            alt="sign-out icon"
            width={25}
            height={25}
            className={`icon-menu ${collapsed ? 'ml-0' : 'ml-[33px]'} transition-all`}
          />
          {!collapsed && <p className='m-0 p-0 text-[18px] text-secondaryText group-hover:text-alert transition-all leading-3'>Sign Out</p>}
        </div>
      </div>
    </div>
  )
}

export default Siderbar