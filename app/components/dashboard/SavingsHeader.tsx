import React from 'react'
import Image from 'next/image'

const SavingsHeader = () => {
  return (
    <div className="flex flex-row justify-between gap-6">
      <div className="flex flex-row gap-6 bg-[#F4FEED] py-4 px-6 rounded-[20px] w-full items-center">
        <div className="bg-[#CFFCC3] p-[13.5px] rounded-full flex items-center max-h-[45px]">
          <Image
            src="/icons/total_savings.svg"
            alt="total_savings"
            width={18}
            height={18}
            className="w-[18px] h-[18px]"
          />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-bluePastel font-bold text-xs">Total Svaing</p>
          <p className="text-main font-bold">฿ 50,000.00 </p>
          <p className="text-[#59CA47] text-xs">65,556.22 (+9.26%)</p>
        </div>
      </div>
      <div className="flex flex-row gap-6 bg-[#FDFFEE] py-4 px-6 rounded-[20px] w-full items-center">
        <div className="bg-[#FFF5D9] p-[13.5px] rounded-full flex items-center max-h-[45px]">
          <Image
            src="/icons/total_interest.svg"
            alt="total_interest"
            width={18}
            height={18}
            className="w-[18px] h-[18px]"
          />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-bluePastel font-bold text-xs">Total Svaing</p>
          <p className="text-main font-bold">฿ 50,000.00 </p>
          <p className="text-[#CAA41F] text-xs">65,556.22 (+9.26%)</p>
        </div>
      </div>
    </div>
  )
}

export default SavingsHeader