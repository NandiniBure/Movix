import {useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"
import {useDispatch, useSelector } from "react-redux";
import { getApiConfiguration,getGenres } from "./store/homeSlice";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './Components/header/Header'
import Footer from './Components/footer/Footer'
import Home from "./pages/home/Home";
import Details from './pages/details/Details'
import SearchResult from '././pages/searchresult/Searchreault'
import Explore from './pages/explore/Explore'
import Default from './pages/404/Default'

function App() {
const dispatch=useDispatch()
const {url}=useSelector((state)=> state.home)
useEffect(()=>{
fetchApiConfig();
genresCall()
},[])
console.log(url)
const fetchApiConfig=()=>{
  fetchDataFromApi('/configuration')
  .then((res)=>{
    console.log(res)
    const url={
      backdrop:res.images.secure_base_url+"original",
      poster:res.images.secure_base_url+"original",
      profile:res.images.secure_base_url+"original"
    }
    dispatch(getApiConfiguration(url))
  })
}

const genresCall=async()=>{
  let Promises=[]
  let endpoint=["tv",'movie']
  let allGenres={}

  endpoint.forEach((url)=>{
    Promises.push(fetchDataFromApi(`/genre/${url}/list`))
  })

  const data=await Promise.all(Promises)

  data.map(({genres})=>{
    return genres.map((item)=>(allGenres[item.id]=item))
  })

  dispatch(getGenres(allGenres))
}

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:mediaType/:id' element={<Details/>}/>
        <Route path='/search/:query' element={<SearchResult/>}/>
        <Route path='/explore/:mediaType' element={<Explore/>}/>
        <Route path='*' element={<Default/>}/>

      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
