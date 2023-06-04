'use client'
import React from 'react'
import Avatar from '../avatar/avatar'
import Window from '../window/window'
import styles from './styles.module.css'

import ProjectSelector from '../project/selector/selector'
import useNavbar from './useNavbar'

export default function NavbarComponent (): React.ReactElement {
  const { user, userSettingOpen, handleUserSettingOpen, handleLogOut } =
    useNavbar()
  return (
    <>
      {user !== null &&
        (
        <nav className={styles.navbar}>
          <ul>
            <li className={styles.clickable}>
              <ProjectSelector />
            </li>
            <li className={styles.clickable} onClick={handleUserSettingOpen}>
              <Avatar
                size="large"
                avatar={`${user.firstName} ${user.lastName}`}
              />
              <div className={styles.modal_container}>
                <Window hidden={userSettingOpen}>
                  <nav className={styles.sub_navbar}>
                    <ul>
                      <li>
                        <article className={styles.information}>
                          <Avatar
                            size="medium"
                            avatar={`${user.firstName} ${user.lastName}`}
                          />
                          <div className={styles.info}>
                            <span>
                              {user.firstName} {user.lastName}
                            </span>
                            <span className={styles.text_small}>
                              {user.email}
                            </span>
                          </div>
                        </article>
                      </li>
                      <li>
                        <div className={styles.separator}></div>
                      </li>
                      <li className={styles.clickable}>
                        <span>Edit profile info</span>
                      </li>
                      <li className={styles.clickable} onClick={handleLogOut}>
                        <span>Log out</span>
                      </li>
                    </ul>
                  </nav>
                </Window>
              </div>
            </li>
          </ul>
        </nav>
        )}
    </>
  )
}
