import { useState } from 'react'

interface IUseDrag {
  isDragging: boolean
  handleDraggingStart: (e: any) => void
  handleDraggingEnd: () => void
}

export default function useDrag (): IUseDrag {
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleDraggingStart = (e: any): void => {
    e.dataTransfer.setData('text/plain', e.target.id)
    e.dataTransfer.dropEffect = 'move'
    setIsDragging(true)
  }

  const handleDraggingEnd = (): void => {
    setIsDragging(false)
  }

  return {
    isDragging,
    handleDraggingStart,
    handleDraggingEnd
  }
}
