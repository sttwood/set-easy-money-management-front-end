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

export default function Appbar() {

  const items: MenuProps[ 'items' ] = [
    {
      label:
        <span className="flex flex-row gap-2">
          <Image
            src="/images/eng.png"
            alt="select eng lang"
            width={35}
            height={25}
            className="w-[35px] h-[25px] object-cover"
          />
          <p className="text-base">EN</p>
        </span>
      ,
      key: '0',
    },
    {
      label:
        <span className="flex flex-row gap-2">
          <Image
            src="/images/th.png"
            alt="select th lang"
            width={35}
            height={25}
            className="w-[35px] h-[25px] object-cover"
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
        <NavbarItem className="hover:outline hover:outline-[7px] hover:outline-placeholderBG hover:rounded-full">
          <Dropdown
            menu={{items}}
            trigger={[ 'click' ]}
            className="cursor-pointer"
          >
            <Image
              src="/images/th.png"
              alt="select lang"
              width={30}
              height={30}
              className="w-[30px] h-[30px] object-cover rounded-full"
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
