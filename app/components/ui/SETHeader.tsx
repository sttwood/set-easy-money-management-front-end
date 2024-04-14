import React from 'react'
import SETButton, {ButtonType} from './SETButton'
import {IoIosArrowDown} from 'react-icons/io'
import {DatePicker} from 'antd'

export enum RightElementType {
  SelectYear = "selectYear",
  Export = "export",
  Create = "create"
}

interface Prop {
  title?: string
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
            className='border-lightBlue rounded-[15px] text-bluePastel text-[15px]'
          />
        )
      case RightElementType.Export:
        return (
          <SETButton
            title='Export'
            type={ButtonType.borderSecondary}
            buttonStyle='rounded-[50px] border-lightBlue text-bluePastel text-[15px]'
          />
        )
      case RightElementType.Create:
        return (
          <div className='flex flex-row gap-[10px] justify-between items-center'>
            <SETButton
              title='Create'
              type={ButtonType.create}
              buttonStyle='rounded-[50px] border-lightBlue text-[#fff] text-[15px]'
            />
            <SETButton
              title='Export All'
              type={ButtonType.borderSecondary}
              buttonStyle='rounded-[50px] border-lightBlue text-bluePastel text-[15px]'
            />
          </div>
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