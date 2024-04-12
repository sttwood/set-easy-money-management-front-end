/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {Button, Spin} from "antd";
import Image from "next/image";
import {signIn} from "next-auth/react";
import Landingbar from "./components/Landingbar";
import {useEffect} from "react";
import {useSidebarData} from "@/context/SidebarContext";

export default function Home() {
  const {isRedirect, updateIsRedirect} = useSidebarData()

  useEffect(() => {
    updateIsRedirect(false)
  }, [])

  return (
    <>
      <main className="bg-[url('/images/BG-LandingPage.png')] bg-cover">
        <Landingbar />

        <section id="home" className="flex flex-col justify-center items-center w-[90%] md:w-[75%] mx-auto pt-[166px]">
          <h1 className="text-[40px] lg:text-[55px] xl:text-[65px] text-mainDark font-extrabold mb-[10px] lg:mb-[20px]">
            Easy Money
            <span className="text-primary"> Management</span>
          </h1>
          <h2 className="text-[20px] lg:text-[30px] xl:text-[35px] text-mainDark text-center md:text-center mb-5">
            Manage your income-expenses and savings with data tables and charts. This can help you plan for the future.
          </h2>
          <Button
            onClick={() => {
              updateIsRedirect(true)
              signIn()
            }}
            type="primary"
            className="text-xl font-bold h-[50px] lg:h-[60px] px-[45px] lg:px-[65px] bg-primary mb-[30px]"
          >
            Get Started
          </Button>
          <Image
            src="/images/landingpage-content.png"
            alt="landingpage-image"
            width={1082}
            height={498}
            className="object-cover"
          />
        </section>

        <section id="services" className="flex flex-col justify-center w-[75%] mx-auto gap-[107px] pt-[191px]">
          <div>
            <h3 className="text-[24px] lg:text-[34px] xl:text-[44px] text-mainDark font-extrabold">Our features</h3>
            <p className="lg:text-[15px] xl:text-[25px] text-[#838383]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
          <div className="flex flex-row justify-between items-center gap-10">
            <div>
              <h4 className="text-[20px] lg:text-[25px] xl:text-[30px] text-primary font-bold">Dashboard summary</h4>
              <p className="lg:text-base xl:text-[20px] text-[#838383]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
            <div className="w-[100%] h-[250px] lg:h-[300px] xl:h-[400px] bg-header" />
          </div>
          <div className="flex flex-row justify-between items-center gap-10">
            <div className="w-[100%] h-[250px] lg:h-[300px] xl:h-[400px] bg-header" />
            <div>
              <h4 className="text-[20px] lg:text-[25px] xl:text-[30px] text-primary font-bold">Income-Expense management</h4>
              <p className="lg:text-base xl:text-[20px] text-[#838383]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-10">
            <div>
              <h4 className="text-[20px] lg:text-[25px] xl:text-[30px] text-primary font-bold">Savings management</h4>
              <p className="lg:text-base xl:text-[20px] text-[#838383]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
            <div className="w-[100%] h-[250px] lg:h-[300px] xl:h-[400px] bg-header" />
          </div>
        </section>
      </main>
      <Spin spinning={isRedirect} fullscreen />
    </>
  );
}
