/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IProject } from '../services/projectApi'

interface ProjectState {
  projects: IProject[]
}

const initialState = {
  projects: []
} as ProjectState

export const project = createSlice({
  name: 'project',
  initialState,
  reducers: {
    refresh: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload
    }
  }
})

export const { refresh } = project.actions

export default project.reducer
