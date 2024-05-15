"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'

import {DatePicker, Input, Table, TableProps, Tag} from 'antd'
import {IoIosArrowDown} from "react-icons/io"
import {HiMiniMagnifyingGlass} from 'react-icons/hi2'

import {Currency} from '@/app/utils/currency'
import {IncomeExpense} from '@/app/apis/types/incomeExpense'

type Props = {
  data: IncomeExpense[]
  loading?: boolean
}

const InExTable = (props: Props) => {
  const {data, loading} = props

  const [ selectMonth, setSelectMonth ] = useState<string>(dayjs(new Date()).format('MM-DD-YYYY'))
  const [ searchText, setSearchText ] = useState<string>('')
  const [ filteredList, setFilteredList ] = useState<IncomeExpense[]>(data)

  const columns: TableProps<IncomeExpense>[ 'columns' ] = [
    {
      title: <p className='text-bluePastel fontBold'>Date</p>,
      key: 'createdAt',
      dataIndex: 'createdAt',
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
      render: (price: string) => (
        <p className='text-main'>
          {Currency(Number(price), false)}
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
      }
    }
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
  }, [ searchText, selectMonth ])

  return (
    <div className='mt-4 flex flex-col gap-2'>
      <div className='flex flex-row justify-between gap-[28px]'>
        <DatePicker
          onChange={(date) => {
            date ? setSelectMonth(dayjs(date).format('MM-DD-YYYY')) : setSelectMonth(dayjs(new Date()).format('MM-DD-YYYY'))
          }}
          onPanelChange={(date, mode) => {
            // Check if the mode is 'date' and the date is null, indicating that the clear button was clicked
            if (mode === 'date' && !date) {
              setSelectMonth(dayjs(new Date()).format('MM-DD-YYYY'));
            }
          }}
          defaultValue={dayjs(selectMonth)}
          format='MM-DD-YYYY'
          suffixIcon={
            <IoIosArrowDown />
          }
          className='border-lightBlue rounded-[15px] text-bluePastel text-[15px] w-full'
          allowClear={false}
        />
        <Input
          placeholder="Search for something"
          prefix={<HiMiniMagnifyingGlass className="text-placeholderICON mx-2" />}
          className="hidden md:flex md:w-full lg:w-[409px] h-full rounded-[40px] bg-placeholderBG border-none"
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