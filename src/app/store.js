import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../theme/themeSlice.js'
import targetWordsReducer from '../slices/targetWords.js'

export default configureStore({
    reducer: {
        theme: themeReducer,
        targetWords: targetWordsReducer
    }
})


