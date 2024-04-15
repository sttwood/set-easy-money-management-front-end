/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {useSidebarData} from '@/context/SidebarContext'
import {Spin} from 'antd'
import React, {useEffect} from 'react'
import SETHeader, {RightElementType} from '../components/ui/SETHeader'
import SETAreaChart from '../components/ui/SETAreaChart'
import Summary from '../components/savings/Summary'
import SavingsTable from '../components/savings/SavingsTable'

const SavingsPage = () => {
  const {collapsed, isRedirect, updateIsRedirect} = useSidebarData()

  useEffect(() => {
    updateIsRedirect(false)
  }, [])

  return (
    <>
      <main className={`bg-secondaryBG py-6 pr-6 transition-all ${collapsed ? 'pl-20' : 'pl-[299px]'}`}>
        <SETHeader
          rightElementType={RightElementType.Create}
        />
        <div className="gap-6 flex flex-col mt-6">
          <div className="w-full mx-auto p-6 bg-[#fff] rounded-[8px] gap-6 flex flex-col">
            <SETHeader
              title='Savings Graph'
              rightElementType={RightElementType.SelectYear}
            />
            <SETAreaChart />
          </div>

          <div className="w-full mx-auto p-6 bg-[#fff] rounded-[8px]">
            <Summary />
          </div>

          <div className="w-full mx-auto p-6 bg-[#fff] rounded-[8px] gap-6 flex flex-col">
            <SavingsTable />
          </div>
        </div>
      </main>
      <Spin spinning={isRedirect} fullscreen />
    </>
  )
}

export default SavingsPage