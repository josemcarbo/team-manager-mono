'use client'
import React from 'react'
import styles from './styles.module.css'
import useDrag from './useDrag'

interface Props {
  id: string
  children: React.ReactNode
}

export default function DragComponent ({ id, children }: Props): React.ReactElement {
  const { handleDraggingStart } = useDrag()

  return (
    <section
      id={id}
      onDragStart={handleDraggingStart}
      draggable={true}
      className={styles.drag_container}
    >
      {children}
    </section>
  )
}
