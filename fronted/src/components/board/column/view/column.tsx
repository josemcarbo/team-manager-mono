'use client'
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

export default function ColumnViewComponent ({
  title
}: Props): React.ReactElement {
  const { cards } = useColumn({ title })

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.name_container}>
          <div>{cards.length}</div>
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
