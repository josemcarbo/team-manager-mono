'use client'
import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'

interface Props {
  children: React.ReactNode
  hidden?: boolean
}

export default function OverlayComponent ({ children, hidden = false }: Props): React.ReactElement {
  return (
    <div
      className={classNames(
        styles.container,
        hidden ? styles.hidden : styles.show
      )}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
