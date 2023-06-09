import moment from 'moment-timezone'
import { toast } from 'react-toastify'
import {
  detailViewOpen,
  refreshOne
} from '@/app/core/redux/features/cardSlice'
import { useAppDispatch, useAppSelector } from '@/app/core/redux/hooks'
import {
  type ICardLabel,
  type ICard,
  useRemoveLabelMutation
} from '@/app/core/redux/services/cardApi'
import { LIST_COLOR } from '@/app/core/constants'
import { useEffect, useState } from 'react'

interface IUseDetail {
  card: Partial<ICard> | null
  bgColor: string
  openLabelView: boolean
  showDetail: boolean
  handleClose: () => void
  handleOpenLabelView: () => void
  handleCloseLabelView: () => void
  transformFromDateToFormatted: (date: Date) => string
  handleRemoveLabel: (label: ICardLabel) => Promise<void>
}

export default function useDetail (): IUseDetail {
  const [openLabelView, setOpenLabelView] = useState(false)
  const card = useAppSelector((state) => state.card.card)
  const showDetail = useAppSelector((state) => state.card.detailViewOpen)
  const [removeLabel, { isSuccess, data, isError, error }] =
    useRemoveLabelMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess && data !== undefined) {
      dispatch(refreshOne(data))
    }

    if (isError && error !== null) {
      const { status, data } = error as any
      toast.error(`${status as string}: ${data.message as string}`)
    }
  }, [isSuccess, data, isError, error])

  const handleClose = (): void => {
    dispatch(detailViewOpen(false))
  }

  const transformFromDateToFormatted = (date: Date): string => {
    return moment(date).format('MMM DD, YYYY')
  }

  const handleOpenLabelView = (): void => {
    setOpenLabelView(true)
  }

  const handleCloseLabelView = (): void => {
    setOpenLabelView(false)
  }

  const handleRemoveLabel = async (label: ICardLabel): Promise<void> => {
    await removeLabel({ id: card?.id as string, labels: [label] })
  }

  return {
    card,
    bgColor: LIST_COLOR[card?.status as keyof typeof LIST_COLOR],
    openLabelView,
    showDetail,
    handleClose,
    transformFromDateToFormatted,
    handleOpenLabelView,
    handleCloseLabelView,
    handleRemoveLabel
  }
}
