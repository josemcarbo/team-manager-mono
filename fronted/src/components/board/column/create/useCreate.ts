import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import {
  type IBoard,
  useAddNewListMutation
} from '@/app/core/redux/services/boardApi'
import { useEffect, useState } from 'react'
import { refreshOne } from '@/app/core/redux/features/boardSlice'
import { refreshOneError } from '@/app/core/redux/features/errorSlice'

interface IUserCreateList {
  name: string
  board: IBoard | null
  showEditMode: boolean
  handleShowAddList: () => void
  handleOnChangeName: (event: any) => void
  handleCreateList: () => Promise<void>
}
export default function useCreateList (): IUserCreateList {
  const [showEditMode, setShowEditMode] = useState(false)
  const [name, setName] = useState('')
  const board = useAppSelector((state) => state.board.board)
  const [addNewList, { isSuccess, data, error, isError }] =
    useAddNewListMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshOne(data as IBoard))
      setName('')
      setShowEditMode(false)
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      dispatch(refreshOneError({ status: status as number, message: data?.message }))
    }
  }, [isSuccess, data, error, isError])

  const handleShowAddList = (): void => {
    setShowEditMode(!showEditMode)
  }

  const handleOnChangeName = (event: any): void => {
    setName(event.target.value)
  }

  const handleCreateList = async (): Promise<void> => {
    board !== null && (await addNewList({ id: board.id, list: name }))
  }

  return {
    name,
    board,
    showEditMode,
    handleShowAddList,
    handleOnChangeName,
    handleCreateList
  }
}
