"use client"

import {forgotPassword} from '@/lib/actions/authAction'
import {Button, Form, Input} from 'antd'
import {signIn} from 'next-auth/react'
import React, {useState} from 'react'
import {toast} from 'react-toastify'

type FieldType = {
  email: string;
}

const ForgotPasswordPage = () => {
  const [ loadings, setLoadings ] = useState<boolean>(false)

  const submitRequest = async (data: FieldType) => {
    setLoadings(true)
    try {
      const result = await forgotPassword(data.email)
      if (result) {
        setLoadings(false)
        toast.success("Reset password link was sent to your email.")
      }
    } catch (error) {
      setLoadings(false)
      console.log(error)
      toast.error("Something went wrong. Please try again")
    }
  }

  return (
    <div className="flex flex-col items-center px-[5%] pt-[3%] pb-[10%] h-screen bg-[url('/images/bg-auth.png')]">
      <Form
        name="forgotPass"
        onFinish={submitRequest}
        layout="vertical"
        autoComplete="off"
        className='flex flex-col gap-[30px] py-[5%] px-[7%] overflow-hidden w-full max-w-[700px] bg-[#fff] rounded-[50px]'
      >
        <div className='flex flex-col items-center justify-center text-center'>
          <h2 className='text-main text-[30px] font-bold'>Forget your password</h2>
          <p className='text-subMain text-[20px]'>Please enter the email that you want to reset password.</p>
        </div>
        <Form.Item<FieldType>
          label={<span>Email</span>}
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your Email Address!",
            },
          ]}
          className='mb-0 text-main'
        >
          <Input
            type='email'
            placeholder="Enter your Email Address"
            className='py-3'
          />
        </Form.Item>
        <Form.Item className="text-center mb-0 w-full">
          <Button
            type="primary"
            htmlType="submit"
            className='w-full bg-primary rounded-2xl h-[48px] text-2xl'
            loading={loadings}
          >
            Submit
          </Button>
        </Form.Item>
        <div className='text-center mb-0'>
          Back to <span
            onClick={() => signIn()}
            className='text-primary hover:text-hoverPrimary transition-all underline cursor-pointer'
          >
            Sign in
          </span>
        </div>
      </Form>
    </div>
  )
}

export default ForgotPasswordPage