import moment from 'moment-timezone'
import { useEffect, useState } from 'react'

interface Props {
  name: string
  value?: string
  onValueChange?: (key: string, value: Date) => void
}

interface IUseCalendar {
  selected: string
  days: string[]
  headers: string[]
  year: number
  month: string
  showCalendar: boolean
  handlerAddMonth: () => void
  handlerSubtractMonth: () => void
  handleShowCalendar: () => void
  isTodayOrSelected: (day: string) => boolean
  handleSelectDate: (day: string) => void
}

const FORMAT = 'YYYY-MM-DD'

export default function useCalendar ({
  name,
  value,
  onValueChange
}: Props): IUseCalendar {
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [today, setToday] = useState<string>(moment().format(FORMAT))
  const [selected, setSelected] = useState<string>(
    value !== undefined ? moment(value).format(FORMAT) : ''
  )
  const [rows, setRows] = useState<string[]>([])
  const headers = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  useEffect(() => {
    setRows(createRows(moment(today).year(), moment(today).month()))
  }, [today])

  useEffect(() => {
    if (typeof onValueChange === 'function') {
      onValueChange(name, moment(selected).hour(12).toDate())
    }
  }, [selected])

  const handlerAddMonth = (): void => {
    setToday(moment(today).add(1, 'month').format(FORMAT))
  }

  const handlerSubtractMonth = (): void => {
    setToday(moment(today).subtract(1, 'month').format(FORMAT))
  }

  const handleSelectDate = (day: string): void => {
    setSelected(moment(today).date(Number(day)).format(FORMAT))
    setShowCalendar(false)
  }

  const handleShowCalendar = (): void => {
    setShowCalendar(!showCalendar)
  }

  const createRows = (year: number, month: number): string[] => {
    let startDay = moment().year(year).month(month).date(1)
    const lastDayOfMonth = moment(startDay).endOf('month').date()
    let rowBase = [0, 0, 0, 0, 0, 0, 0]
    const rows = []

    for (let i = 1; i <= lastDayOfMonth; i++) {
      const dayOfWeek = Number(startDay.format('d'))
      rowBase[dayOfWeek] = i

      if (dayOfWeek === 6) {
        rows.push([...rowBase])
        rowBase = [0, 0, 0, 0, 0, 0, 0]
      }

      startDay = startDay.date(i + 1)
    }

    rowBase.some((v) => v) && rows.push([...rowBase])

    return rows.flat().map((day) => (day === 0 ? '' : String(day)))
  }

  const isTodayOrSelected = (day: string): boolean => {
    const candidate = moment(today).date(Number(day))

    return (
      candidate.isSame(moment(), 'day') ||
      moment(selected).isSame(candidate, 'day')
    )
  }

  return {
    selected,
    days: rows,
    headers,
    year: moment(today).year(),
    month: moment(today).format('MMM'),
    showCalendar,
    handlerAddMonth,
    handlerSubtractMonth,
    handleSelectDate,
    handleShowCalendar,
    isTodayOrSelected
  }
}
