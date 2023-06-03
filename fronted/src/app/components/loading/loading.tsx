'use client'
import React from 'react'
import styles from './styles.module.css'
import Overlay from '../overlay/overlay'

export default function LoadingComponent (): React.ReactElement {
  return (
    <Overlay>
        <div className={styles.loader}></div>
    </Overlay>
  )
}
