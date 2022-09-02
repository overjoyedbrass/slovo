import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../theme/themeSlice.js'
import gameStateReducer from './slices/gameState.js'
import nicknameReducer from './slices/nicknameSlice.js'

export default configureStore({
    reducer: {
        theme: themeReducer,
        gameState: gameStateReducer,
        nickname: nicknameReducer
    },
})


