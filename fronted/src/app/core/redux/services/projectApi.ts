import { BASE_API_URL } from '@/app/core/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Project {
  id: string
  name: string
  description?: string
  owner: string
  createdAt: string
  updatedAt: string
}

interface CreateProject {
  name: string
  description?: string
}

interface FindAllProject {
  name?: string
  description?: string
}

const token = sessionStorage?.getItem('token') as string

export const projectApi = createApi({
  reducerPath: 'projectApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/projects`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token.replace(/"/g, '')}`)
      return headers
    }
  }),
  endpoints: (builder) => ({
    createProject: builder.mutation<CreateProject, Project>({
      query: (body) => ({ url: '', method: 'POST', body })
    }),
    findOneProject: builder.query<Project, string>({
      query: (id) => ({ url: `/${id}`, method: 'GET' })
    }),
    findAllProject: builder.query<Project[], FindAllProject | undefined>({
      query: (params) => ({ url: '', method: 'GET', params })
    })
  })
})

export const { useFindOneProjectQuery, useFindAllProjectQuery, useCreateProjectMutation } = projectApi
