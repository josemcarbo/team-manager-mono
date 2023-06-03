import React from 'react'
import useSelector from './useSelector'
import styles from './styles.module.css'
import Select from '@/components/select/select'

export default function ProjectSelectorComponent (): React.ReactElement {
  const {
    project,
    projectList,
    projectSettingOpen,
    handleProjectSelected,
    handleProjectSettingOpen
  } = useSelector()

  return (
    <Select
      entity="project"
      item={project}
      list={projectList}
      open={projectSettingOpen}
      handleSelected={handleProjectSelected}
      handleOpen={handleProjectSettingOpen}
      styles={styles}
    />
  )
}
