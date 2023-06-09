/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ICard } from '../services/cardApi'

interface CardState {
  cards: ICard[]
  card: ICard | null
  createViewOpen: boolean
  detailViewOpen: boolean
}

const initialState = {
  cards: [],
  card: null,
  createViewOpen: false,
  detailViewOpen: false
} as CardState

export const card = createSlice({
  name: 'card',
  initialState,
  reducers: {
    createViewOpen: (state, action: PayloadAction<boolean>) => {
      state.createViewOpen = action.payload
    },
    detailViewOpen: (state, action: PayloadAction<boolean>) => {
      state.detailViewOpen = action.payload
    },
    refreshList: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload
    },
    refreshOne: (state, action: PayloadAction<ICard>) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      )
      state.cards =
        index === -1
          ? [...state.cards, action.payload]
          : (state.cards = state.cards.map((card) => {
              if (card.id === action.payload.id) {
                return action.payload
              }
              return card
            }))

      state.card =
        state.card !== null && action.payload.id === state.card.id
          ? action.payload
          : state.card
    },
    removeOne: (state, action: PayloadAction<ICard>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload.id)
    },
    selectCard: (state, action: PayloadAction<ICard>) => {
      state.card = action.payload
    }
  }
})

export const {
  refreshOne,
  refreshList,
  detailViewOpen,
  createViewOpen,
  removeOne,
  selectCard
} = card.actions

export default card.reducer
