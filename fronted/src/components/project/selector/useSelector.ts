import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/app/core/redux/hooks'
import { selectProject } from '@/app/core/redux/features/projectSlice'
import { type IProject } from '@/app/core/redux/services/projectApi'

interface UseSelector {
  projectList: IProject[]
  project: IProject | null
  projectSettingOpen: boolean
  handleProjectSettingOpen: () => void
  handleProjectSelected: (index: number) => void
  handleProjectCreated: () => void
}

export default function useSelector (): UseSelector {
  const projectList = useAppSelector((state) => state.project.projects)
  const project = useAppSelector((state) => state.project.project)
  const [projectSettingOpen, setProjectSettingOpen] = useState(true)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (projectList.length > 0) {
      project === null && dispatch(selectProject(projectList[0]))
    }
  }, [projectList])

  const handleProjectSettingOpen = (): void => {
    setProjectSettingOpen(!projectSettingOpen)
  }

  const handleProjectSelected = (index: number): void => {
    dispatch(selectProject(projectList[index]))
  }

  const handleProjectCreated = (): void => {
    router.push('/project/create')
  }

  return {
    projectList,
    project,
    projectSettingOpen,
    handleProjectSettingOpen,
    handleProjectSelected,
    handleProjectCreated
  }
}
