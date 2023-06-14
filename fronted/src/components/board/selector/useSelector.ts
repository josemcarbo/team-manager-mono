import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/core/redux/hooks'
import { selectBoard, createViewOpen } from '@/app/core/redux/features/boardSlice'
import { type IBoard } from '@/app/core/redux/services/boardApi'

interface UseSelector {
  boardList: IBoard[]
  boardListHide: IBoard[]
  board: IBoard | null
  boardSettingOpen: boolean
  handleSettingOpen: () => void
  handleSelected: (index: number) => void
  handleCreated: () => void
}

export default function useSelector (): UseSelector {
  const boards = useAppSelector((state) => state.board.boards)
  const [boardList, setBoardList] = useState<IBoard[]>([])
  const [boardListHide, setBoardListHide] = useState<IBoard[]>([])
  const board = useAppSelector((state) => state.board.board)
  const [boardSettingOpen, setBoardSettingOpen] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (boards.length > 0) {
      board === null && dispatch(selectBoard(boards[0]))
      setBoardList(boards.slice(0, 3))
      setBoardListHide(boards.slice(3))
    }
  }, [boards])

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
    boardListHide,
    board,
    boardSettingOpen,
    handleSettingOpen,
    handleSelected,
    handleCreated
  }
}
