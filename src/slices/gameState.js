import { createSlice } from "@reduxjs/toolkit";
import { loadWordLength } from "../helpers";



export const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: {
        currentLength: loadWordLength(),
        words: {
        },
        leaderboards: {

        },
        history: {

        }
    },
    reducers: {
        saveGameState(state, action){
            state.words[state.currentLength] = action.payload.word
            state.leaderboards[state.currentLength] = action.payload.leaderboard
            state.history[state.currentLength] = action.payload.history
        },
        updateLeaderboard(state, action){
            state.leaderboards[state.currentLength].push(action.payload)
        }
    }
})

export default gameStateSlice.reducer
export const { saveGameState, updateLeaderboard } = gameStateSlice.actions

export const selectCurrentLength = state => state.gameState.currentLength

export const selectTargetWord = state => state.gameState.words[state.gameState.currentLength] ?? ""

export const selectLeaderboard = state => state.gameState.leaderboards[state.gameState.currentLength] ?? []

export const selectHistory = state => state.gameState.history[state.gameState.currentLength] ?? []