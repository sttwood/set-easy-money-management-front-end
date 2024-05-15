/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {Spin} from 'antd'

import {useSidebarData} from '@/context/SidebarContext'

import InExTable from '../components/dashboard/InExTable'
import Summary from '../components/dashboard/Summary'
import SETHeader, {RightElementType} from '../components/ui/SETHeader'
import SETBarChart from '../components/ui/SETBarChart'
import SavingsHeader from '../components/dashboard/SavingsHeader'
import SavingsTable from '../components/dashboard/SavingsTable'

import {CategoryResponses} from '../apis/types/category'
import {IncomeExpense, IncomeExpenseResponses, totalSummary} from '../apis/types/incomeExpense'

import {getAllCategory} from '../apis/category'
import {getAllIncomeExpense} from '../apis/incomeExpense'

const DashboardPage = () => {
  const {collapsed, isRedirect, updateIsRedirect} = useSidebarData()
  const {data: session} = useSession()

  const [ incomeExpenseLoading, setIncomeExpenseLoading ] = useState<boolean>(false)
  const [ incomeExpenseData, setIncomeExpenseData ] = useState<IncomeExpense[]>([])
  const [ totalSummary, setTotalSummary ] = useState<totalSummary>({
    income: null,
    expense: null,
    savings: null
  })

  useEffect(() => {
    updateIsRedirect(false)
    initIncomeExpense()
  }, [])

  const initIncomeExpense = async () => {
    setIncomeExpenseLoading(true)
    try {
      if (session) {
        const userId = session.user.id

        const categoryRes: CategoryResponses = await getAllCategory(userId)
        const IncomeExpenseRes: IncomeExpenseResponses = await getAllIncomeExpense(userId)

        if (IncomeExpenseRes?.status === 'success' && categoryRes?.status === 'success') {

          const transformData = IncomeExpenseRes.data.map((item) => ({
            ...item,
            category: {
              name: categoryRes.data.find((category) => category.id === item.category_id)?.name,
              type: categoryRes.data.find((category) => category.id === item.category_id)?.type,
              amount: item.amount
            },
          }))

          const sumsByCategory: Record<string, number> = {}
          transformData.map((data) => {
            const {type, amount} = data.category
            const parsedAmount = parseFloat(amount)

            sumsByCategory[ type || '' ] = (sumsByCategory[ type || '' ] || 0) + parsedAmount
          })

          setTotalSummary({
            income: sumsByCategory.income || null,
            expense: sumsByCategory.expense || null,
            savings: totalSummary.savings || null
          })
          setIncomeExpenseData(transformData)
          setIncomeExpenseLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <main className={`bg-secondaryBG py-6 pr-6 transition-all ${collapsed ? 'pl-20' : 'pl-[299px]'}`}>
        <div className="mx-auto p-6 bg-[#fff] rounded-[8px]">
          <Summary
            income={totalSummary.income}
            expense={totalSummary.expense}
            savings={totalSummary.savings}
          />
        </div>
        <div className="mx-auto p-6 bg-[#fff] rounded-[8px] mt-6">
          <SETHeader
            title="Income-Expense Graph"
            rightElementType={RightElementType.SelectYear}
          />
          <SETBarChart />
        </div>
        <div className="flex flex-row justify-between gap-6 mx-auto">
          <div className="w-full mx-auto p-6 bg-[#fff] rounded-[8px] mt-6">
            <SETHeader
              title="Income-Expense"
              rightElementType={RightElementType.Export}
            />
            <InExTable
              data={incomeExpenseData}
              loading={incomeExpenseLoading}
            />
          </div>
          <div className="w-full mx-auto p-6 bg-[#fff] rounded-[8px] mt-6">
            <SETHeader
              title="Savings"
              rightElementType={RightElementType.Export}
            />
            <SavingsHeader />
            <SavingsTable />
          </div>
        </div>
      </main>
      <Spin spinning={isRedirect} fullscreen />
    </>
  )
}

export default DashboardPage