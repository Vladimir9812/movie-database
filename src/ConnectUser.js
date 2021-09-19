import React from 'react'

class ConnectUser extends React.Component {
  
    constructor(props) {
		super(props);
		this.state = {
			movieData: {}
		};
	}
	componentDidMount() {
        const { user } = this.props.match.params;
    }
    render() {
        return (
             <div>привет !!!</div>
        )
    }
}
export default ConnectUser
		