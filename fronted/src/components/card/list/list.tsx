/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React from 'react'
import { type ICard } from '@/app/core/redux/services/cardApi'
import CardItem from '../item/item'
import styles from './styles.module.css'
import DragComponent from '@/components/drag/drag'
import useList from './useList'
import classNames from 'classnames'

interface Props {
  cards: ICard[]
  title: string
}
export default function CardListComponent ({
  cards,
  title
}: Props): React.ReactElement {
  const { isOver, handleDrop, handleDropOver, handleDropLeave } =
    useList({ title })

  return (
    <>
      <div
        id="drop-destination"
        className={classNames(styles.container, isOver && styles.drop_over)}
        onDrop={handleDrop}
        onDragOver={handleDropOver}
        onDragLeave={handleDropLeave}
      >
        {cards.map((card: ICard) => (
          <DragComponent id={card.id as string} key={card.id}>
            <CardItem card={card} />
          </DragComponent>
        ))}
      </div>
    </>
  )
}
