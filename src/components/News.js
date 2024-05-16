import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  
  constructor() {
    super();
    console.log("hello i am constructor");
    this.state = {
		articles : [],
		loading:false,
		page: 1,
		totalArticles: 0
	};
  }

  async componentDidMount(){
	let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=63787b192d934d5882fdb17b7d438a93&page=1&pageSize=20";
	let data = await fetch(url);
	let parsedData = await data.json()
	console.log(parsedData)
	console.log(parsedData.totalResults)
	this.setState({articles: parsedData.articles,totalArticles:parsedData.totalResults})
  }
  handlenextClick = async () =>{
	let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=63787b192d934d5882fdb17b7d438a93&page=${this.state.page + 1}&pageSize=20`;
	let data = await fetch(url);
	let parsedData = await data.json()
	console.log(parsedData)

	this.setState({
		articles: parsedData.articles,
		page: this.state.page + 1,
	})
  }

  handleprevClick = async () => {
	let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=63787b192d934d5882fdb17b7d438a93&page=${this.state.page - 1}&pageSize=20`;
	let data = await fetch(url);
	let parsedData = await data.json()
	console.log(parsedData)

	this.setState({
		articles: parsedData.articles,
		page: this.state.page - 1,
	})
  }
  render() {
    return (
      <div className="container">
        <h2>NewsMonkey-Top Headlines</h2>
        <div className="row">
		{this.state.articles.map((ele) => {
			return <div className="col-md-4" key = {ele.url}>
            <NewsItem
				
              title={ele.title? ele.title : " "}
              description={ele.description? ele.description.slice(0,88): " "}
              imageUrl= {ele.urlToImage}
			  newsUrl = {ele.url}
            />
          </div>
		  
		})}
          
        </div>
		<div className="container d-flex justify-content-between">
		<button disabled={this.state.page<=1} type="button" class="btn btn-dark "onClick={this.handleprevClick}>&larr; prev</button>
		<button disabled={Math.ceil(this.state.totalArticles/20)<this.state.page+1} type="button" class="btn btn-dark" onClick={this.handlenextClick}>next &rarr;</button>
		</div>
      </div>
    );
  }
}

export default News;
