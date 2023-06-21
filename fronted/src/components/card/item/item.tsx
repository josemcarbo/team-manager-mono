'use client'
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import classNames from 'classnames'
import { type ICardLabel, type ICard } from '@/app/core/redux/services/cardApi'
import styles from './styles.module.css'
import useItem from './useItem'
import { HiOutlineClock, HiOutlineXMark } from 'react-icons/hi2'
import Label from '@/components/label/label'

interface Props {
  card: ICard
}
export default function CardItemComponent ({ card }: Props): React.ReactElement {
  const { name, labels, startDate, dueDate, handleRemove, handleDetailClick } =
    useItem({ card })
  return (
    <article className={styles.container}>
      <HiOutlineXMark className={styles.icon} onClick={handleRemove} />
      <header className={styles.header}>
        {labels?.map((label: ICardLabel, i) => (
          <Label key={i} title={label.text} color={label.color} />
        ))}
      </header>
      <div className={styles.content}>
        <span
          className={classNames(card.status === 'DONE' && styles.completed)}
          onClick={handleDetailClick}
        >
          {name}
        </span>
      </div>
      <footer className={styles.footer}>
        {startDate !== undefined && (
          <div className={styles.time}>
            <HiOutlineClock className={styles.icon} />
            <span>{startDate}</span>
          </div>
        )}
        {dueDate !== undefined && (
          <div className={styles.time}>
            <HiOutlineClock className={styles.icon} />
            <span>{dueDate}</span>
          </div>
        )}
      </footer>
    </article>
  )
}
