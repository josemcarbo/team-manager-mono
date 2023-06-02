/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Project } from '../services/projectApi'

interface ProjectState {
  projects: Project[]
}

const initialState = {
  projects: []
} as ProjectState

export const project = createSlice({
  name: 'project',
  initialState,
  reducers: {
    refresh: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload
    }
  }
})

export const { refresh } = project.actions

export default project.reducer
