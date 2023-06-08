'use client'
import React from 'react'
import styles from './styles.module.css'
import useBoard from './useBoard'
import Column from '../column/view/column'
import LoadingComponent from '@/components/loading/loading'

export default function BoardComponent (): React.ReactElement {
  const { board, isLoading } = useBoard()

  return (
    <>
      {isLoading
        ? (
        <LoadingComponent />
          )
        : (
        <div className={styles.container}>
          <div className={styles.column_container}>
            {board?.list?.map((item, i) => (
              <Column key={i} title={item} />
            ))}
          </div>
        </div>
          )}
    </>
  )
}
