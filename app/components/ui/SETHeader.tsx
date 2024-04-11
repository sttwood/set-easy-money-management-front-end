import React from 'react'
import SETButton, {ButtonType} from './SETButton'
import {IoIosArrowDown} from 'react-icons/io'
import {DatePicker} from 'antd'

export enum RightElementType {
  SelectYear = "selectYear",
  Export = "export",
}

interface Prop {
  title: string
  onClick?: () => void
  rightElementType?: RightElementType
}

const SETHeader = (prop: Prop) => {
  const {
    title,
    onClick,
    rightElementType
  } = prop

  const renderRightElement = () => {
    switch (rightElementType) {
      case RightElementType.SelectYear:
        return (
          <DatePicker
            picker="year"
            suffixIcon={
              <IoIosArrowDown />
            }
            className='border-borderLightBlue rounded-[15px] text-bluePastelText text-[15px]'
          />
        )
      case RightElementType.Export:
        return (
          <SETButton
            title='Export'
            type={ButtonType.borderSecondary}
            buttonStyle='rounded-[50px] border-borderLightBlue text-bluePastelText text-[15px]'
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='flex justify-between items-center w-full'>
      <h3 className='text-lg text-main font-bold'>{title}</h3>
      {renderRightElement()}
    </div>
  )
}

export default SETHeader