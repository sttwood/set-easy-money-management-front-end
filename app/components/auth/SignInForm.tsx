"use client"
import React, {useState} from 'react'
import Link from "next/link";
import {useRouter} from 'next/navigation'
import {signIn} from 'next-auth/react'
import {toast} from 'react-toastify'
import {Button, Checkbox, Form, Input} from 'antd';

interface Props {
  callbackUrl?: string
}

type FieldType = {
  email: string;
  password: string;
  termsAndconditions: boolean
}

const SignInForm = (props: Props) => {
  const router = useRouter()

  const [ loadings, setLoadings ] = useState<boolean>(false)

  const onSubmit = async (data: FieldType) => {
    setLoadings(true)
    const res = await signIn('credentials', {
      redirect: false,
      username: data.email,
      password: data.password
    })

    if (!res?.ok) {
      setLoadings(false)
      toast.error(res?.error)
      return
    }
    setLoadings(false)
    toast.success("You're logged in successfully")
    router.push(props.callbackUrl ? props.callbackUrl : '/')
  }

  return (
    <Form
      name="signIn"
      onFinish={onSubmit}
      layout="vertical"
      autoComplete="off"
      className='flex flex-col gap-4 py-[5%] px-[7%] overflow-hidden w-full max-w-[700px] bg-[#fff] rounded-[50px]'
    >
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-main text-[30px] font-bold'>Sign In</h2>
        <p className='text-subMain text-[20px]'>Enjoy all the services without any ads for free!</p>
      </div>
      <div className='flex flex-col'>
        <Form.Item<FieldType>
          label={<span>Email</span>}
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your Email Address!",
            },
          ]}
          className='mb-5 text-main'
        >
          <Input
            type='email'
            placeholder="Enter your Email Address"
            className='py-3'
          />
        </Form.Item>
        <Form.Item<FieldType>
          label={<span>Password</span>}
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your Password!",
            },
          ]}
          className='mb-2 text-main'
        >
          <Input.Password
            placeholder="Enter your Password"
            className='py-3'
          />
        </Form.Item>
        <Link href={"/auth/forgotPassword"} className='text-end text-[14px] text-primary underline transition-all hover:text-hoverPrimary'>Forgot your password?</Link>
      </div>
      <Form.Item<FieldType>
        name="termsAndconditions"
        valuePropName="checked"
        rules={[
          {
            required: true,
            message: "Please accept the terms and conditions",
          },
        ]}
        className='mb-2 text-main'
      >
        <Checkbox className='py-2'>
          By using this service, I agree to our
          <Link href={"/"} className='text-primary underline ml-1'>
            Terms and Conditions
          </Link>
        </Checkbox>
      </Form.Item>
      <div className="flex flex-col gap-4">
        <Form.Item className="text-center mb-0">
          <Button
            type="primary"
            htmlType="submit"
            className='w-[60%] bg-primary rounded-2xl h-[48px] text-2xl'
            loading={loadings}
          >
            Sign in
          </Button>
        </Form.Item>
        <span className='text-center'>
          Don’t have an acount? <Link href={"/auth/signup"} className='text-primary underline ml-1'>Sign up</Link>
        </span>
      </div>
    </Form>
  )
}

export default SignInForm
