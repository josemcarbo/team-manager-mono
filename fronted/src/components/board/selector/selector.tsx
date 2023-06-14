import React from 'react'
import useSelector from './useSelector'
import { HiOutlinePlus } from 'react-icons/hi2'
import styles from './styles.module.css'
import classNames from 'classnames'

export default function BoardSelectorComponent (): React.ReactElement {
  const { board, boardList, boardListHide, handleSelected, handleCreated } =
    useSelector()

  return (
    <div className={styles.board_selector_container}>
      <HiOutlinePlus className={styles.icon} onClick={handleCreated} />
      {boardList.map((b, i) => (
        <span
          key={b.id}
          className={classNames(b.id === board?.id && styles.selected)}
          onClick={() => {
            handleSelected(i)
          }}
        >
          {b.name}
        </span>
      ))}
      {boardListHide.length > 0 && (
        <span className={styles.more}>... {boardListHide.length} more</span>
      )}
    </div>
  )
}
