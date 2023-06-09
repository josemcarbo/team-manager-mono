import { BASE_API_URL } from '@/app/core/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IBoard {
  id: string
  name: string
  description?: string
  labels: BoardLabel[]
  list: string[]
  members: string[]
  owner: string
  createdAt: string
  updatedAt: string
}

interface CreateBoard {
  name: string
  description?: string
  list: string[]
}

interface FindAllBoard {
  name?: string
  description?: string
}

export interface BoardLabel {
  text: string
  color: string
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

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/boards`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', token)
      return headers
    }
  }),
  endpoints: (builder) => ({
    create: builder.mutation<IBoard, CreateBoard>({
      query: (body) => ({ url: '', method: 'POST', body })
    }),
    findOne: builder.query<IBoard, string>({
      query: (id) => ({ url: `/${id}`, method: 'GET' })
    }),
    findAll: builder.query<IBoard[], FindAllBoard | undefined>({
      query: (params) => ({ url: '', method: 'GET', params })
    }),
    addNewList: builder.mutation<IBoard, AddNewList>({
      query: ({ id, list }) => ({
        url: `/${id}/list`,
        method: 'POST',
        body: { list }
      })
    })
  })
})

export const {
  useFindOneQuery,
  useFindAllQuery,
  useCreateMutation,
  useAddNewListMutation
} = boardApi
