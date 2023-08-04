import {useState} from 'react'
import ContentWrapper from '../../../Components/contentwrapper/ContentWrapper'
import SwitchTabs from '../../../Components/switchTabs/switchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../Components/crousal/Carousel'
const Popular = () => {
const [endpoint,setendpoint]=useState("movie")

const {data,loding}=useFetch(`/${endpoint}/popular`)
 const onTabChange=(tab)=>{
     setendpoint(tab==="Movies" ? "movie" : "tv")
  }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
        <span className='carouselTitle'>Whats Popular</span>
      <SwitchTabs data={["Movies","Tv Shows"]}
        onTabChange={onTabChange}
      />
        </ContentWrapper>
        <Carousel data={data?.results}
         loding={loding}
            endpoint={endpoint}
         />
        </div>

  )
}

export default Popular;