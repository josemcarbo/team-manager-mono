import { BASE_API_URL } from '@/app/core/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface LoginResponse {
  access_token: string
}

interface LoginRequest {
  email: string
  password: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/auth/`
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: 'login', method: 'POST', body })
    })
  })
})

export const { useLoginMutation } = authApi
