import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { refreshOne } from '@/app/core/redux/features/cardSlice'
import {
  type ICard,
  useUpdateMutation
} from '@/app/core/redux/services/cardApi'
import { BOARD_LIST, LIST_COLOR } from '@/app/core/constants'
import { refreshOneError } from '@/app/core/redux/features/errorSlice'

interface IUseLabel {
  lists: string[]
  bgColors: any
  selected: string
  handleUpdate: () => Promise<void>
  handleOnSelect: (value: string) => void
}

export default function useCardStatus (): IUseLabel {
  const card = useAppSelector((state) => state.card.card)
  const [selected, setSelected] = useState<string>(card?.status as string)
  const [update, { isSuccess, data, error, isError }] = useUpdateMutation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshOne(data as ICard))
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      dispatch(refreshOneError({ status: status as number, message: data?.message }))
    }
  }, [isSuccess, data, error, isError])

  const handleUpdate = async (): Promise<void> => {
    if (selected === '') {
      dispatch(refreshOneError({ status: 1, message: 'Please select a list' }))
    } else {
      await update({ id: card?.id as string, card: { status: selected } })
    }
  }

  const handleOnSelect = (value: string): void => {
    setSelected(value)
  }

  return {
    lists: BOARD_LIST,
    bgColors: LIST_COLOR,
    selected,
    handleOnSelect,
    handleUpdate
  }
}
