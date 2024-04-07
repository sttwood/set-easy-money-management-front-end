/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {passwordStrength} from 'check-password-strength'
import React, {useEffect, useState} from 'react'
import PasswordStrength from './PasswordStrength'
import {registerUser} from '@/lib/actions/authAction'
import {toast} from 'react-toastify'
import {Form, Input, Button, Checkbox, Result} from 'antd'
import Link from 'next/link'
import {signIn} from 'next-auth/react'
import prisma from '@/lib/prisma'
import {useRouter} from 'next/navigation'

type FieldType = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  accepted?: boolean
  role?: string
}

const SignUpForm = () => {
  const router = useRouter()

  const [ password, setPassword ] = useState<string>("")
  const [ passStrength, setPassStrength ] = useState<number>(0)
  const [ signUpSuccess, setSignUpSuccess ] = useState<boolean>(false)
  const [ loadings, setLoadings ] = useState<boolean>(false)

  useEffect(() => {
    setPassStrength(passwordStrength(password).id)
  }, [ password ])

  const saveUser = async (data: FieldType) => {
    setLoadings(true)
    const {accepted, confirmPassword, ...user} = data

    const finalData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: "user",
    }
    if (data.password === data.confirmPassword) {
      try {
        const res = await registerUser(finalData)
        if (res === "success") {
          setLoadings(true)
          setSignUpSuccess(true)
        }
        setTimeout(() => {
          signIn()
        }, 3000)
        toast.success("User registered successfully.")
      } catch (error: any) {
        if (error.message.includes('Unique constraint failed on the fields: (`email`)')) {
          toast.error('User with this email already exists!')
        } else {
          toast.error('Something went wrong! Please try again.')
        }
        console.log(error)
      }
      setLoadings(false)
    } else {
      setLoadings(false)
      toast.error("Passwords do not match")
    }
  }

  return (
    <>
      {signUpSuccess ? (
        <div className='py-[7%] flex flex-col justify-center items-center w-full max-w-[700px] bg-[#fff] rounded-[50px]'>
          <Result
            status="success"
            title="Successfully Signed Up!"
            subTitle="Please check your email for verification link before logging in and use our services. It will go to Sign in page in 3 seconds."
          />
        </div>
      ) : (
        <Form
          name="signUp"
          onFinish={saveUser}
          layout="vertical"
          autoComplete="off"
          className='flex flex-col gap-4 py-[5%] px-[7%] w-full max-w-[700px] bg-[#fff] rounded-[50px]'
        >
          <div className='flex flex-col items-center justify-center text-center w-[80%] mx-[auto] mb-4'>
            <h2 className='text-main text-[30px] font-bold'>Sign Up</h2>
            <p className='text-subMain text-[20px]'>Create an account to enjoy all the services without any ads for free!</p>
          </div>
          <div className='flex flex-col'>
            <div className="flex w-full justify-between gap-4">
              <Form.Item<FieldType>
                label={<span>First Name</span>}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your First Name!",
                  },
                ]}
                className='mb-5 text-main w-full'
              >
                <Input
                  type='firstName'
                  placeholder="Enter your First Name"
                  className='py-3'
                />
              </Form.Item>
              <Form.Item<FieldType>
                label={<span>Last Name</span>}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Last Name!",
                  },
                ]}
                className='mb-5 text-main w-full'
              >
                <Input
                  type='lastName'
                  placeholder="Enter your Last Name"
                  className='py-3'
                />
              </Form.Item>
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
              className='mb-5 text-main'
            >
              <Input
                type='email'
                placeholder="Enter your Email Address"
                className='py-3'
              />
            </Form.Item>
            <Form.Item<FieldType>
              label={<span>Phone</span>}
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your Phone Number!",
                },
              ]}
              className='mb-2 text-main'
            >
              <Input
                placeholder="Enter your Phone Number"
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            {password !== '' && <PasswordStrength passStrength={passStrength} />}
            <Form.Item<FieldType>
              label={<span>Confirm Password</span>}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your Confirm Password!",
                },
              ]}
              className='mb-2 text-main'
            >
              <Input.Password
                placeholder="Enter your Confirm Password"
                className='py-3'
              />
            </Form.Item>
          </div>
          <Form.Item<FieldType>
            name="accepted"
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
              By creating an account, I agree to our
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
                className='w-full bg-primary rounded-2xl h-[48px] text-2xl'
                loading={loadings}
              >
                Sign Up
              </Button>
            </Form.Item>
            <span className='text-center'>
              Already Have An Account?
              <span
                onClick={() => signIn()}
                className='text-primary hover:text-hoverPrimary transition-all underline ml-1 cursor-pointer'
              >
                Sign in
              </span>
            </span>
          </div>
        </Form>
      )}
    </>
  )
}

export default SignUpForm