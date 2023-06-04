/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IProject } from '../services/projectApi'

interface ProjectState {
  projects: IProject[]
  project: IProject | null
}

const initialState = {
  projects: [],
  project: null
} as ProjectState

export const project = createSlice({
  name: 'project',
  initialState,
  reducers: {
    refreshList: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload
    },
    refreshOne: (state, action: PayloadAction<IProject>) => {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.id) {
          return action.payload
        }
        return project
      })
    },
    selectProject: (state, action: PayloadAction<IProject>) => {
      state.project = action.payload
    }
  }
})

export const { refreshOne, refreshList, selectProject } = project.actions

export default project.reducer
