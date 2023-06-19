'use client'
import React from 'react'
import styles from './styles.module.css'
import useEditor from './useInline'
import classNames from 'classnames'

export default function InLineComponent (): React.ReactElement {
  const {
    editorId,
    commandId,
    isTyping,
    isShowCommand,
    handleKeyDown,
    handleInput,
    execCommand
  } = useEditor()

  return (
    <div className={styles.editor_container}>
      <div
        id={editorId}
        tabIndex={0}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={classNames(
          styles.editor_content,
          !isTyping && styles.placeholder
        )}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      ></div>
      {isShowCommand && (
        <div id={commandId} className={styles.commands} contentEditable={false}>
          <h1 onClick={execCommand('h1')}>Heading 1</h1>
          <h2 onClick={execCommand('h2')}>Heading 2</h2>
          <h3 onClick={execCommand('h3')}>Heading 3</h3>
          <h4 onClick={execCommand('h4')}>Heading 4</h4>
          <b onClick={execCommand('b')}>Bold</b>
          <i onClick={execCommand('i')}>Italic</i>
          <u onClick={execCommand('u')}>Underline</u>
          <s onClick={execCommand('s')}>Strike through</s>
          <span onClick={execCommand('ul')}>Unordered list</span>
          <span onClick={execCommand('ol')}>Ordered list</span>
        </div>
      )}
    </div>
  )
}
