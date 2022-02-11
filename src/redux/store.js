import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './news/news-slice'

const store = configureStore({
  reducer: {
        news: newsReducer
  },
})

export default store