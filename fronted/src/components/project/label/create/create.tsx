/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import useLabel from './useCreate'
import styles from './styles.module.css'
import { HiCheck } from 'react-icons/hi2'

export default function CreateLabelComponent (): React.ReactElement {
  const {
    title,
    color,
    colors,
    handleColorClick,
    handleTitleChange,
    handleCreateLabel
  } = useLabel()

  return (
    <section className={styles.container}>
      <div className={styles.preview_container}>
        <div style={{ backgroundColor: color }} className={styles.preview}>
          {title}
        </div>
      </div>
      <div className={styles.input_container}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          type="text"
          onChange={handleTitleChange}
        />
      </div>
      <div className={styles.input_container}>
        <label className={styles.label}>Select color</label>
        <div className={styles.colors}>
          {colors.map((c, i) => (
            <button
              key={i}
              style={{ backgroundColor: c }}
              onClick={() => {
                handleColorClick(c)
              }}
            >
              {c === color && <HiCheck className={styles.icon} />}
            </button>
          ))}
        </div>
      </div>
      <button
        className={styles.button}
        disabled={title === ''}
        onClick={handleCreateLabel}
      >
        Create
      </button>
    </section>
  )
}
