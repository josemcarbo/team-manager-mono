'use client'
import React from 'react'
import styles from './styles.module.css'
import useCalendar from './useCalendar'
import { HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import classNames from 'classnames'

interface Props {
  placeholder?: string
  name: string
  value?: string
  onValueChange?: (key: string, value: Date) => void
}

export default function CalendarComponent ({
  placeholder = 'Select a date',
  name,
  value,
  onValueChange
}: Props): React.ReactElement {
  const {
    selected,
    year,
    month,
    days,
    headers,
    showCalendar,
    handlerSubtractMonth,
    handlerAddMonth,
    handleShowCalendar,
    isTodayOrSelected,
    handleSelectDate
  } = useCalendar({ name, value, onValueChange })

  return (
    <div className={styles.calendar_container}>
      <input
        className={styles.calendar_input}
        type="text"
        readOnly
        onClick={handleShowCalendar}
        placeholder={placeholder}
        value={selected}
      />
      <HiCalendar className={styles.calendar_icon_placeholder}/>
      {showCalendar && (
        <div className={styles.calendar_body}>
          <div className={styles.calendar_actions}>
            <HiChevronLeft
              className={styles.calendar_icon}
              onClick={handlerSubtractMonth}
            />
            <span>
              {year} - {month}
            </span>
            <HiChevronRight
              className={styles.calendar_icon}
              onClick={handlerAddMonth}
            />
          </div>
          <div className={styles.calendar_days_headers}>
            {headers.map((header, i) => (
              <span key={i}>{header}</span>
            ))}
          </div>
          <div className={styles.calendar_days_container}>
            {days.map((day, i) => (
              <span
                key={i}
                className={classNames(isTodayOrSelected(day) && styles.today)}
                onClick={() => {
                  handleSelectDate(day)
                }}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
