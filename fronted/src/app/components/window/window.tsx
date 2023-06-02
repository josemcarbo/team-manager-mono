'use client'
import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'

interface Props {
  children: React.ReactNode
  hidden: boolean
}

export default function Window ({
  children,
  hidden
}: Props): React.ReactElement {
  return (
    <div
      className={classNames(
        styles.container,
        hidden ? styles.hidden : styles.show
      )}
    >
      {children}
    </div>
  )
}
