import { BASE_API_URL } from '@/app/core/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IProject {
  id: string
  name: string
  description?: string
  labels: ProjectLabel[]
  list: ProjectList[]
  members: string[]
  owner: string
  createdAt: string
  updatedAt: string
}

interface CreateProject {
  name: string
  description?: string
  list: ProjectList[]
}

interface FindAllProject {
  name?: string
  description?: string
}

interface ProjectLabel {
  text: string
  color: string
}

export interface ProjectList {
  text: string
  order: number
}

interface AddNewLabel {
  id: string
  label: ProjectLabel
}

const token = sessionStorage?.getItem('token') as string

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/projects`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token.replace(/"/g, '')}`)
      return headers
    }
  }),
  endpoints: (builder) => ({
    createProject: builder.mutation<IProject, CreateProject>({
      query: (body) => ({ url: '', method: 'POST', body })
    }),
    findOneProject: builder.query<IProject, string>({
      query: (id) => ({ url: `/${id}`, method: 'GET' })
    }),
    findAllProject: builder.query<IProject[], FindAllProject | undefined>({
      query: (params) => ({ url: '', method: 'GET', params })
    }),
    addNewLabel: builder.mutation<IProject, AddNewLabel>({
      query: ({ id, label }) => ({
        url: `/${id}/label`,
        method: 'POST',
        body: label
      })
    })
  })
})

export const {
  useFindOneProjectQuery,
  useFindAllProjectQuery,
  useCreateProjectMutation,
  useAddNewLabelMutation
} = projectApi
