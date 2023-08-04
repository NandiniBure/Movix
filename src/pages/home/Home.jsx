import './style.scss'
import HeroBanner from './Herobanner/HeroBanner'
import Trending from './trending/trending'
import Popular from './popular/Popular'
import TopRated from './topRating/TopRating'
const Home = () => {
  return (
    <div className='homepage'>
      <HeroBanner/>
      <Trending></Trending>
      <Popular></Popular>
      <TopRated></TopRated>
 
    </div>
  )
}

export default Home