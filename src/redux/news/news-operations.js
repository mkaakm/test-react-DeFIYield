import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchNews} from "../../services/news-services";

const getNews = createAsyncThunk(
    "news/get",
    async (page, {rejectWithValue}) => {
        try{
            const data = await fetchNews(page)
            return data
        }
        catch (error){
            return rejectWithValue(error.massage)
        }
    }
)

const newsOperations = {
    getNews
}

export default newsOperations