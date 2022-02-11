import { createSlice } from "@reduxjs/toolkit";
import newsOperations from "./news-operations"

const initialState = {
    items: [],
    error: null
}

export const newsSlice = createSlice ({
    name: 'news',
    initialState,
    extraReducers:{
        [newsOperations.getNews.fulfilled]: (state, {payload}) => {
            state.items = [...state.items, ...payload]
            state.error = null
        },
        [newsOperations.getNews.rejected]: (state, {payload}) => {
            state.error = payload
        }
    }
})

export default newsSlice.reducer