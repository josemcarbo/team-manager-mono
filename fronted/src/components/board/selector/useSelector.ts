import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/core/redux/hooks'
import { selectBoard, createViewOpen } from '@/app/core/redux/features/boardSlice'
import { type IBoard } from '@/app/core/redux/services/boardApi'

interface UseSelector {
  boardList: IBoard[]
  board: IBoard | null
  boardSettingOpen: boolean
  handleSettingOpen: () => void
  handleSelected: (index: number) => void
  handleCreated: () => void
}

export default function useSelector (): UseSelector {
  const boardList = useAppSelector((state) => state.board.boards)
  const board = useAppSelector((state) => state.board.board)
  const [boardSettingOpen, setBoardSettingOpen] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (boardList.length > 0) {
      board === null && dispatch(selectBoard(boardList[0]))
    }
  }, [boardList])

  const handleSettingOpen = (): void => {
    setBoardSettingOpen(!boardSettingOpen)
  }

  const handleSelected = (index: number): void => {
    dispatch(selectBoard(boardList[index]))
  }

  const handleCreated = (): void => {
    dispatch(createViewOpen(true))
  }

  return {
    boardList,
    board,
    boardSettingOpen,
    handleSettingOpen,
    handleSelected,
    handleCreated
  }
}
