import { LIST_COLOR } from '@/app/core/constants'
import { useAppSelector } from '@/app/core/redux/hooks'
import { type ICard } from '@/app/core/redux/services/cardApi'

interface Props {
  title: string
}

interface IUseColumn {
  cards: ICard[]
  bgColor: string
}

export default function useColumn ({ title }: Props): IUseColumn {
  const cards = useAppSelector((state) => state.card.cards)

  return {
    cards: cards.filter((card) => card.status === title),
    bgColor: LIST_COLOR[title as keyof typeof LIST_COLOR]
  }
}
