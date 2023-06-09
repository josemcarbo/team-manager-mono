/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import classNames from 'classnames'
import useLabel from './useLabel'
import styles from './styles.module.css'
import { HiCheck, HiOutlineXMark } from 'react-icons/hi2'

interface Props {
  onClose: () => void
}

export default function CreateLabelComponent ({
  onClose
}: Props): React.ReactElement {
  const {
    board,
    title,
    color,
    colors,
    handleColorClick,
    handleTitleChange,
    handleCreateLabel,
    handleSelectLabel
  } = useLabel()

  return (
    <section className={styles.label_container}>
      <div className={styles.label_actions}>
        <HiCheck className={styles.icon} onClick={handleCreateLabel} />
        <HiOutlineXMark className={styles.icon} onClick={onClose} />
      </div>
      <div className={styles.input_container}>
        <input
          style={{ backgroundColor: color }}
          className={styles.input}
          placeholder="Enter tag name"
          value={title}
          type="text"
          onChange={handleTitleChange}
        />
      </div>
      <div className={styles.input_container}>
        <div className={styles.colors}>
          {colors.map((c, i) => (
            <button
              key={i}
              style={{ backgroundColor: c }}
              className={classNames(c === color && styles.selected)}
              onClick={() => {
                handleColorClick(c)
              }}
            />
          ))}
        </div>
      </div>
      {board !== null && board.labels.length > 0 && (
        <div className={styles.labels_container}>
          {board.labels.map((label, i) => (
            <span
              key={i}
              style={{ backgroundColor: label.color }}
              onClick={() => {
                handleSelectLabel(label)
              }}
            >
              {label.text}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}
