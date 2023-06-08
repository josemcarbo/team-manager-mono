import { BASE_API_URL } from '@/app/core/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ICardLabel {
  text: string
  color: string
}

export interface ICard {
  id?: string
  name: string
  description?: string
  status: string
  labels?: ICardLabel[]
  dueDate?: Date
  startDate?: Date
  assignee?: string
  reviewer?: string
  points: number
  owner: string
  board: string
}

export interface ICardFindParam {
  status?: string
  assignees?: string
  reviewer?: string
  board?: string
}

let token = ''
if (typeof localStorage?.getItem('token') === 'string') {
  token = `Bearer ${(localStorage?.getItem('token') as string).replace(
    /"/g,
    ''
  )}`
}

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/cards`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', token)
      return headers
    }
  }),
  endpoints: (builder) => ({
    findAllCard: builder.query<ICard[], ICardFindParam | undefined>({
      query: (params) => ({ url: '', method: 'GET', params })
    })
  })
})

export const { useFindAllCardQuery } = cardApi
