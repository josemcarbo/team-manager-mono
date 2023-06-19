'use client'
import { useRouter } from 'next/navigation'
import { skipToken } from '@reduxjs/toolkit/query/react'
import useSessionStorage from '@/app/core/hooks/useLocalStorage'
import React, { useEffect } from 'react'
import { useGetUserQuery } from '@/app/core/redux/services/userApi'
import { useFindAllQuery } from '@/app/core/redux/services/boardApi'
import { useAppDispatch } from '@/app/core/redux/hooks'
import { addUser } from '@/app/core/redux/features/userSlice'
import { refreshList } from '../app/core/redux/features/boardSlice'
import Loading from '../components/loading/loading'
import BoardCreate from '../components/board/create/page'
import styles from './page.module.css'
import Board from '@/components/board/list/board'
import { refreshOneError } from './core/redux/features/errorSlice'

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
  } = useGetUserQuery(token === null ? skipToken : undefined)

  const {
    data: boards,
    isSuccess: boardIsSuccess,
    isError: boardIsError,
    error: boardError,
    isLoading: boardIsLoading
  } = useFindAllQuery(!userIsSuccess ? skipToken : undefined)

  useEffect(() => {
    token === null && router.push('/login')
  }, [token])

  useEffect(() => {
    if (userIsSuccess && user !== null) {
      dispatch(addUser(user))
    }

    if (userIsError && userError !== null) {
      const { status, data } = userError as any
      dispatch(refreshOneError({ status: status as number, message: data?.message ?? 'ERR_CONNECTION_REFUSED' }))
    }
  }, [userIsSuccess, user, userIsError, userError])

  useEffect(() => {
    if (boardIsSuccess && boards !== null) {
      dispatch(refreshList(boards))
    }

    if (boardIsError && boardError !== null) {
      const { status, data } = boardError as any
      dispatch(refreshOneError({ status: status as number, message: data?.message ?? 'ERR_CONNECTION_REFUSED' }))
    }
  }, [boards, boardIsSuccess, boardIsError, boardError])

  return (
    <>
      {(userIsLoading || boardIsLoading) && <Loading />}
      <section className={styles.page_container}>
        <Board />
      </section>
      <BoardCreate />
    </>
  )
}
