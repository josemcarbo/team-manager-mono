'use client'
import React from 'react'
import styles from './styles.module.css'
import useBoard from './useBoard'
import Column from '../column/view/column'

export default function BoardComponent (): React.ReactElement {
  const { board } = useBoard()

  return (
    <div className={styles.container}>
      <div className={styles.column_container}>
      {board?.list?.map((item, i) => (
        <Column key={i} title={item} />
      ))}
      </div>
    </div>
  )
}
