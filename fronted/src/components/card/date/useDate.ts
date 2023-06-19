import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { refreshOne } from '@/app/core/redux/features/cardSlice'
import {
  type ICard,
  useUpdateMutation
} from '@/app/core/redux/services/cardApi'
import { refreshOneError } from '@/app/core/redux/features/errorSlice'

interface IUseLabel {
  card: ICard | null
  handleOnChange: (key: string, value: Date) => void
  handleUpdateDate: () => Promise<void>
}

interface IDateRange {
  startDate?: string
  dueDate?: string
}

export default function useDateRange (): IUseLabel {
  const [dateRange, setDateRange] = useState<IDateRange>({})
  const card = useAppSelector((state) => state.card.card)
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

  const handleUpdateDate = async (): Promise<void> => {
    const { startDate, dueDate } = dateRange

    if (
      (startDate === undefined || startDate === null) &&
      (dueDate === undefined) === null
    ) {
      dispatch(refreshOneError({ status: 0, message: 'You must select at least one date' }))
      return
    }

    if (
      startDate !== undefined &&
      dueDate !== undefined &&
      startDate > dueDate
    ) {
      dispatch(refreshOneError({ status: 0, message: 'Start date must be before due date' }))
    } else {
      await update({ id: card?.id as string, card: { startDate, dueDate } })
    }
  }

  const handleOnChange = (name: string, value: Date): void => {
    setDateRange({ ...dateRange, [name]: value })
  }

  return {
    card,
    handleOnChange,
    handleUpdateDate
  }
}
