import React from 'react'
import axios from 'axios'
import Movie from './Movie'

class ConnectMovie extends React.Component {
  
    constructor(props) {
		super(props);
		this.state = {
			movieData: {}
		};
	}
	componentDidMount() {
		const { id } = this.props.match.params;
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${id}?api_key=edd54c60e9af6804ba8982a623789a86&language=en-US&page=1`
			)
			.then(response => {
				this.setState({ movieData: response.data });
			});
	}
	render() {

		let movieData ;
		if ( (typeof this.state.movieData !== 'undefined') || !(this.state.movieData.isEmpty()) ) {
			movieData = <Movie movie={this.state.movieData} />

		} else {
			movieData = <div> Loading !</div>
		}
		return <div>{movieData}</div>
	}
}
export default ConnectMovie