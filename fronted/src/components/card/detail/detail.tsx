/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'
import React from 'react'
import styles from './styles.module.css'
import useDetail from './useDetail'
import OverlayComponent from '@/components/overlay/overlay'
import {
  HiOutlineClock,
  HiOutlineTag,
  // HiOutlineUserPlus,
  HiOutlineXMark
} from 'react-icons/hi2'
import CreateLabelComponent from '../label/label'
import DateRangeComponent from '../date/date'

export default function CardIDetailComponent (): React.ReactElement {
  const {
    card,
    bgColor,
    showDetail,
    openLabelView,
    openDateView,
    handleClose,
    handleCloseLabelView,
    handleOpenLabelView,
    handleOpenDateView,
    handleCloseDateView,
    transformFromDateToFormatted,
    handleRemoveLabel
  } = useDetail()

  return (
    <>
      {card !== null && showDetail && (
        <OverlayComponent>
          <article className={styles.detail_container}>
            <HiOutlineXMark className={styles.icon} onClick={handleClose} />
            <div className={styles.detail_content}>
              <h1>{card.name}</h1>
              <h4>
                <span
                  className={styles.detail_status}
                  style={{ backgroundColor: bgColor }}
                >
                  {card.status}
                </span>
                {card?.startDate !== undefined && (
                  <i>{transformFromDateToFormatted(card.startDate)}</i>
                )}
                {card?.dueDate !== undefined && (
                  <i> - {transformFromDateToFormatted(card.dueDate)}</i>
                )}
              </h4>
              {card?.labels?.length !== undefined &&
                card?.labels?.length > 0 && (
                  <div className={styles.detail_labels}>
                    {card.labels.map((label, i) => (
                      <div key={i} style={{ backgroundColor: label.color }}>
                        <span>{label.text}</span>
                        <HiOutlineXMark
                          className={styles.icon}
                          onClick={() => {
                            handleRemoveLabel(label)
                          }}
                        />
                      </div>
                    ))}
                  </div>
              )}
              <div className={styles.detail_actions}>
                <HiOutlineTag
                  title="Edit labels"
                  className={styles.icon}
                  onClick={handleOpenLabelView}
                />
                <HiOutlineClock
                  title="Edit duration"
                  className={styles.icon}
                  onClick={handleOpenDateView}
                />
                {/* <HiOutlineUserPlus
                  title="Edit members"
                  className={styles.icon}
                /> */}
                {openLabelView && (
                  <div className={styles.detail_action_label}>
                    <CreateLabelComponent onClose={handleCloseLabelView} />
                  </div>
                )}
                {openDateView && (
                  <div className={styles.detail_action_date}>
                    <DateRangeComponent onClose={handleCloseDateView} />
                  </div>
                )}
              </div>
              {card?.description !== '' && (
                <div
                  className={styles.detail_description}
                  dangerouslySetInnerHTML={{
                    __html:
                      card?.description !== undefined ? card.description : ''
                  }}
                />
              )}
            </div>
          </article>
        </OverlayComponent>
      )}
    </>
  )
}
