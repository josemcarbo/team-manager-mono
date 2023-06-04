import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { refreshOne } from '@/app/core/redux/features/projectSlice'
import { COLOR_LIST } from '@/app/core/constants'
import {
  useAddNewLabelMutation,
  type IProject
} from '@/app/core/redux/services/projectApi'

interface IUseLabel {
  colors: string[]
  color: string
  title: string
  project: IProject | null
  handleColorClick: (color: string) => void
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCreateLabel: () => Promise<void>
}

export default function useCreateLabel (): IUseLabel {
  const [color, setColor] = useState<string>(COLOR_LIST[0])
  const [title, setTitle] = useState<string>('')
  const project = useAppSelector((state) => state.project.project)
  const [addNewLabel, { isSuccess, data, error, isError }] =
    useAddNewLabelMutation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshOne(data as IProject))
      setTitle('')
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      toast.error(`${status as string}: ${data.message as string}`)
    }
  }, [isSuccess, data, error, isError])

  const handleColorClick = (color: string): void => {
    setColor(color)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleCreateLabel = async (): Promise<void> => {
    project !== null &&
      (await addNewLabel({ id: project.id, label: { text: title, color } }))
  }

  return {
    project,
    title,
    color,
    colors: COLOR_LIST,
    handleColorClick,
    handleTitleChange,
    handleCreateLabel
  }
}
