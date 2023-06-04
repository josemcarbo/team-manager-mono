import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateProjectMutation } from '@/app/core/redux/services/projectApi'
import {
  refreshOne,
  createViewOpen
} from '@/app/core/redux/features/projectSlice'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { BOARD_LIST } from '@/app/core/constants'

interface UseCreate {
  project: any
  isCreateViewOpen: boolean
  onSubmit: (event: any) => Promise<void>
  handleCloseView: () => void
  onChangeNameValue: (event: any) => void
  onChangeDescriptionValue: (event: any) => void
}

const defaultValues = {
  name: '',
  description: '',
  list: BOARD_LIST
}

export default function useCreate (): UseCreate {
  const [project, setProject] = useState(defaultValues)
  const isCreateViewOpen = useAppSelector(
    (state) => state.project.createViewOpen
  )
  const [createProject, { isSuccess, data, error, isError }] =
    useCreateProjectMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess && data !== undefined) {
      dispatch(refreshOne(data))
      handleCloseView()
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      toast.error(`${status as string}: ${data.message as string}`)
    }
  }, [isSuccess, data, isError, error])

  const onSubmit = async (event: any): Promise<void> => {
    event.preventDefault()
    await createProject(project)
  }

  const handleCloseView = (): void => {
    dispatch(createViewOpen(false))
  }

  const onChangeNameValue = (event: any): void => {
    setProject({ ...project, name: event.target.value })
  }

  const onChangeDescriptionValue = (event: any): void => {
    setProject({ ...project, description: event.target.value })
  }

  return {
    project,
    onSubmit,
    isCreateViewOpen,
    handleCloseView,
    onChangeNameValue,
    onChangeDescriptionValue
  }
}
