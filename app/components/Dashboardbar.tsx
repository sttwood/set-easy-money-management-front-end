"use client"

import React from "react";
import Image from "next/image";
import {LoadingOutlined} from '@ant-design/icons'
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
import {Button, Input, MenuProps, Spin} from "antd";
import {signOut, useSession} from "next-auth/react";
import {useSidebarData} from "@/context/SidebarContext";
import {usePathname} from "next/navigation";

export default function Dashboardbar() {
  const {collapsed, titlePage, updateIsRedirect} = useSidebarData()
  const pathname = usePathname()
  const {data: session} = useSession()

  const items: MenuProps[ 'items' ] = [
    {
      label:
        <span className="flex flex-row gap-[6px] items-center">
          <Image
            src="/images/eng_lang.png"
            alt="select eng lang"
            width={20}
            height={20}
            className="w-[20px] h-[20px] object-cover rounded-full"
          />
          <p className="text-base">EN</p>
        </span>
      ,
      key: '0',
    },
    {
      label:
        <span className="flex flex-row gap-[6px] items-center">
          <Image
            src="/images/th_lang.png"
            alt="select th lang"
            width={20}
            height={20}
            className="w-[20px] h-[20px] object-cover rounded-full"
          />
          <p className="text-base">TH</p>
        </span>,
      key: '1',
    }
  ];

  return (
    <nav className="py-5 bg-[#fff] w-full px-[5%] flex flex-row items-center justify-between">
      <h2 className={`text-header text-[24px] xl:text-[28px] font-bold transition-all ${collapsed ? 'pl-6' : 'pl-[228.75px]'}`}>
        {pathname === `/${titlePage.toLocaleLowerCase()}` ? titlePage : 'Loading...'}
      </h2>

      <div className="flex flex-row items-center gap-[24px] lg:gap-[48px]">
        <div className="flex flex-row gap-[24px] xl:gap-[30px] items-center">
          <Button
            disabled
            onClick={() => signOut()}
            className="bg-secondaryBG border-0 group"
            style={{width: 50, height: 50}}
            shape="circle"
            size="large"
            icon={
              <Image
                src={'/icons/notification.svg'}
                alt="sign out icon"
                width={25}
                height={25}
                className="group-hover:brightness-90 transition-all"
              />
            }
          />
          <Button
            onClick={() => {
              updateIsRedirect(true)
              signOut()
            }}
            className="bg-secondaryBG border-0 group"
            style={{width: 50, height: 50}}
            shape="circle"
            size="large"
            icon={
              <Image
                src={'/icons/sign-out-active.svg'}
                alt="sign out icon"
                width={25}
                height={25}
                className="group-hover:brightness-90 transition-all"
              />
            }
          />
          {session ? (
            <Image
              src={session.user.image ? session.user.image : "/images/annonymous_avatar.png"}
              alt="select eng lang"
              width={59}
              height={59}
              className="w-[59px] h-[59px] object-cover rounded-full"
            />
          ) : (
            <Spin
              indicator={
                <LoadingOutlined style={{fontSize: 24}} spin />
              }
            />
          )}
        </div>
      </div>
    </nav>
  );
}
