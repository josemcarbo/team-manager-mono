import { useEffect, useState } from 'react'
import { useCreateMutation } from '@/app/core/redux/services/boardApi'
import {
  refreshOne,
  createViewOpen
} from '@/app/core/redux/features/boardSlice'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { BOARD_LIST } from '@/app/core/constants'
import { refreshOneError } from '@/app/core/redux/features/errorSlice'

interface UseCreate {
  board: any
  isCreateViewOpen: boolean
  onSubmit: (event: any) => Promise<void>
  handleCloseView: () => void
  onChangeNameValue: (event: any) => void
  onChangeDescriptionValue: (event: any) => void
}

const defaultValues = {
  name: '',
  description: '',
  list: BOARD_LIST
}

export default function useCreate (): UseCreate {
  const [board, setBoard] = useState(defaultValues)
  const isCreateViewOpen = useAppSelector(
    (state) => state.board.createViewOpen
  )
  const [create, { isSuccess, data, error, isError }] =
  useCreateMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess && data !== undefined) {
      dispatch(refreshOne(data))
      handleCloseView()
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      dispatch(refreshOneError({ status: status as number, message: data?.message }))
    }
  }, [isSuccess, data, isError, error])

  const onSubmit = async (event: any): Promise<void> => {
    event.preventDefault()
    await create(board)
  }

  const handleCloseView = (): void => {
    dispatch(createViewOpen(false))
  }

  const onChangeNameValue = (event: any): void => {
    setBoard({ ...board, name: event.target.value })
  }

  const onChangeDescriptionValue = (event: any): void => {
    setBoard({ ...board, description: event.target.value })
  }

  return {
    board,
    onSubmit,
    isCreateViewOpen,
    handleCloseView,
    onChangeNameValue,
    onChangeDescriptionValue
  }
}
