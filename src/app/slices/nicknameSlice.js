import { createSlice } from "@reduxjs/toolkit";

export const gameStateSlice = createSlice({
    name: 'nickname',
    initialState: {
        nick: localStorage.nickname
    },
    reducers: {
        setNickname(state, action){
            localStorage.nickname = action.payload
            state.nick = action.payload
        }
    }
})

export default gameStateSlice.reducer
export const { setNickname } = gameStateSlice.actions