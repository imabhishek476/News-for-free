// import React, { Component } from 'react'
import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)



    const capitalizeFirstLetter=(string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  const updateNews = async()=>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles( parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `News for free - ${props.category==="general"?"News Monkey Get Daily News":capitalizeFirstLetter(props.category)}`
    updateNews();
    // eslint-disable-next-line
  }, [])



  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };


    return (
      <>
        <div className="container my-2">
            <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>Top {props.category==="general"?"":capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner/>}

            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length!==totalResults}
              loader={<Spinner/>}
            >
              <div className="container">
                <div className="row">
                  {articles.map((element)=>{
                    return <div className="col mod-3" style={{display: 'flex',justifyContent: 'center'}} key={element.url}>
                              <NewsItem  title={element.title} description={element.description?element.description.slice(0,88):""} imgurl={element.urlToImage} newsUrl={element.url} credit={element.author?element.author:"Unknown"} channel={element.source.name} date={element.publishedAt}/>
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