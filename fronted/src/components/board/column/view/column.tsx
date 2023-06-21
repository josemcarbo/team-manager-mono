'use client'
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { HiOutlinePlusSmall } from 'react-icons/hi2'
import CardList from '@/components/card/list/list'
import useColumn from './useColumn'
import styles from './styles.module.css'
import OverlayComponent from '@/components/overlay/overlay'
import CardCreateComponent from '@/components/card/create/create'

interface Props {
  title: string
}

export default function ColumnViewComponent ({
  title
}: Props): React.ReactElement {
  const {
    cards,
    bgColor,
    isCreateCardOpen,
    handleCreateCard,
    handleOnCloseCreateCard
  } = useColumn({
    title
  })

  return (
    <>
      <article className={styles.container}>
        <header className={styles.header}>
          <div className={styles.name_container}>
            <div style={{ backgroundColor: bgColor }}>{cards.length}</div>
            <span>{title}</span>
          </div>
          <HiOutlinePlusSmall
            className={styles.icon}
            onClick={handleCreateCard}
          />
        </header>
        <div className={styles.content}>
          <CardList title={title} cards={cards} />
        </div>
      </article>
      {isCreateCardOpen && (
        <OverlayComponent>
          <CardCreateComponent
            status={title}
            onClose={handleOnCloseCreateCard}
          />
        </OverlayComponent>
      )}
    </>
  )
}
