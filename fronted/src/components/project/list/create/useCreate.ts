import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import {
  type IProject,
  useAddNewListMutation
} from '@/app/core/redux/services/projectApi'
import { useEffect, useState } from 'react'
import { refreshOne } from '@/app/core/redux/features/projectSlice'

interface IUserCreateList {
  name: string
  project: IProject | null
  showEditMode: boolean
  handleShowAddList: () => void
  handleOnChangeName: (event: any) => void
  handleCreateList: () => Promise<void>
}
export default function useCreateList (): IUserCreateList {
  const [showEditMode, setShowEditMode] = useState(false)
  const [name, setName] = useState('')
  const project = useAppSelector((state) => state.project.project)
  const [addNewList, { isSuccess, data, error, isError }] =
    useAddNewListMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshOne(data as IProject))
      setName('')
      setShowEditMode(false)
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      toast.error(`${status as string}: ${data.message as string}`)
    }
  }, [isSuccess, data, error, isError])

  const handleShowAddList = (): void => {
    setShowEditMode(!showEditMode)
  }

  const handleOnChangeName = (event: any): void => {
    setName(event.target.value)
  }

  const handleCreateList = async (): Promise<void> => {
    project !== null && (await addNewList({ id: project.id, list: name }))
  }

  return {
    name,
    project,
    showEditMode,
    handleShowAddList,
    handleOnChangeName,
    handleCreateList
  }
}
