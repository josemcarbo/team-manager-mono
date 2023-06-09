/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import classNames from 'classnames'
import useLabel from './useLabel'
import styles from './styles.module.css'
import { HiCheck, HiOutlineXMark } from 'react-icons/hi2'
import Label from '@/components/label/label'

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
    handleSelectLabel,
    isLabelSelected
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
        <>
          <h4>And/Or select the ones you want</h4>
          <div className={styles.labels_container}>
            {board.labels.map((label, i) => (
              <Label
                key={i}
                color={label.color}
                title={label.text}
                onClick={() => {
                  handleSelectLabel(label)
                }}
                selected={isLabelSelected(label)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
