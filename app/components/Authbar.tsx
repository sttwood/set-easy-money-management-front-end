import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import SigninButton from "./auth/SigninButton";
import Link from "next/link";
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
import {Dropdown, Input, MenuProps} from "antd";

export default function Authbar() {

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
    <Navbar className="py-1 px-0 bg-[#fff]">
      <Link
        href="/"
        className="transition-colors"
      >
        <NavbarBrand className="flex flex-row gap-2">
          <Image
            src="/images/logo-set.png"
            alt="logo"
            width={36}
            height={36}
          />
          <div className="flex flex-col">
            <p className="font-bold text-[20px] text-header">EMM</p>
            <p className="text-[8px] text-header leading-3">Easy Money Management</p>
          </div>
        </NavbarBrand>
      </Link>

      <NavbarContent justify="end">
        <NavbarItem>
          <Input
            placeholder="Search for something"
            prefix={<HiMiniMagnifyingGlass className="text-placeholderICON mx-2" />}
            className="hidden md:flex md:w-full lg:w-[409px] h-full rounded-[40px] bg-placeholderBG border-none"
          />
        </NavbarItem>
        <NavbarItem>
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
        </NavbarItem>
        <NavbarItem>
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
