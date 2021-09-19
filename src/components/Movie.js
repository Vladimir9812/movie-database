import React from 'react';
import star from '../images/star.png';
import heart from '../images/heart.png';
import ModalTrailer from './ModalTrailer';
import logo from '../images/movie_logo.jpg';

export default class Movie extends React.Component {
    render() {
        let {
			poster_path,
			original_title,
			vote_average,
			vote_count,
			tagline,
			overview,
			release_date,
			budget,
			revenue,
            runtime,
            backdrop_path
        } = this.props.movie;
        
        let modalTrailer;
        if (typeof this.props.movie.id !== 'undefined') modalTrailer = <ModalTrailer modal = {this.props.movie.id} />
        else modalTrailer = <div>Loading!!!</div>

        let poster;
        poster_path !== null ? poster = 'https://image.tmdb.org/t/p/w500' + poster_path :
                               poster = logo

        return (
            <div className = "detail_movie" style = {{background:`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://image.tmdb.org/t/p/original`+ backdrop_path + `) no-repeat center/cover`}}>
                <div className = "contain">
                    <div className = "detail_movie__card">
                        <div className = "movie__card__image">
                            <img alt = "poster" src = {poster}></img>
                        </div>
                        <div className = "movie__card__content">
                            <h2>{original_title}</h2>
                            <div className = "movie__card__icons">
                                <div className = "icon">
                                    <div className = "icon__image" style = {{background:'url('+ star +') no-repeat center/cover'}}></div>
                                    <p>{vote_average}</p>
                                </div>
                                <div className = "icon icon--margin">
                                    <div className = "icon__image heart" style = {{background:'url('+ heart +') no-repeat center/cover'}}></div>
                                    <p>{vote_count}</p>
                                </div>
                                 {modalTrailer}
                            </div>
                            <div className = "movie__overview">
                                <h3>{tagline}</h3>
                                <p>{overview}</p>
                            </div>
                            <div className = "movie__details">
                                <div className = "details__item">
                                    <h3>Realease Date:</h3>
                                    <p>{release_date}</p>
                                </div>
                                <div className = "details__item">
                                    <h3>Running Time:</h3>
                                    <p>{runtime + " mins"}</p>
                                </div>
                                <div className = "details__item">
                                    <h3>Budget:</h3>
                                    <p>{"$" + (parseInt(budget/1000000)) + " mln"}</p>
                                </div>
                                <div className = "details__item">
                                    <h3>Revenue:</h3>
                                    <p>{"$" + (parseInt(revenue/1000000)) + " mln"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}