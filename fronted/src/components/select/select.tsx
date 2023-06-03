'use client'
import React from 'react'
import { HiPlusSmall, HiOutlineChevronUpDown } from 'react-icons/hi2'
import Window from '../window/window'
import styles from './styles.module.css'

interface Props {
  item: any
  list: any[]
  open: boolean
  entity: string
  handleSelected: (i: number) => void
  handleOpen: () => void
}
export default function SelectComponent ({
  item,
  list,
  open,
  entity,
  handleOpen,
  handleSelected
}: Props): React.ReactElement {
  return (
    <section className={styles.container}>
      {item === null
        ? (
        <div className={styles.button}>
          <HiPlusSmall className={styles.icon} />
          <span>New {entity}</span>
        </div>
          )
        : (
        <div className={styles.project_selected} onClick={handleOpen}>
          <HiOutlineChevronUpDown className={styles.icon} />
          <span>{item?.name}</span>
        </div>
          )}
      <div className={styles.modal_container}>
        <Window hidden={open}>
          <article className={styles.project_available_container}>
            {list?.map((element, i) => (
              <button
                key={element.id}
                disabled={element?.id === item?.id}
                onClick={() => {
                  handleSelected(i)
                }}
              >
                <span>{element?.name}</span>
              </button>
            ))}
            <div className={styles.separator}></div>
            <button className={styles.project_available}>
              <span>Edit</span>
            </button>
            <button className={styles.project_available}>
              <span>Create</span>
            </button>
          </article>
        </Window>
      </div>
    </section>
  )
}
