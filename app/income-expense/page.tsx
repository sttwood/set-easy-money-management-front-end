/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, {useEffect, useReducer, useState} from 'react'
import {useSession} from 'next-auth/react'
import {useSidebarData} from '@/context/SidebarContext'
import {Button, DatePicker, Flex, Form, Input, Modal, Select, Spin} from 'antd'
import {FaCheck, FaPlus, FaTimes} from "react-icons/fa"

import InExTable from '../components/income-expense/InExTable'
import SETHeader, {RightElementType} from '../components/ui/SETHeader'
import SETPieChart from '../components/ui/SETPieChart'

import {createCategory, getAllCategory} from '../apis/category'
import {createIncomeExpense, deleteIncomeExpense, getAllIncomeExpense, getIncomeExpenseById, updateIncomeExpense} from '../apis/incomeExpense'
import {Category, CategoryResponses} from '../apis/types/category'
import {IncomeExpense, IncomeExpenseResponses} from '../apis/types/incomeExpense'
import {toast} from 'react-toastify'
import dayjs from 'dayjs'

const IncomeExpensePage = () => {
  const [ form ] = Form.useForm()
  const {data: session} = useSession()
  const {collapsed, isRedirect, updateIsRedirect} = useSidebarData()

  const [ categoryList, setCategoryList ] = useState<Category[]>()
  const [ incomeExpenseData, setIncomeExpenseData ] = useState<IncomeExpense[]>([])
  // Income
  const [ incomeData, setIncomeData ] = useState<IncomeExpense[]>([])
  const [ incomeLabels, setIncomeLabels ] = useState<string[]>([])
  const [ incomeDataValues, setIncomeDataValues ] = useState<number[]>([])
  // Expense
  const [ expenseData, setExpenseData ] = useState<IncomeExpense[]>([])
  const [ expenseLabels, setExpenseLabels ] = useState<string[]>([])
  const [ expenseDataValues, setExpenseDataValues ] = useState<number[]>([])

  // Modal
  const [ actionType, setActionType ] = useState<number>() // 1 = Add, 2 = Edit
  const [ selectedId, setSelectedId ] = useState<number>()
  const [ isModalVisible, setModalVisible ] = useState(false)
  const [ addNewCategory, setAddNewCategory ] = useState(false)
  const [ newCategoryLoading, setNewCategoryLoading ] = useState(false)
  const [ addNewLoading, setAddNewLoading ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const categoryOptions = categoryList?.map((category) => ({
    value: category.id,
    label: category.name
  }))

  useEffect(() => {
    updateIsRedirect(false)
    initCategory()
    initIncomeExpense()
  }, [])

  useEffect(() => {
    const transformData = incomeExpenseData.map((item) => ({
      ...item,
      category: {
        name: categoryList?.find((category) => category.id === item.category_id)?.name,
        type: categoryList?.find((category) => category.id === item.category_id)?.type,
        amount: item.amount
      },
    }))

    const filteredIncomeData = transformData.filter((data) => data.category.type === 'income')
    const filteredExpenseData = transformData.filter((data) => data.category.type === 'expense')

    const sumsIncomeByCategory: Record<string, number> = {}
    filteredIncomeData.map((data) => {
      const {name, amount} = data.category
      const parsedAmount = parseFloat(amount)

      sumsIncomeByCategory[ name || '' ] = (sumsIncomeByCategory[ name || '' ] || 0) + parsedAmount
    })
    const sumsExpenseByCategory: Record<string, number> = {}
    filteredExpenseData.map((data) => {
      const {name, amount} = data.category
      const parsedAmount = parseFloat(amount)

      sumsExpenseByCategory[ name || '' ] = (sumsExpenseByCategory[ name || '' ] || 0) + parsedAmount
    })

    const incomeLabels = new Set(filteredIncomeData.map((data) => data.category.name))
    const incomeDataValues = Object.values(sumsIncomeByCategory)
    const expenseLabels = new Set(filteredExpenseData.map((data) => data.category.name))
    const expenseDataValues = Object.values(sumsExpenseByCategory)

    setIncomeLabels(Array.from(incomeLabels) as string[])
    setIncomeDataValues(incomeDataValues)
    setExpenseLabels(Array.from(expenseLabels) as string[])
    setExpenseDataValues(expenseDataValues)

    setIncomeData(filteredIncomeData)
    setExpenseData(filteredExpenseData)
  }, [ incomeExpenseData ])

  const initCategory = async () => {
    try {
      if (session) {
        const userId = session.user.id
        const res: CategoryResponses = await getAllCategory(userId)
        setCategoryList(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const initIncomeExpense = async () => {
    setLoading(true)
    try {
      if (session) {
        const userId = session.user.id
        const res: IncomeExpenseResponses = await getAllIncomeExpense(userId)

        if (res?.status === 'success') {
          setIncomeExpenseData(res.data)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const initIncomeExpenseById = async (id: number) => {
    try {
      const res = await getIncomeExpenseById(id)

      if (res?.status === 'success') {
        const formData = {
          note: res.data.note,
          amount: res.data.amount,
          category_id: res.data.category_id,
          date: dayjs(res.data.date),
          category: {
            name: categoryList?.find((category) => category.id === res.data.category_id)?.name,
            type: categoryList?.find((category) => category.id === res.data.category_id)?.type
          }
        }
        form.setFieldsValue({
          note: formData.note,
          amount: formData.amount,
          category_id: formData.category_id,
          date: dayjs(formData.date),
          category_type: formData.category.type
        })
        setSelectedId(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateCategory = async () => {
    setNewCategoryLoading(true)
    try {
      if (session) {
        const values = await form.getFieldsValue()
        const userId = session.user.id
        const body = {
          name: values.category_type,
          type: values.category_id,
          user_id: userId
        }

        const res = await createCategory(body)
        if (res?.status === 'success') {
          setAddNewCategory(false)
          setNewCategoryLoading(false)
          initCategory()
          form.setFieldValue('category_type', '')
          form.setFieldValue('category_id', '')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleOk = async () => {
    try {
      if (session) {
        const values = await form.validateFields()
        const userId = session.user.id

        const {category_type, ...restValues} = values
        const body = {
          ...restValues,
          user_id: userId
        }

        setAddNewLoading(true)
        const res = actionType === 1 ? await createIncomeExpense(body) : await updateIncomeExpense(body, selectedId ?? 0)
        if (res?.status === 'success') {
          setAddNewLoading(false)
          toast.success(actionType === 1 ? "Created Income/Expense successfully!" : "Updated Income/Expense successfully!")
          setModalVisible(false)
          initIncomeExpense()
          initCategory()
          form.resetFields()
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again")
      console.log(error)
    }
  }

  const handleAddNewOpen = () => {
    setActionType(1)
    setModalVisible(true)
  }

  const handleEditOpen = (id: number) => {
    setActionType(2)
    initIncomeExpenseById(id).then(() => {
      setModalVisible(true)
    })
  }

  const handleCancel = () => {
    setModalVisible(false)
    form.resetFields()
  }

  const handleDelete = async (id: number) => {
    setLoading(true)
    try {
      const res = await deleteIncomeExpense(id)
      if (res?.status === 'success') {
        setLoading(false)
        toast.success("Deleted Income/Expense successfully!")
        initIncomeExpense()
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again")
      console.log(error)
    }
  }

  return (
    <>
      <main className={`bg-secondaryBG py-6 pr-6 transition-all ${collapsed ? 'pl-20' : 'pl-[299px]'}`}>
        <SETHeader rightElementType={RightElementType.Create} onClick={handleAddNewOpen} />
        <div className="flex flex-row justify-between gap-6 mt-6 w-full">
          <div className="flex flex-col items-center rounded-[8px] bg-[#fff] w-full p-6 gap-6">
            <SETHeader title="Income" rightElementType={RightElementType.Export} />
            <SETPieChart datasource={incomeDataValues} labels={incomeLabels} />
            <InExTable
              data={incomeData}
              loading={loading}
              onDelete={handleDelete}
              onEdit={handleEditOpen}
            />
          </div>
          <div className="flex flex-col items-center rounded-[8px] bg-[#fff] w-full p-6 gap-6">
            <SETHeader title="Expense" rightElementType={RightElementType.Export} />
            <SETPieChart datasource={expenseDataValues} labels={expenseLabels} />
            <InExTable
              data={expenseData}
              loading={loading}
              onDelete={handleDelete}
              onEdit={handleEditOpen}
            />
          </div>
        </div>
        <Modal
          width={'40%'}
          title={<p className='text-mainDark text-[24px] font-semibold text-center pt-9 pb-3'>{actionType === 1 ? 'Create Income Expense' : 'Edit Income Expense'}</p>}
          open={isModalVisible}
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
              {addNewCategory ? (
                <Form.Item
                  label={<label className='text-mainDark text-base'>Category Label</label>}
                  name="category_type"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your category name!'
                    }
                  ]}
                  className='w-full mb-4'
                >
                  <Input placeholder="Enter your category name" className='py-[6px]' />
                </Form.Item>
              ) : (
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
              )}
              <Form.Item
                label={<label className='text-mainDark text-base'>Category Type</label>}
                name={addNewCategory ? "category_id" : "category_type"}
                className="w-full mb-4"
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
              {addNewCategory ? (
                <>
                  <Form.Item className='mb-4'>
                    <Button
                      icon={<FaCheck />}
                      className='h-[36px]'
                      onClick={() => {
                        handleCreateCategory()
                      }}
                      loading={newCategoryLoading}
                    />
                  </Form.Item>
                  <Form.Item className='mb-4'>
                    <Button
                      icon={<FaTimes />}
                      className='h-[36px]'
                      onClick={() => {
                        setAddNewCategory(false)
                      }}
                    />
                  </Form.Item>
                </>
              ) : (
                <Form.Item className='mb-4'>
                  <Button
                    icon={<FaPlus />}
                    className='h-[36px]'
                    onClick={() => {
                      setAddNewCategory(true)
                    }}
                  />
                </Form.Item>
              )}
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
                  loading={addNewLoading}
                  disabled={addNewCategory}
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