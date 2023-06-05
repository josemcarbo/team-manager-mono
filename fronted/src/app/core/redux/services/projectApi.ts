import { BASE_API_URL } from '@/app/core/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IProject {
  id: string
  name: string
  description?: string
  labels: ProjectLabel[]
  list: string[]
  members: string[]
  owner: string
  createdAt: string
  updatedAt: string
}

interface CreateProject {
  name: string
  description?: string
  list: string[]
}

interface FindAllProject {
  name?: string
  description?: string
}

interface ProjectLabel {
  text: string
  color: string
}

interface AddNewLabel {
  id: string
  label: ProjectLabel
}

interface AddNewList {
  id: string
  list: string
}

let token = ''
if (typeof localStorage?.getItem('token') === 'string') {
  token = `Bearer ${(localStorage?.getItem('token') as string).replace(
    /"/g,
    ''
  )}`
}

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/projects`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', token)
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
    }),
    addNewList: builder.mutation<IProject, AddNewList>({
      query: ({ id, list }) => ({
        url: `/${id}/list`,
        method: 'POST',
        body: { list }
      })
    })
  })
})

export const {
  useFindOneProjectQuery,
  useFindAllProjectQuery,
  useCreateProjectMutation,
  useAddNewLabelMutation,
  useAddNewListMutation
} = projectApi
