"use client"

import React from "react";
import Image from "next/image";
import SigninButton from "./auth/SigninButton";
import Link from "next/link";
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
import {Dropdown, Input, MenuProps} from "antd";
import {useSidebarData} from "@/context/SidebarContext";
import {usePathname} from "next/navigation";

export default function Authbar() {
  const {updateIsRedirect} = useSidebarData()

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
    <nav className="py-4 px-[10%] bg-[#fff] flex flex-row items-center justify-between w-full">
      <Link
        href="/"
        onClick={() => updateIsRedirect(true)}
        className="transition-colors"
      >
        <Image
          src="/images/logo.png"
          alt="logo"
          width={141}
          height={36}
          className="w-[141px] h-[36px]"
        />
      </Link>

      <div className="flex flex-row justify-end items-center gap-4">
        <div>
          <Input
            placeholder="Search for something"
            prefix={<HiMiniMagnifyingGlass className="text-placeholderICON mx-2" />}
            className="hidden md:flex md:w-full lg:w-[409px] h-full rounded-[40px] bg-placeholderBG border-none"
          />
        </div>
        <div>
          <Dropdown
            menu={{items}}
            trigger={[ 'click' ]}
            placement="bottomRight"
            className="cursor-pointer"
          >
            <Image
              src="/images/th_lang.png"
              alt="select lang"
              width={30}
              height={30}
              className="w-[30px] h-[30px] object-cover rounded-full outline outline-[7px] outline-placeholderBG"
            />
          </Dropdown>
        </div>
        <div>
          <SigninButton />
        </div>
      </div>
    </nav>
  );
}
