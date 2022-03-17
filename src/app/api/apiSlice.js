import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const BASE_URL = "" 
const AUTHORIZATION_KEY = "" 

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('authorization', AUTHORIZATION_KEY)
            return headers
        },
    }),
    tagTypes: ['GameData'],

    endpoints: builder => ({
        gamedata: builder.query({
            query: () => ({
                url: 'word',
                method: "GET"
            }),
            providesTags: (result, error, arg) => [{type: 'GameData', id: arg}]
        }),
        lbWrite: builder.mutation({
            query: (data) => ({
                url: 'lbwrite',
                method: 'post',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'GameData', id: arg.id }]
        })
    })
})

export const {
    useGameDataQuery,
    useLbWriteMutation
} = apiSlice