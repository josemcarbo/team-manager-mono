import { useAppSelector } from '@/app/core/redux/hooks'
import { type IBoard } from '@/app/core/redux/services/boardApi'

interface IUseBoard {
  board: IBoard | null
}
export default function useBoard (): IUseBoard {
  const board = useAppSelector((state) => state.board.board)

  return { board }
}
