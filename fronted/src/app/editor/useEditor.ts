import { use, useEffect, useState } from 'react'

interface IUseEditor {
  text: string
  enableEditor: boolean
  toggleEditor: () => void
  handleOnKeyDown: (e: any) => void
  handleSelectCapture: (e: any) => void
  format: (command: any, value?: any) => void
  handleMouseUp: (e: any) => void
}

export default function useEditor (): IUseEditor {
  console.log('useEditor')
  const [enableEditor, setEnableEditor] = useState(false)
  const [text, setText] = useState('')
  const [tag, setTag] = useState('h1')
  const [keyPressed, setKeyPressed] = useState<string[]>([])

  const editor = document.getElementById('editor')
  // useEffect(() => {
  console.log('UseEffect')
  // document.addEventListener('keydown', (e) => {
  //   console.log(e.key)
  //   setText(text + e.key)
  // })
  // }, [])

  const handleOnKeyDown = (e: any): void => {
    let keys = keyPressed

    switch (e.key) {
      case 'Enter':
        keys = [...keyPressed, '<br>']
        break
      case 'Backspace':
        keys = keys.slice(0, -1)
        break
      case 'Shift':
        break
      default:
        keys = [...keyPressed, e.key]
    }

    console.log(e.keyCode, keyPressed)
    setKeyPressed(keys)
    setText(`<${tag}>${keys.join('')}<span class='text_indicator'/></${tag}>`)
  }

  const handleMouseUp = (e: any): void => {
    const actions = document.getElementById('actions')
    console.log(actions)
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    console.log('range: ', range.toString())
    const parent = range.commonAncestorContainer
    const tagName = parent.tagName.toLowerCase()
    console.log(tagName)
    const activeButtons = actions.querySelectorAll('.active')
    activeButtons.forEach((button) => {
      button.classList.remove('active')
    })

    if (tagName === 'h1') {
      actions.querySelector('button:nth-child(1)').classList.add('active')
    } else if (tagName === 'h2') {
      actions.querySelector('button:nth-child(2)').classList.add('active')
    } else if (tagName === 'b') {
      actions.querySelector('button:nth-child(3)').classList.add('active')
    } else if (tagName === 'i') {
      actions.querySelector('button:nth-child(4)').classList.add('active')
    } else if (tagName === 'ul' || tagName === 'ol') {
      actions.querySelector('button:nth-child(5)').classList.add('active')
    }
  }

  const handleSelectCapture = (e: any): void => {
    console.log(e)
  }

  const toggleEditor = (): void => {
    setEnableEditor(!enableEditor)
  }

  const format = (tag: string): void => {
    const selection = window.getSelection()
    console.log(selection)
    const range = selection?.getRangeAt(0)
    console.log(range)
    console.log('range: ', range.toString())
    const element = document.createElement(tag)
    console.log(element)
    const text = range.toString().trim()
    console.log('text', text)
    element.innerText = text
    range.deleteContents()
    element.appendChild(range.extractContents())
    range.insertNode(element)
  }

  return {
    text,
    enableEditor,
    toggleEditor,
    handleOnKeyDown,
    handleSelectCapture,
    format,
    handleMouseUp
  }
}
