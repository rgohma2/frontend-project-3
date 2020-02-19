import React from 'react'
import TipList from './TipList'
import NewTipForm from './NewTipForm'
import EditTipModal from './EditTipModal'

import {Header, Sidebar, Menu, Segment} from 'semantic-ui-react'

class TipContainer extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			tips: [],
			category: '',
			visible: false,
			idOfTipToEdit: -1
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

	deleteTip = async (id) => {
		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/tips/' + id
			const response = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})

			const deleteJson = await response.json()
			console.log(deleteJson);
			if (deleteJson.status === 200){
				this.setState({
					tips: this.state.tips.filter(tip => tip.id !== id)
				})
			}

		}catch(err){
			console.log(err)
		}
	}

	editTip = (id) => {
		const tipToEdit = this.state.tips.find(tip => tip.id === id)
		console.log(tipToEdit);
		this.setState({
			idOfTipToEdit: tipToEdit.id
		})
	}

	closeModal = () => {
		this.setState({
			idOfTipToEdit: -1
		})
	}

	updateTip = async (updateInfo) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/tips/' + this.state.idOfTipToEdit
		const response = await fetch(url, {
			credentials: 'include',
 			method: 'PUT',
	    	body: JSON.stringify(updateInfo),
	    	headers: {
	    		'Content-Type': 'application/json'
    		}
    	})
    		const updateJson = await response.json()
    		console.log(updateJson);

    		if (updateJson.status === 200) {
    			const tips = this.state.tips
    			const index = tips.findById(tip => tip.id === this.state.idOfTipToEdit)
    			tips[index] = updateJson.data 
    			this.setState({
    				tips: tips
    			})
    		}
    }

	render() {
		return(
			<div>
				<Sidebar.Pushable as={Segment}>
			    <Sidebar
			      as={Menu}
			      animation='overlay'
			      icon='labeled'
			      inverted
			      
			      vertical
			      visible={this.state.visible}
			      width='thin'
			    >
			      <Menu.Item as='a' onClick={() => this.changeCategory('movies')}>
			        Movies
			      </Menu.Item>
			      <Menu.Item as='a'onClick={() => this.changeCategory('shows')}>
			        Shows
			      </Menu.Item>
			      <Menu.Item as='a' onClick={() => this.changeCategory('music')}>
			        Music
			      </Menu.Item>
			      <Menu.Item as='a' onClick={() => this.changeCategory('books')}>
			        Books
			      </Menu.Item>
			    </Sidebar>

			    <Sidebar.Pusher>
			      <Segment basic>
			        <Header as='h3' onClick={() => 
			        	this.state.visible === true
			        	?
			        	this.setState({visible:false})
			        	:
			        	this.setState({visible:true})
			        }>Application Content</Header>
			        <TipList 
			        loggedIn={this.props.loggedIn}
			        currentUserEmail={this.props.currentUserEmail}
					tips={this.state.tips}
					category={this.state.category}
					deleteTip={this.deleteTip}
					editTip={this.editTip}
					/>
					<NewTipForm 
					addTip={this.addTip}
					/>
					{
						this.state.idOfTipToEdit !== -1
						?
						<EditTipModal
						tipToEdit={this.state.tips.find(tip => tip.id === this.state.idOfTipToEdit)}
						updateTip={this.updateTip}
						closeModal={this.closeModal}
						/>
						:
						null
					}
			      </Segment>
			    </Sidebar.Pusher>
			  </Sidebar.Pushable>	
			</div>
		)
	}
}

export default TipContainer