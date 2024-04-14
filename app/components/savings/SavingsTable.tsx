import {Button, Table, TableProps} from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import {FaRegEdit} from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'

interface DataType {
  key: string
  depositAmount: string
  presentValue: string
  interest: string
  interestRate: number
  total: string
  createdAt: string
}

const data: DataType[] = [
  {
    key: '1',
    depositAmount: '20000.00',
    presentValue: '20000.00',
    interest: '1000.00',
    interestRate: 5,
    total: '21000.00',
    createdAt: String(new Date()),
  },
  {
    key: '2',
    depositAmount: '20000.00',
    presentValue: '41000.00',
    interest: '2050.00',
    interestRate: 5,
    total: '43050.00',
    createdAt: String(new Date()),
  },
  {
    key: '3',
    depositAmount: '20000.00',
    presentValue: '63050.00',
    interest: '3152.50',
    interestRate: 5,
    total: '66202.50',
    createdAt: String(new Date()),
  },
];

const SavingsTable = () => {

  const columns: TableProps<DataType>[ 'columns' ] = [
    {
      title: <p className='text-bluePastel fontBold'>Date</p>,
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt: string) => <p className='text-main'>{dayjs(createdAt).format('MM-YYYY')}</p>,
    },
    {
      title: <p className='text-bluePastel fontBold'>Deposit Amount</p>,
      key: 'depositAmount',
      dataIndex: 'depositAmount',
      render: (depositAmount: string) => (
        <p className='text-main'>
          {parseFloat(depositAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
      ),
    },
    {
      title: <p className='text-bluePastel fontBold'>Present Value</p>,
      key: 'presentValue',
      dataIndex: 'presentValue',
      render: (presValue: string) => (
        <p className='text-main'>
          {parseFloat(presValue).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
      ),
    },
    {
      title: <p className='text-bluePastel fontBold'>Interest</p>,
      key: 'interest',
      dataIndex: 'interest',
      render: (interest: string) => (
        <p className='text-main'>
          {parseFloat(interest).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
      ),
    },
    {
      title: <p className='text-bluePastel fontBold'>Interest Rate (%)</p>,
      key: 'interestRate',
      dataIndex: 'interestRate',
      render: (interestRate: string) => (
        <p className='text-main'>
          {parseFloat(interestRate).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
      ),
      align: 'center',
    },
    {
      title: <p className='text-bluePastel fontBold'>Total</p>,
      key: 'total',
      dataIndex: 'total',
      render: (total: string) => (
        <p className='text-main'>
          {parseFloat(total).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
      ),
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


  return (
    <div className='mt-4 flex flex-col gap-2'>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default SavingsTable