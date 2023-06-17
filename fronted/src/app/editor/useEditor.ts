import { useEffect } from 'react'

interface IUseEditor {
  execCommand: (command: string) => void
}

export default function useEditor (): IUseEditor {
  useEffect(() => {
    document.getElementById('editor')?.focus()
  }, [])

  const execCommand = (command: string): void => {
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)

    const parentNode = (selection?.anchorNode?.parentNode as any)?.closest(
      command
    )

    if (parentNode !== null) {
      parentNode.replaceWith(...parentNode.childNodes)
      return
    }

    const newNode = document.createElement(command)

    if (
      command === 'left' ||
      command === 'center' ||
      command === 'right' ||
      command === 'justify'
    ) {
      const parent = range?.commonAncestorContainer.parentElement
      if (parent !== null && parent !== undefined) {
        parent.style.textAlign = command
        return
      }
    }

    if (command === 'ol' || command === 'ul') {
      const li = document.createElement('li')
      li.innerHTML = selection?.toString() as string
      newNode.appendChild(li)
    } else {
      const text = selection?.toString() as string
      newNode.innerHTML = text !== '' ? text : 'type...'
    }

    range?.deleteContents()
    range?.insertNode(newNode)
    document.getElementById('editor')?.focus()
  }

  return {
    execCommand
  }
}
