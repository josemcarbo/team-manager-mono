import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { refreshOne } from '@/app/core/redux/features/boardSlice'
import { COLOR_LIST } from '@/app/core/constants'
import {
  useAddNewLabelMutation,
  type IBoard
} from '@/app/core/redux/services/boardApi'

interface IUseLabel {
  colors: string[]
  color: string
  title: string
  board: IBoard | null
  handleColorClick: (color: string) => void
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCreateLabel: () => Promise<void>
}

export default function useCreateLabel (): IUseLabel {
  const [color, setColor] = useState<string>(COLOR_LIST[0])
  const [title, setTitle] = useState<string>('')
  const board = useAppSelector((state) => state.board.board)
  const [addNewLabel, { isSuccess, data, error, isError }] =
    useAddNewLabelMutation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshOne(data as IBoard))
      setTitle('')
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      toast.error(`${status as string}: ${data.message as string}`)
    }
  }, [isSuccess, data, error, isError])

  const handleColorClick = (color: string): void => {
    setColor(color)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleCreateLabel = async (): Promise<void> => {
    board !== null &&
      (await addNewLabel({ id: board.id, label: { text: title, color } }))
  }

  return {
    board,
    title,
    color,
    colors: COLOR_LIST,
    handleColorClick,
    handleTitleChange,
    handleCreateLabel
  }
}
