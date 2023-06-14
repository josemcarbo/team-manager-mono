/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import styles from './styles.module.css'
import CalendarComponent from '@/components/calendar/calendar'
import useDateRange from './useDate'
import { HiCheck, HiOutlineXMark } from 'react-icons/hi2'

interface Props {
  onClose: () => void
}

export default function DateRangeComponent ({
  onClose
}: Props): React.ReactElement {
  const { card, handleOnChange, handleUpdateDate } = useDateRange()

  return (
    <section className={styles.date_container}>
      <div className={styles.date_actions}>
        <HiCheck className={styles.icon} onClick={handleUpdateDate} />
        <HiOutlineXMark className={styles.icon} onClick={onClose} />
      </div>
      <div className={styles.date_content_container}>
        <CalendarComponent value={card?.startDate} placeholder="Start date" name='startDate' onValueChange={handleOnChange} />
        <CalendarComponent value={card?.dueDate} placeholder="Due date" name='dueDate' onValueChange={handleOnChange} />
      </div>
    </section>
  )
}
