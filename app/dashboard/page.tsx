/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, {useEffect} from 'react'
import InExTable from '../components/dashboard/InExTable'
import Summary from '../components/dashboard/Summary'
import SETHeader, {RightElementType} from '../components/ui/SETHeader'
import {useSidebarData} from '@/context/SidebarContext'
import {Spin} from 'antd'
import SETBarChart from '../components/ui/SETBarChart'
import SavingsHeader from '../components/dashboard/SavingsHeader'

const DashboardPage = () => {
  const {collapsed, isRedirect, updateIsRedirect} = useSidebarData()

  useEffect(() => {
    updateIsRedirect(false)
  }, [])

  return (
    <>
      <main className={`bg-secondaryBG py-6 pr-6 transition-all ${collapsed ? 'pl-20' : 'pl-[299px]'}`}>
        <div className=" mx-auto p-6 bg-[#fff] rounded-[8px]">
          <Summary />
        </div>
        <div className=" mx-auto p-6 bg-[#fff] rounded-[8px] mt-6">
          <SETHeader
            title="Income-Expense Graph"
            rightElementType={RightElementType.SelectYear}
          />
          <SETBarChart />
        </div>
        <div className="flex flex-row justify-between gap-6  mx-auto">
          <div className="w-full mx-auto p-6 bg-[#fff] rounded-[8px] mt-6">
            <SETHeader
              title="Income-Expense"
              rightElementType={RightElementType.Export}
            />
            <InExTable />
          </div>
          <div className="w-full mx-auto p-6 bg-[#fff] rounded-[8px] mt-6">
            <SETHeader
              title="Savings"
              rightElementType={RightElementType.Export}
            />
            <SavingsHeader />
            <SETBarChart />
          </div>
        </div>
      </main>
      <Spin spinning={isRedirect} fullscreen />
    </>
  )
}

export default DashboardPage