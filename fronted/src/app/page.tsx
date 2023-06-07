'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { skipToken } from '@reduxjs/toolkit/query/react'
import useSessionStorage from '@/app/core/hooks/useLocalStorage'
import React, { useEffect } from 'react'
import { useGetUserQuery } from '@/app/core/redux/services/userApi'
import { useFindAllQuery } from '@/app/core/redux/services/boardApi'
import { useAppDispatch } from '@/app/core/redux/hooks'
import { addUser } from '@/app/core/redux/features/userSlice'
import { refreshList } from '@/app/core/redux/features/boardSlice'
import Loading from '../components/loading/loading'
import BoardCreate from '@/components/board/create/page'
import styles from './page.module.css'
import Board from '@/components/board_/board'

export default function HomePage (): React.ReactElement {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { getValue } = useSessionStorage()
  const token = getValue('token')
  const {
    data: user,
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError,
    isLoading: userIsLoading
  } = useGetUserQuery(token ?? skipToken)

  const {
    data: boards,
    isSuccess: boardIsSuccess,
    isError: boardIsError,
    error: boardError,
    isLoading: boardIsLoading
  } = useFindAllQuery(token === null ? skipToken : undefined)

  useEffect(() => {
    token === null && router.push('/login')
  }, [token])

  useEffect(() => {
    if (userIsSuccess && user !== null) {
      dispatch(addUser(user))
    }

    if (userIsError && userError !== null) {
      const { status, data } = userError as any
      toast.error(
        `${status as string}: ${
          (data?.message ?? 'ERR_CONNECTION_REFUSED') as string
        }`
      )
    }
  }, [userIsSuccess, user, userIsError, userError])

  useEffect(() => {
    if (boardIsSuccess && boards !== null) {
      dispatch(refreshList(boards))
    }

    if (boardIsError && boardError !== null) {
      const { status, data } = boardError as any
      toast.error(
        `${status as string}: ${
          (data?.message ?? 'ERR_CONNECTION_REFUSED') as string
        }`
      )
    }
  }, [boards, boardIsSuccess, boardIsError, boardError])

  return (
    <>
      {(userIsLoading || boardIsLoading) && <Loading />}
      <section className={styles.container}>
        <Board />
      </section>
      <BoardCreate />
    </>
  )
}
