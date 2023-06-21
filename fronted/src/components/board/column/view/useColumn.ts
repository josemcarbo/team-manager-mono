import { LIST_COLOR } from '@/app/core/constants'
import { useAppSelector } from '@/app/core/redux/hooks'
import { type ICard } from '@/app/core/redux/services/cardApi'
import { useState } from 'react'

interface Props {
  title: string
}

interface IUseColumn {
  isCreateCardOpen: boolean
  cards: ICard[]
  bgColor: string
  handleCreateCard: () => void
  handleOnCloseCreateCard: () => void
}

export default function useColumn ({ title }: Props): IUseColumn {
  const [isCreateCardOpen, setIsCreateCardOpen] = useState<boolean>(false)
  const cards = useAppSelector((state) => state.card.cards)

  const handleCreateCard = (): void => {
    setIsCreateCardOpen(true)
  }

  const handleOnCloseCreateCard = (): void => {
    setIsCreateCardOpen(false)
  }

  return {
    isCreateCardOpen,
    cards: cards.filter((card) => card.status === title),
    bgColor: LIST_COLOR[title as keyof typeof LIST_COLOR],
    handleCreateCard,
    handleOnCloseCreateCard
  }
}
