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
  openDateView: boolean
  openListView: boolean
  showDetail: boolean
  handleClose: () => void
  handleOpenLabelView: () => void
  handleCloseLabelView: () => void
  transformFromDateToFormatted: (date: string) => string
  handleRemoveLabel: (label: ICardLabel) => Promise<void>
  handleOpenDateView: () => void
  handleCloseDateView: () => void
  handleOpenListView: () => void
  handleCloseListView: () => void
}

export default function useDetail (): IUseDetail {
  const [openLabelView, setOpenLabelView] = useState(false)
  const [openDateView, setOpenDateView] = useState(false)
  const [openListView, setOpenListView] = useState(false)
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

  const transformFromDateToFormatted = (date: string): string => {
    return moment(date).format('MMM DD, YYYY')
  }

  const handleOpenLabelView = (): void => {
    setOpenLabelView(true)
    setOpenDateView(false)
  }

  const handleCloseLabelView = (): void => {
    setOpenLabelView(false)
  }

  const handleOpenDateView = (): void => {
    setOpenLabelView(false)
    setOpenDateView(true)
  }

  const handleCloseDateView = (): void => {
    setOpenDateView(false)
  }

  const handleOpenListView = (): void => {
    setOpenLabelView(false)
    setOpenDateView(false)
    setOpenListView(true)
  }

  const handleCloseListView = (): void => {
    setOpenListView(false)
  }

  const handleRemoveLabel = async (label: ICardLabel): Promise<void> => {
    await removeLabel({ id: card?.id as string, labels: [label] })
  }

  return {
    card,
    bgColor: LIST_COLOR[card?.status as keyof typeof LIST_COLOR],
    openLabelView,
    openDateView,
    openListView,
    showDetail,
    handleClose,
    transformFromDateToFormatted,
    handleOpenLabelView,
    handleCloseLabelView,
    handleOpenDateView,
    handleCloseDateView,
    handleOpenListView,
    handleCloseListView,
    handleRemoveLabel
  }
}
