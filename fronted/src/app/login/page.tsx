/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'
import { useLoginMutation } from '@/app/core/redux/services/authAApi'
import useSessionStorage from '@/app/core/hooks/useLocalStorage'
import { refreshOneError } from '../core/redux/features/errorSlice'
import { useAppDispatch } from '../core/redux/hooks'

export default function LoginPage (): React.ReactElement {
  const router = useRouter()
  const [login, { isSuccess, data, error, isError }] = useLoginMutation()
  const { setValue } = useSessionStorage()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading }
  } = useForm()

  useEffect(() => {
    if (isSuccess && data !== null) {
      setValue('token', data?.access_token)
      router.push('/')
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      dispatch(refreshOneError({ status: status as number, message: data?.message }))
    }
  }, [isSuccess, data, isError, error])

  const onSubmit = async (): Promise<void> => {
    const body: any = watch()
    await login(body)
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          Login
        </button>
        <Link href="/register" className={styles.link}>
          Register
        </Link>
      </form>
    </section>
  )
}
