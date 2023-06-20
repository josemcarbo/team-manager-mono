'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { resetError } from '@/app/core/redux/features/errorSlice'

interface Props {
  children: React.ReactNode
}

export default function ErrorHandler ({ children }: Props): React.ReactElement {
  const error = useAppSelector((state) => state.error.error)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (error !== null) {
      error.status > 1
        ? toast.error(`${error?.status}: ${error.message}`)
        : toast.info(`${error?.status}: ${error.message}`)
      dispatch(resetError())

      if (error.status === 401) {
        router.push('/login')
      }
    }
  }, [error])

  return <>{children}</>
}
