'use client'
import React from 'react'
import {
  BsCode,
  BsJustify,
  BsJustifyLeft,
  BsJustifyRight,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline
} from 'react-icons/bs'
import styles from './styles.module.css'
import useEditor from './useEditor'

export default function EditorComponent (): React.ReactElement {
  const { text, handleOnKeyDown, handleSelectCapture, format, handleMouseUp } = useEditor()

  return (
    <div className={styles.editor_container}>
      <div id='actions' className={styles.editor_actions}>
        <div>
          <BsTypeH1
            className={styles.icon}
            onClick={() => {
              format('h1')
            }}
          />
          <BsTypeH2
            className={styles.icon}
            onClick={() => {
              format('h2')
            }}
          />
          <BsTypeH3
            className={styles.icon}
            onClick={() => {
              format('h3')
            }}
          />
        </div>
        <div>
          <BsTypeBold
            className={styles.icon}
            onClick={() => {
              format('b')
            }}
          />
          <BsTypeItalic
            className={styles.icon}
            onClick={() => {
              format('i')
            }}
          />
          <BsTypeUnderline
            className={styles.icon}
            onClick={() => {
              format('u')
            }}
          />
          <BsTypeStrikethrough className={styles.icon} />
          <BsCode
            className={styles.icon}
            onClick={() => {
              format('code')
            }}
          />
        </div>
        <div>
          <BsJustifyLeft className={styles.icon} />
          <BsJustifyRight className={styles.icon} />
          <BsJustify className={styles.icon} />
        </div>
        <div>
          <BsListOl className={styles.icon} />
          <BsListUl className={styles.icon} />
        </div>
      </div>
      <div
        id="editor"
        tabIndex={0}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onMouseUp={handleMouseUp}
        className={styles.editor_content}
      ></div>
    </div>
  )
}
