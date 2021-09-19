import React from 'react';
import {Route,Switch,withRouter} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieRow from './components/MovieRow';
import $ from 'jquery';
import LoginForm from './components/LoginForm';
import RegistrForm from './components/RegistrForm';
import ConnectMovie from './components/ConnectMovie';
import 'react-modal-video/css/modal-video.min.css';
import four_zero_four from './images/404.png';
import not from './images/not_found.png';
import fire from './config/fire'


class App extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
       email: ""
     }
     this.performSearch("avengers")
  }
  componentDidUpdate() {
    document.body.style.background = '#fff'
}
  searchChangeHandler(event) {
    const searchTerm = event.target.value
    const boundObject = this
    boundObject.performSearch(searchTerm)
  }
  
  performSearch(searchTerm) {
    const UrlString = "https://api.themoviedb.org/3/search/movie?&api_key=edd54c60e9af6804ba8982a623789a86&query="+searchTerm
    $.ajax({
        url: UrlString,
        success: (SearchResults) => {
          console.log("Fetched data successfully")
          const results = SearchResults.results

          const movieRows = []

          results.forEach(movie => {
            movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
            const movieRow = <MovieRow key = {movie.id} movie = {movie}/>
            movieRows.push(movieRow)
          })
          if (movieRows.length !== 0 ) this.setState({rows: movieRows});
          else this.setState({rows: false});
        },
        error: () => {
          console.error("Failed to fetch data")
        }
    })
  }
  // Авторизация
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.setState({email: user.email.slice(0,1)})
      } else {
        this.setState({user: null});
      }
    })
  }
  componentDidMount(){
    this.authListener();
  }
  // конец авторизации

  render() {
    let result,url,us;
    let history = this.props.history.location.pathname;
    history !== "/" ?  url = false : url = true

    if (this.state.user === null) us = false;
    else us = true;
    
    if (this.state.rows === false) result = 
      <div className = "not__found">
        <img alt = "not" src = {not}></img>
        <p>Nothing was found for your request</p>
    </div>
    else result = this.state.rows

    return (
      <div className = "main__block">
        <Header searchChange = {this.searchChangeHandler.bind(this)} url = {url} user = {us} email = {this.state.email}/>
        <Switch>
          <Route path = "/" exact render={()=> 
              <div className = "contain">
                <div className = "movies">
                    {result}
                </div>
              </div> }/>
            <Route path = "/login" exact component = {LoginForm}/>
            <Route path = "/registration" exact component = {RegistrForm} />
            <Route path = "/movie/:id"  exact component = {ConnectMovie} />
            <Route path = "*" render = {() => 
              <div className = "error">
                <img alt = "not" src = {four_zero_four}></img>
                <p>Oops...there is no such page</p>
              </div>} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}
export default withRouter(App);