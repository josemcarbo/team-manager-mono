/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'
import { useCreateUserMutation } from '@/app/core/redux/services/userApi'
import { refreshOneError } from '../core/redux/features/errorSlice'
import { useAppDispatch } from '../core/redux/hooks'

export default function RegisterPage (): React.ReactElement {
  const router = useRouter()
  const [createUser] = useCreateUserMutation()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading }
  } = useForm()

  const onSubmit = async (): Promise<void> => {
    const body: any = watch()
    const response: any = await createUser(body)

    if (response.error !== undefined) {
      const {
        error: { status, data }
      } = response
      dispatch(refreshOneError({ status: status as number, message: data?.message }))
    } else {
      router.push('/login')
    }
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input_container}>
          <label className={styles.placeholder}>First Name</label>
          <input
            className={styles.input}
            disabled={isLoading}
            type="text"
            {...register('firstName', { required: 'First name is required' })}
          />
          <label className={styles.error}>
            {errors.firstName?.message as string}
          </label>
        </div>

        <div className={styles.input_container}>
          <label className={styles.placeholder}>Last Name</label>
          <input
            className={styles.input}
            disabled={isLoading}
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
          />
          <label className={styles.error}>
            {errors.lastName?.message as string}
          </label>
        </div>

        <div className={styles.input_container}>
          <label className={styles.placeholder}>Email</label>
          <input
            className={styles.input}
            disabled={isLoading}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Please enter a valid email address'
              }
            })}
          />
          <label className={styles.error}>
            {errors.email?.message as string}
          </label>
        </div>

        <div className={styles.input_container}>
          <label className={styles.placeholder}>Password</label>
          <input
            className={styles.input}
            disabled={isLoading}
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          <label className={styles.error}>
            {errors.password?.message as string}
          </label>
        </div>

        <button className={styles.button} type="submit" disabled={isLoading}>
          Register
        </button>
        <Link href="/login" className={styles.link}>
          Sign In
        </Link>
      </form>
    </section>
  )
}
