import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import { useEffect,useState } from "react";
const News = (props) => {
   const [articles,setArticles] = useState([])
   const [loading,setLoading] = useState(true)
   const[page,setPage] = useState(1)
   const[totalArticles,setTotalArticles] = useState(0)

  
  
const updateNews = async () => {
	props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63787b192d934d5882fdb17b7d438a93&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
	props.setProgress(30);
    let parsedData = await data.json();
	props.setProgress(50);
   setArticles( parsedData.articles)
   setTotalArticles(parsedData.totalResults)
   setLoading(false)
    
	props.setProgress(100);
  }

  useEffect(()=>{
    updateNews()
  },[])

  
  const handlenextClick = async () => {
    setPage(page+1)
    updateNews();
  };

  const handleprevClick = async () => {
    setPage(page-1)
   updateNews();
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=63787b192d934d5882fdb17b7d438a93&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    console.log(parsedData.totalResults);

    setArticles(articles.concat(parsedData.articles))
    setTotalArticles(parsedData.totalResults)
    setLoading(false)
	
  }
  
    return (
      <div className="container">
        <h1 className="text-center" style={{ margin: "35px 20px", marginTop:'90px' }}>
          NewsMonkey-Top Headlines
        </h1>

        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length<=totalArticles+1}
          loader={<Spinner/>}
        >
			<div className="container">
          <div className="row">
            {articles.map((ele) => {
              return (
                <div className="col-md-4" key={ele.url}>
                  <NewsItem
                    title={ele.title ? ele.title : " "}
                    description={
                      ele.description ? ele.description.slice(0, 88) : " "
                    }
                    imageUrl={ele.urlToImage}
                    newsUrl={ele.url}
                    author={ele.author}
                    date={ele.publishedAt}
                  />
                </div>
              );
            })}
          </div>
		  </div>
        </InfiniteScroll>
        
      </div>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
