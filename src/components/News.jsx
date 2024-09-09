import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const { setProgress, country, category, apiKey, pageSize, setArticles, articles} = props;
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter=(string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  const updateNews = async()=>{
    try {
      setProgress(10);
      
      let url = window.location.pathname === "/search" && localStorage.getItem("search")?
        `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&text=${localStorage.getItem("search")}&source-countries=${country}&number=${pageSize}&offset=${pageSize*(page)}`    
      : `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&text=india%20${category}%20news&source-countries=${country}&number=${pageSize}&offset=${pageSize*(page)}`;

      setLoading(true)
      setProgress(20);
      let data = await fetch(url);
      setProgress(50);
      let parsedData = await data.json();
      setProgress(70);
      setArticles(parsedData.news)
      setTotalResults(parsedData.available)
      setLoading(false)

      setProgress(100);
      
    } catch (error) {
      console("failed to fetch ",error)
      alert(error.message)
    }
    
  }

  useEffect(() => {
    document.title = `News for free - ${category==="general"?"News Monkey Get Daily News":capitalizeFirstLetter(category)}`
    updateNews();
  }, [])


  const fetchMoreData = async() => {
    try{
      let url = window.location.pathname === "/search" && localStorage.getItem("search")?
        `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&text=${localStorage.getItem("search")}&source-countries=${country}&number=${pageSize}&offset=${pageSize*(page-1)}`      
      : `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&text=india%20${category}%20news&source-countries=${country}&number=${pageSize}&offset=${pageSize*(page-1)}`;
      
      setPage(page+1);
      setLoading(true);

      let data = await fetch(url);
      let parsedData = await data.json();

      if(!parsedData?.news){
        const message = parsedData?.message
        alert(message)
      }
  
      setArticles(articles?.concat(parsedData.news))
      setTotalResults( parsedData.available)
      setLoading(false)
    }catch(error){
      console("failed to fetch ",error)
      alert(error.message)
    }
  };

  const SourceName = (url)=>{
    const urlObj = new URL(url);
    return urlObj.hostname
  }

    return (
      <>
        <div className="container my-2">
            <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>Top {category==="general"?"":capitalizeFirstLetter(category)} News Headlines</h1>
            {loading && <Spinner/>}

            <InfiniteScroll
              dataLength={articles?.length}
              next={fetchMoreData}
              hasMore={articles?.length!==totalResults}
              loader={<Spinner/>}
            >
              <div className="container">
                <div className="row">
                  {articles?.length > 0 && articles?.map((element)=>{
                    const{title, url, author, text, image, publish_date} = element;
                    return <div className="col mod-3" style={{display: 'flex',justifyContent: 'center'}} key={url}>
                              <NewsItem  title={title || "News Title"} description={(text) ?(text).slice(0,88):"News Description"} imgurl={image || "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"} newsUrl={url} credit={author?author:"Unknown"} channel={SourceName(url) || "WorldNews"} date={publish_date}/>
                          </div>
                  })}
                </div>
              </div>
            </InfiniteScroll>
        </div>
      </>
    )
}


News.defaultProps={
  country: 'in',
  pageSize: 8,
  category: "general",
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
