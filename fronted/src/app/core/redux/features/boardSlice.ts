/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type BoardLabel, type IBoard } from '../services/boardApi'

interface BoardState {
  boards: IBoard[]
  board: IBoard | null
  createViewOpen: boolean
}

const initialState = {
  boards: [],
  board: null,
  createViewOpen: false
} as BoardState

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createViewOpen: (state, action: PayloadAction<boolean>) => {
      state.createViewOpen = action.payload
    },
    refreshList: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload
    },
    refreshOne: (state, action: PayloadAction<IBoard>) => {
      const index = state.boards.findIndex(
        (board) => board.id === action.payload.id
      )
      state.boards =
        index === -1
          ? [...state.boards, action.payload]
          : (state.boards = state.boards.map((board) => {
              if (board.id === action.payload.id) {
                return action.payload
              }
              return board
            }))

      state.board =
        state.board !== null && action.payload.id === state.board.id
          ? action.payload
          : state.board
    },
    selectBoard: (state, action: PayloadAction<IBoard>) => {
      state.board = action.payload
    },
    refreshLabelList: (state, action: PayloadAction<BoardLabel[]>) => {
      if (state.board !== null) {
        state.board = {
          ...state.board,
          labels: [...state.board?.labels, ...action.payload]
        }

        state.boards.map((board) => {
          if (board.id === state?.board?.id) {
            board.labels = state.board.labels
          }
          return board
        })
      }
    }
  }
})

export const {
  refreshOne,
  refreshList,
  selectBoard,
  createViewOpen,
  refreshLabelList
} = board.actions

export default board.reducer
