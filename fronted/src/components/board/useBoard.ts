import { useAppSelector } from '@/app/core/redux/hooks'
import { type IProject } from '@/app/core/redux/services/projectApi'

interface IUseBoard {
  project: IProject | null
}
export default function useBoard (): IUseBoard {
  const project = useAppSelector((state) => state.project.project)

  return { project }
}
