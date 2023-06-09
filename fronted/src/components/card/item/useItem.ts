import moment from 'moment-timezone'
import { type ICardLabel, type ICard } from '@/app/core/redux/services/cardApi'

interface Props {
  card: ICard
}

interface IUseItem {
  description: string | undefined
  name: string
  labels: ICardLabel[] | undefined
  startDate: string | undefined
  dueDate: string | undefined
}

export default function useItem ({ card }: Props): IUseItem {
  const transformer = (card: ICard): IUseItem => {
    return {
      description: card.description,
      name: card.name,
      labels: card.labels,
      startDate: card.startDate !== undefined ? moment(card.startDate).fromNow() : undefined,
      dueDate: card.dueDate !== undefined ? moment(card.dueDate).fromNow() : undefined
    }
  }

  return { ...transformer(card) }
}
