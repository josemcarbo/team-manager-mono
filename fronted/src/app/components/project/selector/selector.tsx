'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/core/redux/hooks'
import { HiPlusSmall, HiOutlineChevronUpDown } from 'react-icons/hi2'
import { selectProject } from '@/app/core/redux/features/projectSlice'
import Window from '../../window/window'
import styles from './styles.module.css'

export default function ProjectSelectorComponent (): React.ReactElement {
  const projects = useAppSelector((state) => state.project.projects)
  const selectedProject = useAppSelector((state) => state.project.project)
  const [projectSettingOpen, setProjectSettingOpen] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (projects.length > 0) {
      selectedProject === null && dispatch(selectProject(projects[0]))
    }
  }, [projects])

  const handleProjectSettingOpen = (): void => {
    setProjectSettingOpen(!projectSettingOpen)
  }

  const handleProjectSelected = (index: number): void => {
    dispatch(selectProject(projects[index]))
  }

  return (
    <section className={styles.container} onClick={handleProjectSettingOpen}>
      {selectedProject === null
        ? (
        <div className={styles.button}>
          <HiPlusSmall className={styles.icon} />
          <span>New project</span>
        </div>
          )
        : (
        <div className={styles.project_selected}>
          <HiOutlineChevronUpDown className={styles.icon} />
          <span>{selectedProject?.name}</span>
        </div>
          )}
      <div className={styles.modal_container}>
        <Window hidden={projectSettingOpen}>
          <article className={styles.project_available_container}>
            {projects?.map((project, i) => (
              <button
                key={project.id}
                disabled={selectedProject?.id === project.id}
                onClick={() => {
                  handleProjectSelected(i)
                }}
              >
                <span>{project.name}</span>
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
