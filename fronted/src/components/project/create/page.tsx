/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React from 'react'
import styles from './styles.module.css'
import OverlayComponent from '@/components/overlay/overlay'
import useCreate from './useCreate'
import { HiOutlineXMark } from 'react-icons/hi2'

export default function ProjectCreateComponent (): React.ReactElement {
  const {
    project,
    isCreateViewOpen,
    onChangeNameValue,
    onChangeDescriptionValue,
    onSubmit,
    handleCloseView
  } = useCreate()

  return (
    <>
      {isCreateViewOpen && (
        <OverlayComponent>
          <section className={styles.container}>
            <div className={styles.form_container}>
              <HiOutlineXMark
                className={styles.icon}
                onClick={handleCloseView}
              />
              <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.input_container}>
                  <label className={styles.placeholder}>Name*</label>
                  <input
                    value={project.name}
                    required
                    className={styles.input}
                    onChange={onChangeNameValue}
                  />
                </div>

                <div className={styles.input_container}>
                  <label className={styles.placeholder}>Description</label>
                  <textarea
                    className={styles.input}
                    value={project.description}
                    onChange={onChangeDescriptionValue}
                  />
                </div>
                <div className={styles.group_button}>
                  <button
                    className={styles.button}
                    type="submit"
                    disabled={project.name === ''}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </section>
        </OverlayComponent>
      )}
    </>
  )
}
