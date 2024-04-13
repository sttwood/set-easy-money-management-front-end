"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {Button, Input, Table, TableProps, Tag} from 'antd'
import {IoIosArrowDown} from "react-icons/io"
import {HiMiniMagnifyingGlass} from 'react-icons/hi2'
import dayjs from 'dayjs'
import {DataType} from '@/app/income-expense/page'
import {FaRegEdit} from "react-icons/fa"
import {RiDeleteBin6Line} from "react-icons/ri"

type Props = {
  data: DataType[]
}

const InExTable = (prop: Props) => {
  const {data} = prop

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
      render: (price: string) => (
        <p className='text-main'>
          {parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
      ),
    },
    {
      title: <p className='text-bluePastel fontBold'>Category</p>,
      key: 'category',
      dataIndex: 'category',
      render: (category: string) => <p className='text-main'>{category}</p>,
    },
    {
      title: <p className='text-bluePastel fontBold'>Actions</p>,
      key: 'actions',
      dataIndex: 'actions',
      render: () => {
        return (
          <div className='flex flex-row items-center gap-2'>
            <Button
              onClick={() => {}}
              className='border-0 p-2 bg-transparent'
            >
              <FaRegEdit className='text-[#3F434A]' size={14} />
            </Button>
            <Button
              onClick={() => {}}
              className='border-0 p-2 bg-transparent'
            >
              <RiDeleteBin6Line className='text-[#3F434A]' size={14} />
            </Button>
          </div>
        )
      },
      width: 100
    },
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
      <Table columns={columns} dataSource={filteredList} />
    </div>
  )
}

export default InExTable