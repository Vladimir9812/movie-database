import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../images/movie_logo.jpg';


const MovieRow = props => {
    return (
        <div className = "movie" key = {props.movie.id} >
            <div className = "movie__img"><img alt = "poster" className = "poster" src = {props.movie.poster_src !== "https://image.tmdb.org/t/p/w185null" ? props.movie.poster_src : logo }/></div>
            <div className = "movie__content">
                <h2>{props.movie.title}</h2>
                {props.movie.overview.length>=240 && <p>{props.movie.overview.slice(0,props.movie.overview.indexOf(" ",230))}...</p>}
                {props.movie.overview.length<240 && <p>{props.movie.overview}</p>}
                <NavLink to = {'/movie/'+props.movie.id}><button className = "btn-movie">View</button></NavLink>
            </div>
        </div>
        
    )
}
export default MovieRow