
import { BOARD_LIST } from '@/app/core/constants'
import { refreshOne } from '@/app/core/redux/features/cardSlice'
import { refreshOneError } from '@/app/core/redux/features/errorSlice'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { useCreateMutation, type ICard } from '@/app/core/redux/services/cardApi'
import { useEffect, useState } from 'react'

interface Props {
  status: string
  onClose: () => void
}

interface IUseCreate {
  name: string
  status: string
  boardList: string[]
  handleOnChangeStatus: (e: any) => void
  handleOnChangeName: (e: any) => void
  handleCreateCard: () => Promise<void>
}

export default function useCreate ({ status, onClose }: Props): IUseCreate {
  const [newName, setNewName] = useState<string>('')
  const [newStatus, setNewStatus] = useState<string>(status)
  const board = useAppSelector((state) => state.board.board)
  const [create, { isSuccess, data, error, isError }] = useCreateMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshOne(data as ICard))
      onClose()
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      dispatch(refreshOneError({ status: status as number, message: data?.message }))
    }
  }, [isSuccess, data, error, isError])

  const handleCreateCard = async (): Promise<void> => {
    const body: ICard = {
      name: newName,
      status: newStatus,
      board: board?.id as string
    }

    await create(body)
  }

  const handleOnChangeStatus = (e: any): void => {
    setNewStatus(e.target.value)
  }

  const handleOnChangeName = (e: any): void => {
    setNewName(e.target.value)
  }

  return {
    name: newName,
    status: newStatus,
    boardList: BOARD_LIST,
    handleOnChangeStatus,
    handleOnChangeName,
    handleCreateCard
  }
}
