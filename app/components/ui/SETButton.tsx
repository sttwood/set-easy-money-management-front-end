import {Button} from 'antd'
import React from 'react'

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
  borderPrimary = "borderPrimary",
  borderSecondary = "borderSecondary",
}

interface Props {
  title: string
  handleClick?: () => void
  type?: ButtonType
  buttonStyle?: string
}

const SETButton = (props: Props) => {
  const {title, handleClick, type, buttonStyle} = props

  const renderType = () => {
    switch (type) {
      case ButtonType.primary:
        return "primary"
      case ButtonType.secondary:
        return "text"
      case ButtonType.borderPrimary:
        return "default"
      case ButtonType.borderSecondary:
        return "default"
      default:
        return "default"
    }
  }

  const renderButtonType = () => {
    switch (type) {
      case ButtonType.primary:
        return "bg-primary"
      case ButtonType.secondary:
        return ""
      case ButtonType.borderPrimary:
        return "border-1 border-primary text-primary"
      case ButtonType.borderSecondary:
        return "border-1 border-border"
      default:
        return ""
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={`px-5 ${renderButtonType()} ${buttonStyle}`}
      type={renderType()}
    >
      {title}
    </Button>
  )
}

export default SETButton