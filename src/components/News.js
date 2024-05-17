import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
	country: 'in',
	pageSize: 8,
	category: 'general'
  }
  static propTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
	category: PropTypes.string

  }
  constructor() {
    super();
    console.log("hello i am constructor");
    this.state = {
		articles : [],
		loading:true,
		page: 1,
		totalArticles: 0
	};
  }

  async componentDidMount(){
	let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63787b192d934d5882fdb17b7d438a93&page=1&pageSize=${this.props.pageSize}`;
	this.setState({loading:true})
	let data = await fetch(url);
	let parsedData = await data.json()
	console.log(parsedData)
	console.log(parsedData.totalResults)
	this.setState({articles: parsedData.articles,totalArticles:parsedData.totalResults,loading:false})
  }
  handlenextClick = async () =>{
	let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63787b192d934d5882fdb17b7d438a93&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
	this.setState({loading:true})
	let data = await fetch(url);
	let parsedData = await data.json()
	console.log(parsedData)

	this.setState({
		articles: parsedData.articles,
		page: this.state.page + 1,
		loading:false
	})
  }

  handleprevClick = async () => {
	let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63787b192d934d5882fdb17b7d438a93&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
	this.setState({loading:true})
	let data = await fetch(url);
	let parsedData = await data.json()
	console.log(parsedData)

	this.setState({
		articles: parsedData.articles,
		page: this.state.page - 1,
		loading: false
	})
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center" style={{margin:"35px 20px"}}>NewsMonkey-Top Headlines</h1>

		{this.state.loading && <Spinner/> }
        <div className="row">
		{!this.state.loading && this.state.articles.map((ele) => {
			return <div className="col-md-4" key = {ele.url}>
            <NewsItem
				
              title={ele.title? ele.title : " "}
              description={ele.description? ele.description.slice(0,88): " "}
              imageUrl= {ele.urlToImage}
			  newsUrl = {ele.url}
			  author = {ele.author}
			  date = {ele.publishedAt}
            />
          </div>
		  
		})}
          
        </div>
		<div className="container d-flex justify-content-between">
		<button disabled={this.state.page<=1} type="button" class="btn btn-dark "onClick={this.handleprevClick}>&larr; prev</button>
		<button disabled={Math.ceil(this.state.totalArticles/this.props.pageSize)<this.state.page+1} type="button" class="btn btn-dark" onClick={this.handlenextClick}>next &rarr;</button>
		</div>
      </div>
    );
  }
}

export default News;
