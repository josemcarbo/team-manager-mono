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
  dueDate?: string
  startDate?: string
  assignee?: string
  reviewer?: string
  points?: number
  owner?: string
  board: string
}

export interface ICardUpdate {
  id: string
  card: {
    name?: string
    description?: string
    status?: string
    labels?: ICardLabel[]
    dueDate?: string
    startDate?: string
    assignee?: string
    reviewer?: string
    points?: number
  }
}

export interface ICardFindParam {
  status?: string
  assignees?: string
  reviewer?: string
  board?: string
}

interface IAddNewLabel {
  id: string
  labels: ICardLabel[]
}

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/cards`,
    prepareHeaders: (headers) => {
      const token = `Bearer ${(
        localStorage?.getItem('token') as string
      ).replace(/"/g, '')}`
      headers.set('Authorization', token)
      return headers
    }
  }),
  endpoints: (builder) => ({
    findAllCard: builder.query<ICard[], ICardFindParam | undefined>({
      query: (params) => ({ url: '', method: 'GET', params })
    }),
    remove: builder.mutation<ICard, string>({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' })
    }),
    addNewLabel: builder.mutation<ICard, IAddNewLabel>({
      query: ({ id, labels }) => ({
        url: `/${id}/label`,
        method: 'POST',
        body: labels
      })
    }),
    removeLabel: builder.mutation<ICard, IAddNewLabel>({
      query: ({ id, labels }) => ({
        url: `/${id}/label`,
        method: 'PATCH',
        body: labels
      })
    }),
    update: builder.mutation<ICard, ICardUpdate>({
      query: ({ id, card }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: card
      })
    }),
    create: builder.mutation<ICard, ICard>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useFindAllCardQuery,
  useRemoveMutation,
  useAddNewLabelMutation,
  useRemoveLabelMutation,
  useUpdateMutation,
  useCreateMutation
} = cardApi
