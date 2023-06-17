import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { refreshOne } from '@/app/core/redux/features/cardSlice'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { type ICard, useUpdateMutation } from '@/app/core/redux/services/cardApi'

interface Props {
  title: string
}

interface IUseList {
  isOver: boolean
  handleDrop: (e: any) => Promise<void>
  handleDropOver: (e: any) => void
  handleDropLeave: (e: any) => void
}

export default function useList ({ title }: Props): IUseList {
  const [isOver, setIsOver] = useState<boolean>(false)
  const cards = useAppSelector((state) => state.card.cards)
  const [update, { isSuccess, data, error, isError }] = useUpdateMutation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshOne(data as ICard))
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      toast.error(`${status as string}: ${data.message as string}`)
    }
  }, [isSuccess, data, error, isError])

  const handleDrop = async (e: any): Promise<void> => {
    e.preventDefault()

    if (e.target.id !== 'drop-destination') {
      let isAllow = false

      while (e.target.parentNode !== null) {
        if (e.target.id === 'drop-destination') {
          isAllow = true
          break
        }
        e.target = e.target.parentNode
      }
      if (!isAllow) return
    }

    const data = e.dataTransfer.getData('text/plain')
    e.dataTransfer.clearData()
    setIsOver(false)

    const card = { ...cards.find((c) => c.id === data) }
    if (card !== undefined) {
      card.status = title
      dispatch(refreshOne(card as ICard))
    }

    await update({ id: data as string, card: { status: title } })
  }

  const handleDropOver = (e: any): void => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDropLeave = (e: any): void => {
    e.preventDefault()
    setIsOver(false)
  }

  return {
    isOver,
    handleDrop,
    handleDropOver,
    handleDropLeave
  }
}
