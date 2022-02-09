import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../theme/themeSlice.js'
import gameStateReducer from '../slices/gameState.js'

export default configureStore({
    reducer: {
        theme: themeReducer,
        gameState: gameStateReducer
    }
})


