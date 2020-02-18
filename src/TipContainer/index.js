import React from 'react'
import TipList from './TipList'

class TipContainer extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			tips: []
		}
	}

	componentDidMount() {
		this.fetchTips()
	}

	fetchTips = async () => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/tips/'
		try{
			const response = await fetch(url)
			const tipsJson = await response.json()
			console.log(tipsJson);

			this.setState({
				tips: tipsJson.data
			})
		}catch(err){
			console.log(err)
		}
	}

	render() {
		return(
			<div>
				<h1>TipContainer</h1>
				<TipList tips={this.state.tips}/>
			</div>
		)
	}
}

export default TipContainer