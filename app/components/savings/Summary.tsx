"use client"

import React from 'react'
import Image from 'next/image'

const Summary = () => {


  return (
    <div className='flex flex-row justify-between gap-6'>
      {/* Capital */}
      <div className='flex flex-col items-center justify-center gap-4 bg-lightBlue rounded-[8px] w-full py-4'>
        <p className='text-main text-lg font-bold'>Capital</p>
        <p className='text-main text-xl font-bold'>฿ 20,000.00</p>
      </div>
      {/* Interest */}
      <div className='flex flex-col items-center justify-center gap-4 bg-[#E0EBFD] rounded-[8px] w-full py-4'>
        <p className='text-main text-lg font-bold'>Interest</p>
        <p className='text-main text-xl font-bold'>฿ 500.00</p>
      </div>
      {/* Present Value */}
      <div className='flex flex-col items-center justify-center gap-4 bg-[#D9DDFF] rounded-[8px] w-full py-4'>
        <p className='text-main text-lg font-bold'>Present value</p>
        <p className='text-main text-xl font-bold'>฿ 20,500.00</p>
      </div>
    </div>
  )
}

export default Summary