'use client'
import React from 'react'
import { type ICard } from '@/app/core/redux/services/cardApi'
import CardItem from '../item/item'
import styles from './styles.module.css'

interface Props {
  cards: ICard[]
}
export default function CardListComponent ({
  cards
}: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      {cards.map((card: ICard) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  )
}
