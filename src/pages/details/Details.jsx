import './style.scss'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Cast from './cast/Cast'
import DetailsBanner from './detailBanner/DetailsBanner'
import VideosSection from './VideoSection/VideoSection'
import Similar from './carousels/Similer'
import Recommendation from './carousels/Recomandation'
const Details = () => {
const {mediaType,id}=useParams()
const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
const {data:credits,loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]}
        crew={credits?.crew}/>
        <Cast data={credits?.cast} loading={creditsLoading}/>
        <VideosSection data={data} loading={loading}/>
        <Similar mediaType={mediaType} id={id} />
        <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details