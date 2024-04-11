"use client"

import React from 'react'
import Graph from '../components/dashboard/Graph'
import InExTable from '../components/dashboard/InExTable'
import Summary from '../components/dashboard/Summary'
import SETHeader, {RightElementType} from '../components/ui/SETHeader'
import {useSidebarData} from '@/context/SidebarContext'

const DashboardPage = () => {
  const {collapsed} = useSidebarData()

  return (
    <main className={`bg-secondaryBG py-6 pr-6 transition-all ${collapsed ? 'pl-20' : 'pl-[299px]'}`}>
      <div className=" mx-auto p-6 bg-[#fff] rounded-[8px]">
        <Summary />
      </div>
      <div className=" mx-auto p-6 bg-[#fff] rounded-[8px] mt-6">
        <SETHeader
          title="Income-Expense Graph"
          rightElementType={RightElementType.SelectYear}
        />
        <Graph />
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
        </div>
      </div>
    </main>
  )
}

export default DashboardPage