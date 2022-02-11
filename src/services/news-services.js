import axios  from "axios";

export const fetchNews = async (page = 1) =>{
    const {data} = await axios.get(`https://api.hnpwa.com/v0/news/${page}.json`)
    return data
}