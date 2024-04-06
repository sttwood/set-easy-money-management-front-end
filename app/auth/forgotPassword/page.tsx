"use client"

import {forgotPassword} from '@/lib/actions/authAction'
import {EnvelopeIcon} from '@heroicons/react/20/solid'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Input} from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {z} from 'zod'

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
})

type InputType = z.infer<typeof FormSchema>

const ForgotPasswordPage = () => {
  const {
    register, 
    handleSubmit, 
    reset, 
    formState: {errors, isSubmitting}
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await forgotPassword(data.email)
      if (result) toast.success("Reset password link was sent to your email.")
      reset()

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again")
    }
  }

  return (
    <div className='grid gird-cols-1 md:grid-cols-3 items-center'>
      <form 
        onSubmit={handleSubmit(submitRequest)}
        className='flex flex-col gap-2 m-2 p-2 border rounded-md shadow'
      >
        <div className="text-center p-2">Enter your email</div>
        <Input
          label="Email"
          startContent={<EnvelopeIcon className="w-4" />}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <Button 
          type='submit'
          isLoading={isSubmitting} 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please Wait..." : "Submit"}
        </Button>
      </form>

      <Image 
        src="/images/login.png" 
        alt='forgot password' 
        width={500} 
        height={500} 
        className='col-span-2 place-self-center' 
      />
    </div>
  )
}

export default ForgotPasswordPage