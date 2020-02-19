import React from 'react'
import TipList from './TipList'
import NewTipForm from './NewTipForm'

class TipContainer extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			tips: [],
			category: ''
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

	changeCategory = (category) => {
		this.setState({
			category: category
		})
	}

	addTip = async (newTipInfo) => {
		console.log(newTipInfo);
		const url = process.env.REACT_APP_API_URL + '/api/v1/tips/'
		try {
			const response = await fetch(url, {
				credentials: 'include',
     			method: 'POST',
		    	body: JSON.stringify(newTipInfo),
		    	headers: {
		    		'Content-Type': 'application/json'
        		}
			})
			const tipJson = await response.json()
			console.log(tipJson);
			this.setState({
				tips: [...this.state.tips, tipJson.data]
			})
		} catch(err) {
			console.log(err);
		}
	}

	render() {
		return(
			<div>
				<div>
					<h1 onClick={() => this.changeCategory('movies')}>Movies</h1>
					<h1 onClick={() => this.changeCategory('shows')}>Shows</h1>
					<h1 onClick={() => this.changeCategory('music')}>Music</h1>
					<h1 onClick={() => this.changeCategory('books')}>Books</h1>
				</div>
				<TipList 
				tips={this.state.tips}
				category={this.state.category}

				/>
				<NewTipForm 
				addTip={this.addTip}
				/>
			</div>
		)
	}
}

export default TipContainer