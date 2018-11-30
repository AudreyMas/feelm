import React from "react";
import "./index.css";
import Gif from "./giffy.gif";
import ListFilm from "../List-film/index"
import {withRouter} from "react-router"

let count = 1;
class Layout extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      loadingState: false,
      movieList:[],
      currentPage: 1
    };
  }

  componentDidMount() {
    this.loadAPI()
    console.log(this.props.location)
}


componentDidUpdate(prevProps, prevState){
  console.log(prevProps.apiType,this.props.apiType)
  if(prevState.currentPage  !== this.state.currentPage || prevProps.apiType  !== this.props.apiType ){
    this.loadAPI()
  }
}


  loadAPI() {
    let table = this.state.movieList;
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b53ba6ff46235039543d199b7fdebd90&language=en-US&with_genres=${this.props.location.pathname.substring(6, 7)}&sort_by=${this.props.apiType}.desc`)
        .then(response  =>  response.json())
        .then(data  => { 
          table.push(...data.results)
        this.setState({
          movieList: table,
          loadingState: false
        });
    });
  }

  handleScroll(ev){
    const elem = ev.target;
      if (elem.scrollTop + elem.clientHeight >= elem.scrollHeight){
        this.loadMoreItems();
      }
  }

  loadMoreItems() {
    console.log('more')
      this.setState({ loadingState: true });
      setTimeout(() => {
        count++
        this.setState({
          currentPage : count
        })
      }, 1000); 
  }

  render() {
    const movieList = this.state.movieList.map((elem, index) => (

      <li key={index}><img src={`https://image.tmdb.org/t/p/w200_and_h300_bestv2${elem.poster_path}`} alt=""/></li>

    ))
    
    return (
      <div className="list-container" >
        <ul className="scoll-list" onScroll={(ev) => this.handleScroll(ev)}>
        {movieList}
        </ul>

        {this.state.loadingState ? <img className="chargement" src={Gif}></img> : ""}
        

      </div>
    );
  }
}

export default withRouter(Layout);