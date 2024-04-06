/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon} from '@heroicons/react/20/solid'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Checkbox, Input, Link} from '@nextui-org/react'
import {passwordStrength} from 'check-password-strength'
import React, {useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import validator from 'validator'
import {z} from 'zod'
import PasswordStrength from './PasswordStrength'
import {registerUser} from '@/lib/actions/authAction'
import {toast} from 'react-toastify'

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be alleast 2 characters")
    .max(45, "First name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No speacial characters allowed!"),
  lastName: z
    .string()
    .min(2, "First name must be alleast 2 characters")
    .max(45, "First name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No speacial characters allowed!"),
  email: z
    .string()
    .email("Please enter a valid email"),
  phone: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(45, "Password must be less than 45 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(45, "Password must be less than 45 characters"),
  accepted: z
    .literal(true, {
      errorMap: () => ({
        message: "Please accept the terms and conditions",
      })
    }),
  role: z
    .string()
    .optional()
    .default("user")
  
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords and Confirm password doesn't match!",
  path: ["password", "confirmPassword"],
})

type InputType = z.infer<typeof FormSchema>

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: {errors}
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const [passStrength, setPassStrength] = useState(0)
  const [isVisiblePass, setIsVisiblePass] = useState(false)
  const [isVisibleConfirmPass, setIsVisibleConfirmPass] = useState(false)

  const toggleVisiblePass = () => setIsVisiblePass(!isVisiblePass)
  const toggleVisibleConfirmPass = () => setIsVisibleConfirmPass(!isVisibleConfirmPass)

  useEffect(() => {

    setPassStrength(passwordStrength(watch().password).id)
  }, [watch().password])

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const {accepted, confirmPassword, ...user} = data
    try {
      const res = await registerUser(user)
      toast.success("User registered successfully")

    } catch (error) {
      toast.error("Something went wrong. Please try again")
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className='grid grid-cols-2 place-self-stretch gap-3 p-5 shadow border rounded-md'
    >
      <Input
        {...register("firstName")}
        errorMessage={errors?.firstName?.message}
        isInvalid={!!errors?.firstName?.message}
        label="First Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("lastName")}
        isInvalid={!!errors?.lastName?.message}
        errorMessage={errors?.lastName?.message}
        label="Last Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("email")}
        isInvalid={!!errors?.email?.message}
        errorMessage={errors?.email?.message}
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
        className='col-span-2'
      />
      <Input
        {...register("phone")}
        isInvalid={!!errors?.phone?.message}
        errorMessage={errors?.phone?.message}
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
        className='col-span-2'
      />
      <Input
        {...register("password")}
        isInvalid={!!errors?.password?.message}
        errorMessage={errors?.password?.message}
        label="Password"
        type={isVisiblePass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        className='col-span-2'
        endContent={
          isVisiblePass ? (
            <EyeSlashIcon
              className='w-4 cursor-pointer'
              onClick={toggleVisiblePass}
            />
          ) : (
            <EyeIcon
              className='w-4 cursor-pointer'
              onClick={toggleVisiblePass}
            />
          )
        }
      />
      <PasswordStrength passStrength={passStrength} />

      <Input
        {...register("confirmPassword")}
        isInvalid={!!errors?.confirmPassword?.message}
        errorMessage={errors?.confirmPassword?.message}
        label="Confirm Password"
        type={isVisibleConfirmPass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        className='col-span-2'
        endContent={
          isVisibleConfirmPass ? (
            <EyeSlashIcon
              className='w-4 cursor-pointer'
              onClick={toggleVisibleConfirmPass}
            />
          ) : (
            <EyeIcon
              className='w-4 cursor-pointer'
              onClick={toggleVisibleConfirmPass}
            />
          )
        }
      />
      <Controller
        control={control}
        name="accepted"
        render={({field}) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className='col-span-2'
          >
            I Accept the <Link href='/terms'>Terms and Conditions</Link>
          </Checkbox>
        )}
      />
      {!!errors.accepted && (
        <p className="text-red-500 col-span-2">{errors.accepted.message}</p>
      )}

      <div className='flex justify-center col-span-2'>
        <Button color='primary' type='submit' className='w-48'>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default SignUpForm