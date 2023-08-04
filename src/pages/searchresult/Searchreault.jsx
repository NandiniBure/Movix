import{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../Components/contentwrapper/ContentWrapper";
import MovieCard from "../../Components/MovieCart/MovieCart";
import Spinner from "../../Components/Spinner/Spinner";
// import noResults from "../../assets/no-results.png";


const SearchResult = () => {
  const [data,setData]=useState(null)
  const [pageNum,setPageNum]=useState(1)
  const [loding,setloding]=useState(false)
  const {query}=useParams();

// console.log(query)

  const fethInitialData=()=>{
    setloding(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res)=>{
      console.log(res)
      setData(res)
      setPageNum((prev)=>prev+1)
      setloding(false)
    })
  }



  const fetchNextPageData=()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      if(data?.results) {
        
        setData({
          ...data,
          results:[...data?.results,...res.results],
        });
      }else{
        setData(res)
      }
      setPageNum((prev)=>prev+1)
    })
  }

  useEffect(()=>{
  setPageNum(1)
 fethInitialData()
  },[query])
  return (
    <div className="searchResultsPage">
     {loding && <Spinner initial={true}/>}
     {!loding && (
      <ContentWrapper>
          {data?.results?.length>0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results >1 ?
                "results" :"result"} of ${query}`}
              </div>
              <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum<= data?.total_pages}
              loader={<Spinner/>}
              >
                {data?.results.map((item,index)=>{
                  if(item.media_type=== "person"){
                    return
                  }
                  return(
                    <MovieCard key={index}
                      data={item}
                      fromSearch={true}
                    />
                  )
                })}
              </InfiniteScroll>
            </>
          )
          : (
            <span className="resultNotFound">
              Sorry,Results Not Found
            </span>
          )}
      </ContentWrapper>
     )}
    </div>
  )
}

export default SearchResult