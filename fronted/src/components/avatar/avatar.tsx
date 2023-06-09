'use client'
import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'

interface Props {
  avatar: string
  size: 'small' | 'medium' | 'large'
}

export default function AvatarComponent (props: Props): React.ReactElement {
  const toShortAvatarName = (avatar: string): string => {
    const avatarSplit = avatar.split(' ')
    return avatarSplit.length === 1
      ? avatarSplit[0][0].toUpperCase() + avatarSplit[0][1].toUpperCase()
      : avatarSplit[0][0].toUpperCase() + avatarSplit[1][0].toUpperCase()
  }

  return (
        <div className={classNames(styles.avatar_container, styles[props.size])}>
            <span>{toShortAvatarName(props.avatar)}</span>
        </div>
  )
}
