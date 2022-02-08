import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../theme/themeSlice.js'

export default configureStore({
    reducer: {
        theme: themeReducer,
    }
})


