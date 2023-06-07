'use client'
import React from 'react'
import styles from './styles.module.css'
import useBoard from './useBoard'
import ColumnComponent from '../board/list/view/column'
import ColumnCreate from '../board/list/create/create'

export default function BoardComponent (): React.ReactElement {
  const { board } = useBoard()

  return (
    <div className={styles.container}>
      <ColumnCreate />
      <div className={styles.column_container}>
      {board?.list?.map((item, i) => (
        <ColumnComponent key={i} title={item} />
      ))}
      </div>
    </div>
  )
}
