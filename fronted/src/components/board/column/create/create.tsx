/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React from 'react'
import {
  HiOutlinePlusSmall,
  HiOutlineXMark,
  HiOutlineCheck
} from 'react-icons/hi2'
import styles from './styles.module.css'
import useCreateList from './useCreate'

export default function ColumnCreateComponent (): React.ReactElement {
  const {
    name,
    board,
    showEditMode,
    handleShowAddList,
    handleOnChangeName,
    handleCreateList
  } = useCreateList()
  return (
    <>
      {board !== null && (
        <article className={styles.board_column_create_container}>
          {!showEditMode
            ? (
            <div className={styles.board_column_create_header} onClick={handleShowAddList}>
              <HiOutlinePlusSmall className={styles.icon} />
              <span>Add list</span>
            </div>
              )
            : (
            <div className={styles.edit}>
              <input
                required
                type="text"
                placeholder="Enter list title"
                value={name}
                onChange={handleOnChangeName}
              />
              <div className={styles.button_group}>
                <button
                  type="button"
                  disabled={name === ''}
                  onClick={handleCreateList}
                >
                  <HiOutlineCheck />
                </button>
                <button type="button" onClick={handleShowAddList}>
                  <HiOutlineXMark />
                </button>
              </div>
            </div>
              )}
        </article>
      )}
    </>
  )
}
