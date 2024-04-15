/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {useSidebarData} from '@/context/SidebarContext'
import {Spin} from 'antd'
import React, {useEffect} from 'react'
import SETHeader, {RightElementType} from '../components/ui/SETHeader'
import InExTable from '../components/income-expense/InExTable'
import SETPieChart from '../components/ui/SETPieChart'

export interface DataType {
  key: string
  note: string
  price: string
  category: string
  categoryTypeId: number
  createdAt: string
}

const incomeData = [
  {
    key: '1',
    note: 'Freelance',
    price: '5000.00',
    category: 'Freelance',
    categoryTypeId: 2,
    createdAt: String(new Date()),
  },
  {
    key: '2',
    note: 'Salary',
    price: '22000.00',
    category: 'Salary',
    categoryTypeId: 2,
    createdAt: String(new Date()),
  },
];

const expenseData = [
  {
    key: '1',
    note: 'Lunch',
    price: '50.00',
    category: 'Food',
    categoryTypeId: 1,
    createdAt: String(new Date()),
  },
  {
    key: '2',
    note: 'Mobile bills',
    price: '240.00',
    category: 'Bills',
    categoryTypeId: 1,
    createdAt: String(new Date()),
  },
  {
    key: '3',
    note: 'Drinks & Snacks',
    price: '100.00',
    category: 'Snacks',
    categoryTypeId: 1,
    createdAt: String(new Date()),
  },
];

const IncomeExpensePage = () => {
  const {collapsed, isRedirect, updateIsRedirect} = useSidebarData()

  useEffect(() => {
    updateIsRedirect(false)
  }, [])

  return (
    <>
      <main className={`bg-secondaryBG py-6 pr-6 transition-all ${collapsed ? 'pl-20' : 'pl-[299px]'}`}>
        <SETHeader rightElementType={RightElementType.Create} />
        <div className="flex flex-row justify-between gap-6 mt-6">
          <div className="flex flex-col items-center rounded-[8px] bg-[#fff] w-full p-6 gap-6">
            <SETHeader title="Income" rightElementType={RightElementType.Export} />
            <SETPieChart />
            <InExTable data={incomeData} />
          </div>
          <div className="flex flex-col items-center rounded-[8px] bg-[#fff] w-full p-6 gap-6">
            <SETHeader title="Expense" rightElementType={RightElementType.Export} />
            <SETPieChart />
            <InExTable data={expenseData} />
          </div>
        </div>
      </main>
      <Spin spinning={isRedirect} fullscreen />
    </>
  )
}

export default IncomeExpensePage