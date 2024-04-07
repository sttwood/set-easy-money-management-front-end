"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import {passwordStrength} from 'check-password-strength'
import React, {useEffect, useState} from 'react'
import PasswordStrength from './PasswordStrength'
import {toast} from 'react-toastify'
import {resetPassword} from '@/lib/actions/authAction'
import {Button, Form, Input, Result} from 'antd'
import {signIn} from 'next-auth/react'

interface Props {
  jwtUserId: string
}

type FieldType = {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = ({jwtUserId}: Props) => {

  const [ password, setPassword ] = useState<string>('')
  const [ passStrength, setPassStrength ] = useState<number>(0)
  const [ resetPassSuccess, setResetPassSuccess ] = useState<boolean>(false)
  const [ loadings, setLoadings ] = useState<boolean>(false)

  useEffect(() => {
    setPassStrength(passwordStrength(password).id)
  }, [ password ])

  const resetPass = async (data: FieldType) => {
    setLoadings(true)
    if (data.password === data.confirmPassword) {
      try {
        const result = await resetPassword(jwtUserId, data.password)
        if (result === "success") {
          setLoadings(false)
          setResetPassSuccess(true)
          setTimeout(() => {
            signIn()
          }, 3000)
          toast.success("Your Password has been reset successfully")
        }
      } catch (error) {
        setLoadings(false)
        console.log(error)
        toast.error("Something went wrong. Please try again")
      }
    } else {
      setLoadings(false)
      toast.error("Passwords do not match")
    }
  }

  return (
    <>
      {resetPassSuccess ? (
        <div className='py-[7%] flex flex-col justify-center items-center w-full max-w-[700px] bg-[#fff] rounded-[50px]'>
          <Result
            status="success"
            title="Reset Password Successful!"
            subTitle="You have successfully reset your password. It will go to Sign in page in 3 seconds."
          />
        </div>
      ) : (
        <Form
          name="resetPass"
          onFinish={resetPass}
          layout="vertical"
          autoComplete="off"
          className='flex flex-col py-[5%] px-[5%] overflow-hidden w-full max-w-[700px] bg-[#fff] rounded-[50px]'
        >
          <div className='flex flex-col items-center justify-center text-center mb-[30px]'>
            <h2 className='text-main text-[30px] font-bold'>Set new password</h2>
            <p className='text-subMain text-[20px]'>Here you can set new password for sign in. Make sure you remember this password an keep it in a safe place.</p>
          </div>
          <Form.Item<FieldType>
            label={<span>Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your Password!",
              },
            ]}
            className={`${password !== '' ? 'mb-[10px]' : 'mb-[30px]'} text-main`}
          >
            <Input.Password
              type='password'
              placeholder="Enter your Password"
              className='py-3 mb-0'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          {password !== '' && <PasswordStrength passStrength={passStrength} style="mb-[30px]" />}
          <Form.Item<FieldType>
            label={<span>Confirm Password</span>}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please enter your Confirm Password!",
              },
            ]}
            className='mb-[30px] text-main'
          >
            <Input.Password
              type='confirmPassword'
              placeholder="Enter your Confirm Password"
              className='py-3'
            />
          </Form.Item>
          <Form.Item className="text-center mb-[30px] w-full">
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
      )}
    </>
  )
}

export default ResetPasswordForm