import React from 'react'

import { Button, Card, Grid, Icon, Label, Message, Header, Segment} from 'semantic-ui-react'

class TipList extends React.Component{
	constructor() {

		super()

		this.state = {
			favorites: [],
			message: ''
		}
	}

	componentDidMount() {
		this.getFavorites()
	}

	resetMessage = () => {
		this.setState({
			message: ''
		})
	}

	getFavorites = async () => {
    	const url = process.env.REACT_APP_API_URL + '/api/v1/tips/favorites'
    	const response = await fetch(url, {
    		credentials: 'include',
	    	headers: {
	    		'Content-Type': 'application/json'
    		}
    	})
    	const favoritesJson = await response.json()
    	console.log(favoritesJson);

    	if (favoritesJson.status === 201) {
	    	this.setState({
	    		favorites: favoritesJson.data
	    	})
	    } 
	    this.resetMessage()
    }

     addFavorite = async (id) => {
    	const url = process.env.REACT_APP_API_URL + '/api/v1/tips/' + id
    	const response = await fetch(url, {
    		credentials: 'include',
 			method: 'POST',
	    	headers: {
	    		'Content-Type': 'application/json'
    		}
    	})
    	const newFavJson = await response.json()
    	console.log(newFavJson);

    	if (newFavJson.status === 200) {
	    	this.setState({
				favorites: [...this.state.favorites, newFavJson.data],
				message: newFavJson.message
			})
    	} else {
    		if (this.props.loggedIn === false) {
    			this.setState({
    				message: 'you must be logged in to favorite a tip!'
    			})
    		} else {
    			this.setState({
    				message:newFavJson.message
    			})
    		}
    	}
    }

	
	//** Top Tips ** based on votes (to be implemeted later)
	render() {
	console.log(this.state.favorites);
	const tips = this.props.tips.filter(tip => tip.category === this.props.category)

		return(
			<div>
				<Segment>
					<Header>{this.props.category}</Header>
				{
					this.state.message !== ''
					?
					<Message header={this.state.message} onDismiss={this.resetMessage}></Message>
					:
					null
				}
				</Segment>
			<Grid divided='vertically'>
				<Grid.Row columns={3}>
				{tips.map(tip => {
				const favorites = []
						this.state.favorites.forEach(fav => {
							if (fav.tip.id === tip.id) {
								favorites.push(tip)
							}
						})
					return <Grid.Column key={tip.id}><Card centered={true}>
						<Card.Header><h1>{tip.tip}</h1></Card.Header>
						<Card.Description>{tip.description}</Card.Description>
						        <Card.Content >
							      <Button color='red' onClick={() => this.addFavorite(tip.id)}>
							        <Icon name='heart' />
							        Favorites
							      </Button>
							      <Label as='a' basic color='red' pointing='left'>
							     	{favorites.length}
							      </Label>
							    </Card.Content>
						
							{	
								this.props.loggedIn === true && tip.creator.email === this.props.currentUserEmail
								?
								
								<Card.Content>
								<div className='ui two buttons'>
						        	<Button 
						        	onClick={() => this.props.editTip(tip.id)} 
						        	color='green'>
						        		Edit
						        	</Button>
						        	<Button
						        	onClick={() => this.props.deleteTip(tip.id)} 
						        	color='red'>
						        		Delete
						        	</Button>
						        </div>
						        </Card.Content>
						        :
						        null
							}
						
					</Card>
					</Grid.Column>
				})}
				</Grid.Row>
			</Grid>
			</div>
		)
	}
}

export default TipList