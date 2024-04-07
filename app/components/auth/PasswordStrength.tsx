import {cn} from 'clsx-tailwind-merge'
import React from 'react'

interface Props {
  passStrength: number
  style?: string
}

const PasswordStrength = ({passStrength, style}: Props) => {
  return (
    <div className={cn(`flex col-span-2 gap-2 ${style}`, {
      'justify-around': passStrength === 3,
      'justify-start': passStrength < 3
    })}>
      {Array.from({length: passStrength + 1}).map((i, index) => (
        <div
          key={`password-strength-${index}`}
          className={cn('h-2 rounded-md', {
            'bg-[#ff4f3f] w-[24%]': passStrength === 0,
            'bg-[#f97316] w-[24%]': passStrength === 1,
            'bg-[#eab308] w-[24%]': passStrength === 2,
            'bg-[#22c55e] w-[24%]': passStrength === 3,
          })}
        >

        </div>
      ))}
    </div>
  )
}

export default PasswordStrength