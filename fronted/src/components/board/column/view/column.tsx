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

export default function ColumnViewComponent ({
  title
}: Props): React.ReactElement {
  const { cards, bgColor } = useColumn({ title })

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
        <CardList title={title} cards={cards} />
      </div>
    </article>
  )
}
