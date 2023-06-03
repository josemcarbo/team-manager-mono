'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/core/redux/hooks'
import { HiPlusSmall, HiOutlineChevronUpDown } from 'react-icons/hi2'
import styles from './styles.module.css'
import { type IProject } from '@/app/core/redux/services/projectApi'
import Window from '../../window/window'

export default function ProjectSelectorComponent (): React.ReactElement {
  const projects = useAppSelector((state) => state.project.projects)
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null)
  const [projectSettingOpen, setProjectSettingOpen] = useState(true)

  useEffect(() => {
    if (projects.length > 0) {
      selectedProject === null && setSelectedProject(projects[0])
    }
  }, [projects])

  const handleProjectSettingOpen = (event: any): void => {
    setProjectSettingOpen(!projectSettingOpen)
  }

  const handleProjectSelected = (index: number): void => {
    setSelectedProject(projects[index])
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
