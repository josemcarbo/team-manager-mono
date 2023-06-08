import { useAppSelector } from '@/app/core/redux/hooks'
import { type ICard } from '@/app/core/redux/services/cardApi'

interface Props {
  title: string
}

interface IUseColumn {
  cards: ICard[]
}

export default function useColumn ({ title }: Props): IUseColumn {
  const cards = useAppSelector(state => state.card.cards)

  return { cards: cards.filter(card => card.status === title) }
}
