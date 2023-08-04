import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import './style.scss'
import { useNavigate } from 'react-router-dom' 
import useFetch from '../../../hooks/useFetch'
import Img from '../../../Components/Lazyloadimage/Img'
import ContentWrapper from '../../../Components/contentwrapper/ContentWrapper'
const HeroBanner = () => {
const [background,setbackground]=useState("")
const [query,setQuery]=useState('')
const{data,loding}=useFetch("/movie/upcoming")

useEffect(()=>{
const bg=url.backdrop+
data?.results?.[Math.floor([Math.random()*20])]?.backdrop_path
setbackground(bg)
},[data])

const navigate=useNavigate()
const {url}=useSelector((state)=>state.home)
const searchQueryHandler=(event)=>{
 if(event.key==='Enter' && query.length >0){
    navigate(`/search/${query}`)

 }
}

  return (
    <div className='heroBanner'>
  { !loding &&  <div className='backdrop-img'>
        <Img src={background}/>
    </div>}
   
   <div className='opacity-layer'></div>

    <ContentWrapper>
  
            <div className='heroBannerContent'>
                <span className='title'>Welcome.</span>
                <span className='subTitle'>Millions of movies,TV shows and 
                people to discover Explore now.</span>
                <div className='searchInput'>
                    <input
                        type="text"
                        placeholder='search for a movie or tv show....'
                        onChange={(e)=>setQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                    />
                    <button>Search</button>
                </div>
            </div>
        
    </ContentWrapper>
    
    </div>
  )
}

export default HeroBanner