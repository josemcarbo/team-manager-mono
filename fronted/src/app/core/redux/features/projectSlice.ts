/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IProject } from '../services/projectApi'

interface ProjectState {
  projects: IProject[]
  project: IProject | null
  createViewOpen: boolean
}

const initialState = {
  projects: [],
  project: null,
  createViewOpen: false
} as ProjectState

export const project = createSlice({
  name: 'project',
  initialState,
  reducers: {
    createViewOpen: (state, action: PayloadAction<boolean>) => {
      state.createViewOpen = action.payload
    },
    refreshList: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload
    },
    refreshOne: (state, action: PayloadAction<IProject>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      )
      state.projects =
        index === -1
          ? [...state.projects, action.payload]
          : (state.projects = state.projects.map((project) => {
              if (project.id === action.payload.id) {
                return action.payload
              }
              return project
            }))

      state.project =
        state.project !== null && action.payload.id === state.project.id
          ? action.payload
          : state.project
    },
    selectProject: (state, action: PayloadAction<IProject>) => {
      state.project = action.payload
    }
  }
})

export const { refreshOne, refreshList, selectProject, createViewOpen } =
  project.actions

export default project.reducer
