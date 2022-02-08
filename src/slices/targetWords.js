import { createSlice } from "@reduxjs/toolkit";
import { loadWordLength } from "../helpers";



export const targetWordsSlice = createSlice({
    name: 'targetWords',
    initialState: {
        currentLength: loadWordLength(),
        words: {
        },
    },
    reducers: {
        saveNewWord(state, action){
            state.words[state.currentLength] = action.payload
        }
    }
})

export default targetWordsSlice.reducer
export const { saveNewWord } = targetWordsSlice.actions
export const selectCurrentLength = state => state.targetWords.currentLength
export const selectTargetWord = state => state.targetWords.words[state.targetWords.currentLength] ?? ""