"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/20/solid'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Input} from '@nextui-org/react'
import {passwordStrength} from 'check-password-strength'
import React, {useEffect, useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import PasswordStrength from './PasswordStrength'
import {toast} from 'react-toastify'
import {resetPassword} from '@/lib/actions/authAction'

interface Props {
  jwtUserId: string
}

const FormSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(45, "Password must be less than 45 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords doesn't match!",
  path: ["confirmPassword"],
})

type InputType = z.infer<typeof FormSchema>

const ResetPasswordForm = ({jwtUserId}: Props) => {
  const {
    register, 
    handleSubmit, 
    reset,
    watch,
    formState: {errors, isSubmitting}
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const [passStrength, setPassStrength] = useState(0)
  const [visiblePass, setVisiblePass] = useState(false)
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false)

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id)
  }, [watch().password])

  const resetPass: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPassword(jwtUserId, data.password)
      if (result === "success") toast.success("Your Password has been reset successfully")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again")
    }
  }

  return (
    <form onSubmit={handleSubmit(resetPass)} className='flex flex-col gap-2 p-2 m-2 border rounded-md shadow'>
      <div className='text-center p-2'>Reset Your Password</div>
      <Input 
        label="Password" 
        {...register("password")} 
        errorMessage={errors.password?.message}
        type={visiblePass ? "text" : "password"}
        endContent={
          <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
            {visiblePass
              ? <EyeSlashIcon className='w-4' />
              : <EyeIcon className='w-4' />
            }
          </button>
        }
      />
      <PasswordStrength passStrength={passStrength} />
      <Input 
        label="Confirm Password" 
        {...register("confirmPassword")} 
        errorMessage={errors.confirmPassword?.message}
        type={visibleConfirmPass ? "text" : "password"}
        endContent={
          <button type="button" onClick={() => setVisibleConfirmPass((prev) => !prev)}>
            {visibleConfirmPass
              ? <EyeSlashIcon className='w-4' />
              : <EyeIcon className='w-4' />
            }
          </button>
        }
      />
      <div className="flex justify-center">
        <Button
          type='submit'
          color="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Please Wait..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default ResetPasswordForm