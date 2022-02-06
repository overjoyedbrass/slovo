import { createSlice } from "@reduxjs/toolkit"


function initialTheme(){
    const theme = localStorage.getItem("theme")
    return theme ? theme : "dark"
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: initialTheme()
    },
    reducers: {
        setCurrentTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})


export const { setCurrentTheme } = themeSlice.actions

export const selectCurrentTheme = state => state.theme.theme
export default themeSlice.reducer
