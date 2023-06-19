import moment from 'moment-timezone'
import { type ICardLabel, type ICard, useRemoveMutation } from '@/app/core/redux/services/cardApi'
import { useEffect } from 'react'
import { useAppDispatch } from '@/app/core/redux/hooks'
import { detailViewOpen, selectCard, removeOne } from '@/app/core/redux/features/cardSlice'
import { refreshOneError } from '@/app/core/redux/features/errorSlice'

interface Props {
  card: ICard
}

interface IUseItem {
  description: string | undefined
  name: string
  labels: ICardLabel[] | undefined
  startDate: string | undefined
  dueDate: string | undefined
  handleRemove: () => Promise<void>
  handleDetailClick: () => void
}

export default function useItem ({ card }: Props): IUseItem {
  const [remove, { isSuccess, data, error, isError }] = useRemoveMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess && data !== undefined) {
      dispatch(removeOne(data))
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      dispatch(refreshOneError({ status: status as number, message: data?.message }))
    }
  }, [isSuccess, data, error, isError])

  const handleRemove = async (): Promise<void> => {
    console.log(card)
    card !== undefined && await remove(card.id as string)
  }

  const handleDetailClick = (): void => {
    dispatch(selectCard(card))
    setTimeout(() => dispatch(detailViewOpen(true)), 50)
  }

  const transformer = (card: ICard): IUseItem => {
    return {
      description: card.description,
      name: card.name,
      labels: card.labels,
      startDate: card.startDate !== undefined ? moment(card.startDate).fromNow() : undefined,
      dueDate: card.dueDate !== undefined ? moment(card.dueDate).fromNow() : undefined,
      handleRemove,
      handleDetailClick
    }
  }

  return { ...transformer(card) }
}
