/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ICard } from '../services/cardApi'

interface CardState {
  cards: ICard[]
  card: ICard | null
  createViewOpen: boolean
}

const initialState = {
  cards: [],
  card: null,
  createViewOpen: false
} as CardState

export const card = createSlice({
  name: 'card',
  initialState,
  reducers: {
    createViewOpen: (state, action: PayloadAction<boolean>) => {
      state.createViewOpen = action.payload
    },
    refreshList: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload
    },
    removeOne: (state, action: PayloadAction<ICard>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload.id)
    }
  }
})

export const { refreshList, createViewOpen, removeOne } =
  card.actions

export default card.reducer
