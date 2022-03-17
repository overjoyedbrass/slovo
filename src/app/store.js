import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './api/apiSlice.js'

import themeReducer from '../theme/themeSlice.js'
import gameStateReducer from './slices/gameState.js'
import nicknameReducer from './slices/nicknameSlice.js'

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        theme: themeReducer,
        gameState: gameStateReducer,
        nickname: nicknameReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})


