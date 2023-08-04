import {useState} from 'react'
import ContentWrapper from '../../../Components/contentwrapper/ContentWrapper'
import SwitchTabs from '../../../Components/switchTabs/switchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../Components/crousal/Carousel'
const Trending = () => {
const [endpoint,setendpoint]=useState("day")

const {data,loding}=useFetch(`/trending/all/${endpoint}`)
 const onTabChange=(tab)=>{
     setendpoint(tab==="Day" ? "day" : "week")
  }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
        <span className='carouselTitle'>Trending</span>
      <SwitchTabs data={["Day","Week"]}
        onTabChange={onTabChange}
      />
        </ContentWrapper>
        <Carousel data={data?.results} loding={loding}/>
        </div>

  )
}

export default Trending