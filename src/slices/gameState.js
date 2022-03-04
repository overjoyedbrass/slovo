import { createSlice } from "@reduxjs/toolkit";
import { loadWordLength } from "../helpers/helpers";



export const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: {
        currentLength: loadWordLength(),
        words: {
        },
        leaderboards: {

        },
        history: []
    },
    reducers: {
        saveGameState(state, action){
            state.words[state.currentLength] = action.payload.word
            state.leaderboards[state.currentLength] = action.payload.leaderboard
            state.history = action.payload.history
        },
        updateLeaderboard(state, action){
            state.leaderboards[state.currentLength].push(action.payload)
        },
        setNewLength(state, action){
            localStorage.wordLength = action.payload
            state.currentLength = action.payload
        }
    }
})

export default gameStateSlice.reducer
export const { saveGameState, updateLeaderboard, setNewLength } = gameStateSlice.actions

export const selectCurrentLength = state => state.gameState.currentLength
export const selectTargetWord = state => state.gameState.words[state.gameState.currentLength] ?? ""
export const selectLeaderboard = state => state.gameState.leaderboards[state.gameState.currentLength] ?? []
export const selectHistory = state => state.gameState.history ?? []