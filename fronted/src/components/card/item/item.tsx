'use client'
import React from 'react'
import classNames from 'classnames'
import { type ICardLabel, type ICard } from '@/app/core/redux/services/cardApi'
import styles from './styles.module.css'
import useItem from './useItem'
import { HiOutlineXMark } from 'react-icons/hi2'

interface Props {
  card: ICard
}
export default function CardItemComponent ({ card }: Props): React.ReactElement {
  const { name, labels, startDate, dueDate } = useItem({ card })
  return (
    <article className={styles.container}>
      <HiOutlineXMark className={styles.icon}/>
      <header className={styles.header}>
        {labels?.map((label: ICardLabel, i) => (
          <span style={{ backgroundColor: label.color }} key={i}>
            {label.text}
          </span>
        ))}
      </header>
      <div className={styles.content}>
        <span
          className={classNames(card.status === 'DONE' && styles.completed)}
        >
          {name}
        </span>
      </div>
      <footer className={styles.footer}>
        <span>{startDate}</span>
        <span>{dueDate}</span>
      </footer>
    </article>
  )
}
