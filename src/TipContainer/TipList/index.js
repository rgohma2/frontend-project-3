import React from 'react'

import { Button, Card, Grid, Icon, Label} from 'semantic-ui-react'

class TipList extends React.Component{
	constructor() {

		super()

		this.state = {
			likes: 0
		}
	}

	addLike = () => {
		let likes = this.state.likes
		likes++
		this.setState({
			likes: likes
		})
	}

	
	//** Top Tips ** based on votes (to be implemeted later)
	render() {
	const tips = this.props.tips.filter(tip => tip.category === this.props.category)
		return(
			<Grid divided='vertically'>
				<Grid.Row columns={3}>
				{tips.map(tip => {
					return <Grid.Column key={tip.id}><Card centered={true}>
						<Card.Header><h1>{tip.tip}</h1></Card.Header>
						<Card.Description>{tip.description}</Card.Description>
						        <Card.Content >
							      <Button color='red' onClick={this.addLike}>
							        <Icon name='heart' />
							        Favorites
							      </Button>
							      <Label as='a' basic color='red' pointing='left'>
							        {this.state.likes}
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
		)
	}
}

export default TipList