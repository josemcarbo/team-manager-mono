/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { BASE_API_URL } from '@/app/core/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  roles: string[]
  createdAt: string
  updatedAt: string
}

interface CreateUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

let token = ''
if (typeof localStorage?.getItem('token') === 'string') {
  token = `Bearer ${(localStorage?.getItem('token') as string).replace(
    /"/g,
    ''
  )}`
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/users`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', token)
      return headers
    }
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<CreateUser, User>({
      query: (body) => ({ url: '/signup', method: 'POST', body })
    }),
    getUser: builder.query<User, void>({
      query: () => ({ url: '', method: 'GET' }),
      extraOptions: { maxRetries: 0 }
    })
  })
})

export const { useGetUserQuery, useCreateUserMutation } = userApi
