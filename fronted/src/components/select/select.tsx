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
  handleCreate?: () => void
  handleEdit?: () => void
}
export default function SelectComponent ({
  item,
  list,
  open,
  entity,
  handleOpen,
  handleSelected,
  handleCreate,
  handleEdit
}: Props): React.ReactElement {
  return (
    <>
      {item === null
        ? (
        <section className={styles.container}>
          <div className={styles.button} onClick={handleCreate}>
            <HiPlusSmall className={styles.icon} />
            <span>New {entity}</span>
          </div>
        </section>
          )
        : (
        <section className={styles.container} onClick={handleOpen}>
          <div className={styles.selected}>
            <HiOutlineChevronUpDown className={styles.icon} />
            <span>{item?.name}</span>
          </div>
          <div className={styles.modal_container}>
            <Window hidden={open}>
              <article className={styles.available_container}>
                {list?.map((element, i) => (
                  <button
                    key={element.id}
                    disabled={element?.id === item?.id}
                    onClick={() => {
                      handleSelected(i)
                    }}
                  >
                    {element?.name}
                  </button>
                ))}
                <div className={styles.separator}></div>
                <button
                  className={styles.available}
                  onClick={handleEdit}
                >
                  <span>Edit</span>
                </button>
                <button
                  className={styles.available}
                  onClick={handleCreate}
                >
                  <span>Create</span>
                </button>
              </article>
            </Window>
          </div>
        </section>
          )}
    </>
  )
}
