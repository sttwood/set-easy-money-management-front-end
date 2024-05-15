"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {Button, Input, Popconfirm, Table, TableProps, Tag} from 'antd'
import {HiMiniMagnifyingGlass} from 'react-icons/hi2'
import dayjs from 'dayjs'
import {FaRegEdit} from "react-icons/fa"
import {RiDeleteBin6Line} from "react-icons/ri"
import {IncomeExpense} from '@/app/apis/types/incomeExpense'
import {getIncomeExpenseById} from '@/app/apis/incomeExpense'

type Props = {
  data: IncomeExpense[]
  loading?: boolean
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const InExTable = (prop: Props) => {
  const {data, loading, onDelete, onEdit} = prop

  const [ searchText, setSearchText ] = useState<string>('')
  const [ filteredList, setFilteredList ] = useState<IncomeExpense[]>(data)

  const columns: TableProps<IncomeExpense>[ 'columns' ] = [
    {
      title: <p className='text-bluePastel fontBold'>Date</p>,
      key: 'date',
      dataIndex: 'date',
      render: (createdAt: string) => <p className='text-main'>{dayjs(createdAt).format('MM-DD-YYYY')}</p>,
    },
    {
      title: <p className='text-bluePastel fontBold'>Note</p>,
      key: 'note',
      dataIndex: 'note',
      render: (note: string) => <p className='text-main'>{note}</p>,
    },
    {
      title: <p className='text-bluePastel fontBold'>Amount</p>,
      key: 'amount',
      dataIndex: 'amount',
      render: (amount: string) => (
        <p className='text-main'>
          {parseFloat(amount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
      ),
    },
    {
      title: <p className='text-bluePastel fontBold'>Category</p>,
      dataIndex: [ 'category', 'type' ],
      key: 'type',
      render: (categoryType: string, record: IncomeExpense) => {
        if (categoryType === 'expense') {
          return (
            <Tag
              color="error"
              className='w-full text-center text-[10px]'
              style={{
                backgroundColor: '#fff'
              }}
            >
              {record.category?.name}
            </Tag>
          )
        } else if (categoryType === 'income') {
          return (
            <Tag
              color="green"
              className='w-full text-center text-[10px]'
              style={{
                backgroundColor: '#fff',
              }}
            >
              {record.category?.name}
            </Tag>
          )
        } else {
          return <Tag className='w-full text-center text-[10px]' style={{backgroundColor: '#fff'}}>{categoryType}</Tag>;
        }
      },
    },
    {
      title: <p className='text-bluePastel fontBold'>Actions</p>,
      key: 'actions',
      dataIndex: 'actions',
      render: (text: string, record: IncomeExpense) => {
        return (
          <div className='flex flex-row items-center gap-2'>
            <Button
              onClick={() => {
                onEdit(record.id)
              }}
              className='border-0 p-2 bg-transparent shadow-none group'
            >
              <FaRegEdit className='text-[#3F434A] group-hover:text-[#FFBB38]' size={14} />
            </Button>
            <Popconfirm
              title="ลบข้อมูลผลิตภัณฑ์/สินค้า นี้"
              description="คุณแน่ใจที่จะลบผลิตภัณฑ์/สินค้า นี้?"
              onConfirm={() => {
                onDelete(record.id)
              }}
              okText="ใช่"
              cancelText="ไม่"
              okButtonProps={{className: 'bg-primary'}}
            >
              <Button
                className='border-0 p-2 bg-transparent shadow-none group'
              >
                <RiDeleteBin6Line className='text-[#3F434A] group-hover:text-[#FF2F2F]' size={14} />
              </Button>
            </Popconfirm>
          </div>
        )
      },
      width: 100
    },
  ];

  useEffect(() => {
    setFilteredList(data)
  }, [ data ])

  useEffect(() => {
    if (searchText !== '') {
      setFilteredList(data.filter((item: IncomeExpense) => {
        const formattedCreatedAtDate = dayjs(item.date).format('MM-DD-YYYY')

        const matchesSearchText = (
          item.note.toLowerCase().includes(searchText) ||
          item.amount.includes(searchText) ||
          item.category?.name?.toLowerCase().includes(searchText) ||
          formattedCreatedAtDate.includes(searchText)
        )

        return matchesSearchText
      }))
    } else {
      setFilteredList(data)
    }
  }, [ searchText ])

  return (
    <div className='mt-4 flex flex-col gap-2 w-full'>
      <div className='flex flex-row items-center justify-end'>
        <Input
          placeholder="Search for something"
          prefix={<HiMiniMagnifyingGlass className="text-placeholderICON mx-2" />}
          className="hidden md:flex md:w-[158px] lg:w-[258px] h-full rounded-[40px] bg-placeholderBG border-none"
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredList}
        loading={loading}
      />
    </div>
  )
}

export default InExTable