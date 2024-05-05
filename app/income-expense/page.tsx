/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, {useEffect, useState} from 'react'
import {useSession} from 'next-auth/react'
import {useSidebarData} from '@/context/SidebarContext'
import {Button, DatePicker, Flex, Form, Input, Modal, Select, Spin} from 'antd'
import {FaPlus} from "react-icons/fa"

import InExTable from '../components/income-expense/InExTable'
import SETHeader, {RightElementType} from '../components/ui/SETHeader'
import SETPieChart from '../components/ui/SETPieChart'

import {getAllCategory} from '../apis/category'
import {createIncomeExpense, getAllIncomeExpense} from '../apis/incomeExpense'
import {Category, CategoryResponses} from '../apis/types/category'
import {IncomeExpense, IncomeExpenseResponses} from '../apis/types/incomeExpense'

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
  const [ form ] = Form.useForm()
  const {data: session} = useSession()
  const {collapsed, isRedirect, updateIsRedirect} = useSidebarData()

  const [ categoryList, setCategoryList ] = useState<Category[]>()
  const [ incomeExpenseList, setIncomeExpenseList ] = useState<IncomeExpense[]>()
  const [ isAddNewModalVisible, setAddNewModalVisible ] = useState(false)
  const [ addNewLoading, setAddNewLoading ] = useState(false)

  const categoryOptions = categoryList?.map((category) => ({
    value: category.id,
    label: category.name
  }))

  useEffect(() => {
    updateIsRedirect(false)
    initCategory()
    initIncomeExpense()
  }, [])

  const initCategory = async () => {
    if (session) {
      const userId = session.user.id
      const res: CategoryResponses = await getAllCategory(userId)
      setCategoryList(res.data)
    }
  }

  const initIncomeExpense = async () => {
    if (session) {
      const userId = session.user.id
      const res: IncomeExpenseResponses = await getAllIncomeExpense(userId)
      setIncomeExpenseList(res.data)
    }
  }

  const handleOk = async () => {
    try {
      if (session) {
        const values = await form.validateFields()
        const userId = session.user.id
        const body = {
          ...values,
          user_id: userId
        }
        const res = await createIncomeExpense(body)
        if (res?.status === 'success') {
          setAddNewModalVisible(false)
          initIncomeExpense()
          initCategory()
          form.resetFields()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddNewOpen = () => {
    setAddNewModalVisible(true)
  }

  const handleCancel = () => {
    setAddNewModalVisible(false)
    form.resetFields()
  }

  return (
    <>
      <main className={`bg-secondaryBG py-6 pr-6 transition-all ${collapsed ? 'pl-20' : 'pl-[299px]'}`}>
        <SETHeader rightElementType={RightElementType.Create} onClick={handleAddNewOpen} />
        <div className="flex flex-row justify-between gap-6 mt-6 w-full">
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
        <Modal
          width={'30%'}
          title={<p className='text-mainDark text-[24px] font-semibold text-center pt-9 pb-3'>Create Income Expense</p>}
          open={isAddNewModalVisible}
          confirmLoading={addNewLoading}
          footer={false}
          onCancel={handleCancel}
        >
          <Form
            layout='vertical'
            form={form}
            scrollToFirstError
          >
            <Form.Item
              label={<label className='text-mainDark text-base'>Description</label>}
              name="note"
              rules={[
                {
                  required: true,
                  message: 'Please input your description!'
                }
              ]}
              className='mb-4'
            >
              <Input placeholder="Enter your description" className='py-[6px]' />
            </Form.Item>
            <div className="flex flex-row justify-between w-full gap-2">
              <Form.Item
                label={<label className='text-mainDark text-base'>Price</label>}
                name="amount"
                rules={[
                  {
                    required: true,
                    message: 'Please input your amount!'
                  }
                ]}
                className='w-full mb-4'
              >
                <Input placeholder="Enter your description" className='py-[6px]' type="number" />
              </Form.Item>
              <Form.Item
                label={<label className='text-mainDark text-base'>Date</label>}
                name="date"
                rules={[
                  {
                    required: true,
                    message: 'Please input your date!'
                  }
                ]}
                className='w-full mb-4'
              >
                <DatePicker
                  showTime
                  needConfirm={false}
                  format="YYYY-MM-DD HH:mm"
                  className='py-[6px] w-full'
                />
              </Form.Item>
            </div>
            <div className="flex flex-row justify-between items-end w-full gap-2">
              <Form.Item
                label={<label className='text-mainDark text-base'>Category Label</label>}
                name="category_id"
                rules={[
                  {
                    required: true,
                    message: 'Please select your category!'
                  }
                ]}
                className='w-full mb-4'
              >
                <Select
                  placeholder="Select category"
                  options={categoryOptions}
                  className='h-[36px] w-full'
                />
              </Form.Item>
              <Form.Item
                label={<label className='text-mainDark text-base'>Category Type</label>}
                // name="category_type"
                className='w-full mb-4'
                rules={[
                  {
                    required: true,
                    message: 'Please select your category type!'
                  }
                ]}
              >
                <Select
                  placeholder="Select category type"
                  options={[
                    {
                      value: 'income',
                      label: 'Income',
                    },
                    {
                      value: 'expense',
                      label: 'Expense',
                    },
                  ]}
                  className='h-[36px] w-full'
                />
              </Form.Item>
              <Form.Item
                className='mb-4'
              >
                <Button icon={<FaPlus />} className='h-[36px]' />
              </Form.Item>
            </div>

            <Form.Item className='m-0'>
              <Flex gap="small">
                <Button
                  className='w-full h-[40px] font-bold text-base'
                  onClick={() =>
                    handleCancel()
                  }
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    handleOk()
                  }}
                  className='bg-primary w-full h-[40px] font-bold text-base'
                >
                  Save
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Modal>
      </main >
      <Spin spinning={isRedirect} fullscreen />
    </>
  )
}

export default IncomeExpensePage