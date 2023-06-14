/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import styles from './styles.module.css'
import useDateRange from './useStatus'
import { HiCheck, HiOutlineXMark } from 'react-icons/hi2'
import classNames from 'classnames'

interface Props {
  onClose: () => void
}

export default function CardStatusComponent ({
  onClose
}: Props): React.ReactElement {
  const { selected, lists, bgColors, handleOnSelect, handleUpdate } =
    useDateRange()

  return (
    <section className={styles.list_container}>
      <div className={styles.list_actions}>
        <HiCheck className={styles.icon} onClick={handleUpdate} />
        <HiOutlineXMark className={styles.icon} onClick={onClose} />
      </div>
      <div className={styles.list_content_container}>
        {lists.map((list, index) => (
          <div key={index} className={styles.list_option}>
            <span
              className={classNames(list === selected && styles.selected)}
              style={{ backgroundColor: bgColors[list] }}
              onClick={() => {
                handleOnSelect(list)
              }}
            >
              {list}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
