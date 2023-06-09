'use client'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import {
  HiOutlinePlusSmall
} from 'react-icons/hi2'
import CardList from '@/components/card/list/list'
import useColumn from './useColumn'
import styles from './styles.module.css'

interface Props {
  title: string
}

const LIST_COLOR = {
  'TO DO': '#ececef',
  'IN PROGRESS': '#cbe2f9',
  DONE: '#c3e6cd',
  REJECTED: '#fdd4cd',
  DEFAULT: ''
}

export default function ColumnViewComponent ({
  title
}: Props): React.ReactElement {
  const { cards } = useColumn({ title })
  const bgColor: string = LIST_COLOR[title as keyof typeof LIST_COLOR]

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.name_container}>
          <div style={{ backgroundColor: bgColor }}>{cards.length}</div>
          <span>{title}</span>
        </div>
        <HiOutlinePlusSmall className={styles.icon} />
      </header>
      <div className={styles.content}>
        <CardList cards={cards} />
      </div>
    </article>
  )
}
