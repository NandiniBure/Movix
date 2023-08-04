import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3"

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzk5MGIwNjUwMzNhYzAwMDBiYTlmNTkxMGE1Y2Q5ZSIsInN1YiI6IjY0Y2I0ODIyNGZkMTQxMDEyNzA5ODIwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I84rNMmVY0wyzq43Yc3d55cN9hO06fqPPE0AEtqeQlY"

const headers={
    Authorization:"bearer "+TMDB_TOKEN,
}

export const fetchDataFromApi=async(url,params)=>{
    try{
 const {data}=await axios.get(BASE_URL+url,{
    headers,
    params
 })
return data
    }catch(err){
   console.log(err)
   return err;
    }
}