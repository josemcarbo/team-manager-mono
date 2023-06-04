import React from 'react'
import useSelector from './useSelector'
import Select from '@/components/select/select'

export default function ProjectSelectorComponent (): React.ReactElement {
  const {
    project,
    projectList,
    projectSettingOpen,
    handleProjectSelected,
    handleProjectSettingOpen,
    handleProjectCreated
  } = useSelector()

  return (
    <Select
      entity="project"
      item={project}
      list={projectList}
      open={projectSettingOpen}
      handleSelected={handleProjectSelected}
      handleOpen={handleProjectSettingOpen}
      handleCreate={handleProjectCreated}
    />
  )
}
