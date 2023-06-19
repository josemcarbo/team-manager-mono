import { useEffect, useState } from 'react'

interface IUseInline {
  editorId: string
  commandId: string
  isTyping: boolean
  isShowCommand: boolean
  handleKeyDown: (e: any) => void
  handleInput: (e: any) => void
  execCommand: (command: string) => (e: any) => void
}

const ELEMENT_MAIN_ID = 'editor_inline'
const ELEMENT_COMMAND_ID = 'inline_commands'
// const ELEMENT_PLACEHOLDER = "<i>Press '/' to commands</i>"
// const ELEMENT_EMPTY = '<br>'
const TRIGGER_COMMAND = '/'
const COMMANDS = {
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  b: 'Bold',
  u: 'Underline',
  i: 'Italic',
  s: 'Strike',
  ul: 'Unordered List',
  ol: 'Ordered List'
}

export default function useInline (): IUseInline {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isShowCommand, setIsShowCommand] = useState<boolean>(false)

  useEffect(() => {
    const main = document.getElementById(ELEMENT_MAIN_ID)
    // if (main?.innerHTML !== null && main?.innerHTML !== undefined) {
    //   main.innerHTML = ELEMENT_PLACEHOLDER
    // }

    main?.focus()
  }, [])

  const handleKeyDown = (e: any): void => {

  }

  const handleInput = (e: any): void => {
    const main = document.getElementById(ELEMENT_MAIN_ID)

    if (
      main?.innerHTML === null ||
      main?.innerHTML === undefined ||
      main?.innerHTML === ''
    ) {
      setIsTyping(false)
      setIsShowCommand(false)
    } else {
      setIsTyping(true)
    }

    applyPlaceholder()
    // applyEventCommand()
  }

  const execCommand =
    (command: string) =>
      (e: any): void => {
        if (node === null) return

        const tag = document.createElement(command)
        const innerHTML =
        removeCommandCharacter(node?.firstChild?.textContent) ??
        COMMANDS[command as keyof typeof COMMANDS]

        if (command === 'ul' || command === 'ol') {
          const li = document.createElement('li')
          li.innerHTML = innerHTML
          tag.appendChild(li)
        } else {
          tag.innerHTML = innerHTML
        }

        if (
          node.firstChild?.textContent !== null &&
        node.firstChild?.textContent !== undefined
        ) {
          node.firstChild.textContent = null
        }

        node.appendChild(tag)

        const selection = window.getSelection()
        selection?.selectAllChildren(tag)

        setNode(null)
        setIsShowCommand(false)
      }

  const applyPlaceholder = (): void => {
    const main = document.getElementById(ELEMENT_MAIN_ID)

    if (main === null) return

    const nodes = main.childNodes

    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i] as HTMLElement

      if (
        node?.innerHTML === undefined &&
        node?.textContent?.charAt(node?.textContent?.length - 1) ===
          TRIGGER_COMMAND
      ) {
        const div = document.createElement('div')
        div.innerHTML = node.textContent
        node.parentElement?.replaceChild(div, node)
        node = div
      }

      if (
        node?.innerHTML?.charAt(node?.innerHTML?.length - 1) === TRIGGER_COMMAND
      ) {
        setNode(node)
        setIsShowCommand(true)
        return
      } else {
        setIsShowCommand(false)
      }
    }
  }

  const removeCommandCharacter = (
    content: string | undefined | null
  ): string | undefined => {
    if (content === null || content === undefined) return

    const response = content.replace(TRIGGER_COMMAND, '')

    if (response === '') return

    return response
  }

  return {
    editorId: ELEMENT_MAIN_ID,
    commandId: ELEMENT_COMMAND_ID,
    isTyping,
    isShowCommand,
    handleKeyDown,
    handleInput,
    execCommand
  }
}
