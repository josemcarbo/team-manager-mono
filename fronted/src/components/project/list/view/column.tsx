'use client'
import React from 'react'
import {
  HiOutlineEllipsisHorizontal,
  HiOutlinePlusSmall
} from 'react-icons/hi2'
import styles from './styles.module.css'

interface Props {
  title: string
}

export default function ColumnViewComponent ({
  title
}: Props): React.ReactElement {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <span>{title}</span>
        <HiOutlineEllipsisHorizontal className={styles.icon} />
      </header>
      <div className={styles.content}></div>
      <footer className={styles.footer}>
        <button className={styles.button}>
          <HiOutlinePlusSmall className={styles.icon} />
          <span>Add card</span>
        </button>
      </footer>
    </article>
  )
}
