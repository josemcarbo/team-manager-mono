import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import { refreshOne } from '@/app/core/redux/features/cardSlice'
import { COLOR_LIST } from '@/app/core/constants'
import {
  useAddNewLabelMutation,
  type ICard,
  type ICardLabel
} from '@/app/core/redux/services/cardApi'
import {
  type BoardLabel,
  type IBoard
} from '@/app/core/redux/services/boardApi'
import { refreshLabelList } from '@/app/core/redux/features/boardSlice'

interface IUseLabel {
  colors: string[]
  color: string
  title: string
  card: ICard | null
  board: IBoard | null
  handleColorClick: (color: string) => void
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCreateLabel: () => Promise<void>
  handleSelectLabel: (label: ICardLabel) => void
  isLabelSelected: (label: ICardLabel) => boolean
}

export default function useCreateLabel (): IUseLabel {
  const [color, setColor] = useState<string>(COLOR_LIST[0])
  const [title, setTitle] = useState<string>('')
  const card = useAppSelector((state) => state.card.card)
  const board = useAppSelector((state) => state.board.board)
  const [labels, setLabels] = useState<ICardLabel[]>([])
  const [addNewLabel, { isSuccess, data, error, isError }] =
    useAddNewLabelMutation()

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (card?.labels !== undefined) {
  //     setLabels(card.labels)
  //   }
  // }, [card])

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshOne(data as ICard))
      setTitle('')

      if ((data as ICard).labels != null) {
        const newLabels = data?.labels?.filter(
          (cLabel) =>
            !(
              board?.labels.some(
                (bLabel) =>
                  bLabel.text === cLabel.text && bLabel.color === cLabel.color
              ) ?? false
            )
        )

        dispatch(refreshLabelList(newLabels as BoardLabel[]))
      }
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
    if (labels.length === 0 && title === '') {
      toast.error('Select at least one tag and/or insert the tag name')
      return
    }
    card !== null &&
      (await addNewLabel({
        id: card.id as string,
        labels: title !== '' ? [{ text: title, color }, ...labels] : labels
      }))
  }

  const handleSelectLabel = (label: ICardLabel): void => {
    const tag = labels.filter(
      (l) => l.text === label.text && l.color === label.color
    )[0]

    tag === undefined
      ? setLabels([...labels, label])
      : setLabels(
        labels.filter(
          (l) => !(l.text === label.text && l.color === label.color)
        )
      )
  }

  const isLabelSelected = (label: ICardLabel): boolean =>
    labels.some((l) => l.text === label.text && l.color === label.color)

  return {
    card,
    board,
    title,
    color,
    colors: COLOR_LIST,
    handleColorClick,
    handleTitleChange,
    handleCreateLabel,
    handleSelectLabel,
    isLabelSelected
  }
}
