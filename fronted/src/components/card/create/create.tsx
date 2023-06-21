/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'
import React from 'react'
import styles from './styles.module.css'
import useCreate from './useCreate'

interface Props {
  status: string
  onClose: () => void
}
export default function CardCreateComponent ({
  status,
  onClose
}: Props): React.ReactElement {
  const {
    name,
    status: newStatus,
    boardList,
    handleOnChangeName,
    handleOnChangeStatus,
    handleCreateCard
  } = useCreate({ status, onClose })

  return (
    <section className={styles.card_form_container}>
      <div>
        <label>Title</label>
        <textarea value={name} onChange={handleOnChangeName} />
      </div>
      <div>
        <label>Status</label>
        <select value={newStatus} onChange={handleOnChangeStatus}>
          {boardList.map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.card_form_button_group}>
        <button className={styles.button_secondary} onClick={onClose}>Cancel</button>
        <button className={styles.button_primary} onClick={handleCreateCard}>Create</button>
      </div>
    </section>
  )
}
