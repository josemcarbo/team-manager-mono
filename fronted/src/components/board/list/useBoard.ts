import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import useSessionStorage from '@/app/core/hooks/useLocalStorage'
import {
  type ICard,
  useFindAllCardQuery
} from '@/app/core/redux/services/cardApi'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useEffect } from 'react'
import { type IBoard } from '@/app/core/redux/services/boardApi'
import { refreshList } from '@/app/core/redux/features/cardSlice'
import { refreshOneError } from '@/app/core/redux/features/errorSlice'

interface IUseBoard {
  board: IBoard | null
  isLoading: boolean
  cards: ICard[] | undefined
}
export default function useBoard (): IUseBoard {
  const board = useAppSelector((state) => state.board.board)
  const { getValue } = useSessionStorage()
  const token = getValue('token')
  const dispatch = useAppDispatch()
  const { data, isSuccess, isError, error, isLoading } = useFindAllCardQuery(
    token === null || board === null ? skipToken : { board: board?.id }
  )

  useEffect(() => {
    if (isSuccess && data !== null) {
      dispatch(refreshList(data))
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      dispatch(refreshOneError({ status: status as number, message: data?.message }))
    }
  }, [isSuccess, data, isError, error])

  return { board, isLoading, cards: data }
}
