import React from 'react';
import play from '../images/play.png';
import ModalVideo from 'react-modal-video';
import axios from 'axios';


class ModalTrailer extends React.Component {
 constructor(props) {
     super(props);
     this.state = {
        isOpen: false,
        videoID: ""
    }
    this.OpenModal = this.OpenModal.bind(this)
 }
 componentWillMount() {
    const id = this.props.modal;
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=edd54c60e9af6804ba8982a623789a86`;
    axios.get(url).then(response => {
        if (response.data.results.length !== 0)
        this.setState({ videoID: response.data.results[0].key });
    });
  }
 OpenModal() {
   this.setState({
       isOpen: true
   })
 }
 render() {
    return ( 
        <div className = "icon play">
            <div>
                <ModalVideo
                    channel = "youtube"
                    isOpen={this.state.isOpen}
                    videoId = {this.state.videoID}
                    onClose = {() => this.setState({isOpen:false})}
                />
            </div>
            { this.state.videoID !== "" &&
            <div className = "trailer" onClick = {this.OpenModal}>
                <div className = "icon__image" style = {{background:'url('+ play +') no-repeat center/cover'}}></div>
                <p>Play</p>
            </div>
            }
        </div>
    );
    }
}
export default ModalTrailer