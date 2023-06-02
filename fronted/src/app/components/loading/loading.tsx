'use client'
import React from 'react'
import styles from './styles.module.css'

export default function Loading (): React.ReactElement {
  return (
        <article className={styles.container}>
            <div className={styles.loader}></div>
        </article>
  )
}
