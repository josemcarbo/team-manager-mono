'use client'
import React from 'react'
import { HiPlusSmall, HiOutlineChevronUpDown } from 'react-icons/hi2'
import Window from '../../window/window'
import useSelector from './useSelector'
import styles from './styles.module.css'

export default function ProjectSelectorComponent (): React.ReactElement {
  const {
    project,
    projectList,
    projectSettingOpen,
    handleProjectSelected,
    handleProjectSettingOpen
  } = useSelector()

  return (
    <section className={styles.container} onClick={handleProjectSettingOpen}>
      {project === null
        ? (
        <div className={styles.button}>
          <HiPlusSmall className={styles.icon} />
          <span>New project</span>
        </div>
          )
        : (
        <div className={styles.project_selected}>
          <HiOutlineChevronUpDown className={styles.icon} />
          <span>{project?.name}</span>
        </div>
          )}
      <div className={styles.modal_container}>
        <Window hidden={projectSettingOpen}>
          <article className={styles.project_available_container}>
            {projectList?.map((item, i) => (
              <button
                key={item.id}
                disabled={project?.id === item.id}
                onClick={() => {
                  handleProjectSelected(i)
                }}
              >
                <span>{item.name}</span>
              </button>
            ))}
            <div className={styles.separator}></div>
            <button className={styles.project_available}>
              <span>Create project</span>
            </button>
          </article>
        </Window>
      </div>
    </section>
  )
}
