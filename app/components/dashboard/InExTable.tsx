"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {DatePicker, Input, Table, TableProps, Tag} from 'antd'
import {IoIosArrowDown} from "react-icons/io"
import {HiMiniMagnifyingGlass} from 'react-icons/hi2'
import dayjs from 'dayjs'

interface DataType {
  key: string
  note: string
  price: string
  category: string
  categoryTypeId: number
  createdAt: string
}

const data: DataType[] = [
  {
    key: '1',
    note: 'Lunch',
    price: '50.00',
    category: 'Food',
    categoryTypeId: 1,
    createdAt: String(new Date()),
  },
  {
    key: '1',
    note: 'Salary',
    price: '22000.00',
    category: 'Salary',
    categoryTypeId: 2,
    createdAt: String(new Date()),
  },
  {
    key: '1',
    note: 'Mobile bills',
    price: '240.00',
    category: 'Bills',
    categoryTypeId: 1,
    createdAt: String(new Date()),
  },
  {
    key: '1',
    note: 'Drinks & Snacks',
    price: '100.00',
    category: 'Snacks',
    categoryTypeId: 1,
    createdAt: String(new Date()),
  },
];

const InExTable = () => {
  const [ selectMonth, setSelectMonth ] = useState<string>(dayjs(new Date()).format('MM-DD-YYYY'))
  const [ searchText, setSearchText ] = useState<string>('')
  const [ filteredList, setFilteredList ] = useState<DataType[]>(data)

  const columns: TableProps<DataType>[ 'columns' ] = [
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
      title: <p className='text-bluePastel fontBold'>Price</p>,
      key: 'price',
      dataIndex: 'price',
      render: (price: string) => <p className='text-main'>{price}</p>,
    },
    {
      title: <p className='text-bluePastel fontBold'>Category</p>,
      key: 'category',
      dataIndex: 'category',
      render: (category: string, record: DataType) => {
        if (record.categoryTypeId === 1) {
          return (
            <Tag
              color="error"
              className='w-full text-center text-[10px]'
              style={{
                backgroundColor: '#fff'
              }}
            >
              {category}
            </Tag>
          )
        } else if (record.categoryTypeId === 2) {
          return (
            <Tag
              color="green"
              className='w-full text-center text-[10px]'
              style={{
                backgroundColor: '#fff',
              }}
            >
              {category}
            </Tag>
          )
        } else {
          return <Tag>{category}</Tag>;
        }
      }
    }
  ];

  useEffect(() => {
    if (searchText !== '') {
      setFilteredList(data.filter((item: DataType) => {
        const formattedCreatedAtDate = dayjs(item.createdAt).format('MM-DD-YYYY')

        const matchesSearchText = (
          item.note.toLowerCase().includes(searchText) ||
          item.price.includes(searchText) ||
          item.category.toLowerCase().includes(searchText) ||
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
          className='border-borderLightBlue rounded-[15px] text-bluePastel text-[15px] w-full'
          allowClear={false}
        />
        <Input
          placeholder="Search for something"
          prefix={<HiMiniMagnifyingGlass className="text-placeholderICON mx-2" />}
          className="hidden md:flex md:w-full lg:w-[409px] h-full rounded-[40px] bg-placeholderBG border-none"
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
      </div>
      <Table columns={columns} dataSource={filteredList} />
    </div>
  )
}

export default InExTable