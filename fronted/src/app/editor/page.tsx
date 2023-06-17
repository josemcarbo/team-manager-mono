'use client'
import React from 'react'
import {
  // BsCode,
  BsTypeH1,
  BsJustify,
  BsJustifyLeft,
  BsJustifyRight,
  BsTextCenter,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline
} from 'react-icons/bs'
import styles from './styles.module.css'
import useEditor from './useEditor'

export default function EditorComponent (): React.ReactElement {
  const { execCommand } = useEditor()

  return (
    <div className={styles.editor_container}>
      <div id="actions" className={styles.editor_actions}>
        <button
          onClick={() => {
            execCommand('h1')
          }}
        >
          <BsTypeH1 className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('b')
          }}
        >
          <BsTypeBold className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('i')
          }}
        >
          <BsTypeItalic className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('u')
          }}
        >
          <BsTypeUnderline className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('s')
          }}
        >
          <BsTypeStrikethrough className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('left')
          }}
        >
          <BsJustifyLeft className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('center')
          }}
        >
          <BsTextCenter className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('right')
          }}
        >
          <BsJustifyRight className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('justify')
          }}
        >
          <BsJustify className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('ol')
          }}
        >
          <BsListOl className={styles.icon} />
        </button>
        <button
          onClick={() => {
            execCommand('ul')
          }}
        >
          <BsListUl className={styles.icon} />
        </button>
      </div>
      <div
        id="editor"
        tabIndex={0}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={styles.editor_content}
      ></div>
    </div>
  )
}
