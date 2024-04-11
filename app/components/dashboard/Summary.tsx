"use client"

import React from 'react'
import Image from 'next/image'

const Summary = () => {


  return (
    <div className='flex flex-row justify-between gap-6'>
      {/* Income */}
      <div className='flex flex-col gap-4 bg-[#D4F0E9] py-[38px] px-9 rounded-[8px] w-full'>
        <div className='flex flex-row justify-between'>
          <div className="flex flex-row gap-[10px]">
            <Image
              src="/icons/total_income.svg"
              alt="total_income"
              width={24}
              height={18}
            />
            <p className='text-lg font-bold text-main'>
              Total Income
            </p>
          </div>
          <p className='text-[#77B900]'>
            +5.63
          </p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col'>
            <p className='text-[#828282]'>
              Since 01/2024 - Now
            </p>
            <p className='text-xl font-bold text-main'>
              ฿ 20,000.00
            </p>
          </div>
          <Image
            src="/images/gain_graph.png"
            alt="gain_graph"
            width={78}
            height={24}
            className='w-[78px] h-[24px] object-cover'
          />
        </div>
      </div>
      {/* Expense */}
      <div className='flex flex-col gap-4 bg-[#F7E6E5] py-[38px] px-9 rounded-[8px] w-full'>
        <div className='flex flex-row justify-between'>
          <div className="flex flex-row gap-[10px]">
            <Image
              src="/icons/total_expense.svg"
              alt="total_expense"
              width={24}
              height={18}
            />
            <p className='text-lg font-bold text-main'>
              Total Expense
            </p>
          </div>
          <p className='text-[#FF2F2F]'>
            -2.91
          </p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col'>
            <p className='text-[#828282]'>
              Since 01/2024 - Now
            </p>
            <p className='text-xl font-bold text-main'>
              ฿ 20,000.00
            </p>
          </div>
          <Image
            src="/images/loss_graph.png"
            alt="loss_graph"
            width={78}
            height={24}
            className='w-[78px] h-[24px] object-cover'
          />
        </div>
      </div>
      {/* Savings */}
      <div className='flex flex-col gap-4 bg-[#F7EFDB] py-[38px] px-9 rounded-[8px] w-full'>
        <div className='flex flex-row justify-between'>
          <div className="flex flex-row gap-[10px]">
            <Image
              src="/icons/total_remaining.svg"
              alt="total_remaining"
              width={24}
              height={18}
            />
            <p className='text-lg font-bold text-main'>
              Total Remaining
            </p>
          </div>
          <p className='text-[#77B900]'>
            +1.23
          </p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col'>
            <p className='text-[#828282]'>
              Since 01/2024 - Now
            </p>
            <p className='text-xl font-bold text-main'>
              ฿ 20,000.00
            </p>
          </div>
          <Image
            src="/images/gain_graph.png"
            alt="gain_graph"
            width={78}
            height={24}
            className='w-[78px] h-[24px] object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Summary