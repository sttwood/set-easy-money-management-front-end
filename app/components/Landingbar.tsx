/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {IoMenu, IoClose} from "react-icons/io5";
import {Dropdown, Row, Col, MenuProps} from "antd";
import SigninButton from "./auth/SigninButton";
import {useSidebarData} from "@/context/SidebarContext";

const NavbarItems = [
  {label: "Home", key: "home", path: "#home"},
  {label: "Services", key: "services", path: "#services"},
  {label: "About", key: "about", path: "#about"}
];

export default function Landingbar() {
  const {updateIsRedirect} = useSidebarData()

  const [ isMobileOpen, setIsMobileOpen ] = useState<boolean>(false)
  const [ color, setColor ] = useState<string>('transparent')
  const [ textColor, setTextColor ] = useState<string>('#858396')

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

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const onRedirect = () => {
    updateIsRedirect(true)
  }

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('#f0f0f0')
        setTextColor('#858396')
      } else {
        setColor('transparent')
        setTextColor('#858396')
      }
    }
    window.addEventListener('scroll', changeColor)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      setColor('transparent')
      setTextColor('#858396')
    } else {
      setColor('transparent')
      setTextColor('#858396')
    }
  }, [ isMobileOpen ])

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[999] bg-[${color}] ${color !== 'transparent' && 'shadow-md bg-[#ffffff] backdrop-filter backdrop-blur-lg bg-opacity-50'} ease-in duration-300`}>
        <Row className="py-[26px] px-[5%] lg:px-[10%] text-white w-full flex justify-between items-center">
          {/* Left Menu */}
          <Row className="flex items-end gap-[36px]">
            {/* Brand name */}
            <Link href='/' className="no-underline z-10">
              <Image src="/images/logo.png" alt="alt" width={140} height={36} />
            </Link>
          </Row>

          {/* Right Menu */}
          <Row className="flex items-center gap-2">
            <div className="flex flex-row items-center gap-4 lg:gap-14">
              {/* Desktop Menu */}
              <ul className="hidden md:flex justify-between items-start list-none gap-[25px] lg:gap-[45px]">
                {NavbarItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.path} className={`text-base font-semibold text-[${textColor}] no-underline ease-in duration-300`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-row items-center gap-4">
                {/* Change language Dropdown */}
                <Dropdown
                  menu={{items}}
                  trigger={[ 'click' ]}
                  placement="bottomRight"
                  className="cursor-pointer"
                >
                  <Image
                    src="/images/eng_lang.png"
                    alt="select lang"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] object-fill rounded-full"
                  />
                </Dropdown>
                <SigninButton containerStyle="hidden md:flex" handleClick={onRedirect} />
              </div>
            </div>

            {/* Hamburger Menu */}
            <Col className="flex items-center">
              <button
                className={`flex items-center z-10 cursor-pointer md:hidden bg-transparent border-0 text-[${textColor}] ease-in duration-300`}
                onClick={toggleMobileMenu}
              >
                {isMobileOpen ? (
                  <IoClose size={36} />
                ) : (
                  <IoMenu size={36} />
                )}
              </button>
            </Col>
          </Row>
        </Row>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-0 left-0 right-0 bg-[#fff] flex flex-col justify-center items-center w-full h-full py-20 rounded-s-sm shadow-sm transform transition-transform ease-in duration-300 ${isMobileOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          {isMobileOpen && (
            <ul className="flex flex-col items-center w-full list-none gap-[40px] mt-10">
              {NavbarItems.map((item, index) => (
                <li key={index} className="py-3">
                  <Link href={item.path} className="text-4xl text-[#858396] hover:text-[#5047BA] no-underline" onClick={() => setIsMobileOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <SigninButton
                containerStyle="flex-col w-[80%]"
                signInStyle="w-full max-h-[50px] min-h-[50px]"
                signUpStyle="w-full max-h-[50px] min-h-[50px]"
              />
            </ul>
          )}
        </div>
      </nav>
    </>
  )
}
