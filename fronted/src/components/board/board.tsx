'use client'
import React from 'react'
import styles from './styles.module.css'
import useBoard from './useBoard'
import ColumnComponent from '../project/list/view/column'
import ColumnCreate from '../project/list/create/create'

export default function BoardComponent (): React.ReactElement {
  const { project } = useBoard()

  return (
    <div className={styles.container}>
      <ColumnCreate />
      <div className={styles.column_container}>
      {project?.list?.map((item, i) => (
        <ColumnComponent key={i} title={item} />
      ))}
      </div>
    </div>
  )
}
