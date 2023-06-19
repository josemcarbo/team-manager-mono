'use client'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { resetError } from '@/app/core/redux/features/errorSlice'

interface Props {
  children: React.ReactNode
}

export default function ErrorHandler ({ children }: Props): React.ReactElement {
  const error = useAppSelector((state) => state.error.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error !== null) {
      toast.error(`${error?.status}: ${error.message}`)
      dispatch(resetError())
    }
  }, [error])

  return <>{children}</>
}
