'use client'
import React from 'react'
import styles from './styles.module.css'
import { HiOutlineXMark } from 'react-icons/hi2'
import useLabel from './useLabel'
import classNames from 'classnames'

interface Props {
  title: string
  color: string
  close?: boolean
  selected?: boolean
  onClose?: () => void
  onClick?: () => void
}

export default function LabelComponent ({
  title,
  color,
  close = false,
  selected = true,
  onClose,
  onClick
}: Props): React.ReactElement {
  const { handleClose } = useLabel({ onClose })

  return (
    <div
      className={classNames(
        styles.label_container,
        selected && styles.selected
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <span>{title}</span>
      {close && (
        <HiOutlineXMark className={styles.icon} onClick={handleClose} />
      )}
    </div>
  )
}
