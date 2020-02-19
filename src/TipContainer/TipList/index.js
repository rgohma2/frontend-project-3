import React from 'react'

import { Button, Card } from 'semantic-ui-react'

function TipList(props){

	
	//** Top Tips ** based on votes (to be implemeted later)
	const tips = props.tips.filter(tip => tip.category === props.category)
	return(
		<div>
			{tips.map(tip => {
				return <Card centered={true} key={tip.id}>
					<Card.Header><h1>{tip.tip}</h1></Card.Header>
					<Card.Description>{tip.description}</Card.Description>
					<Card.Content>
						{	
							props.loggedIn === true && tip.creator.email === props.currentUserEmail
							?
							<div className='ui two buttons'>
					        	<Button 
					        	onClick={() => props.editTip(tip.id)} 
					        	color='green'>
					        		Edit
					        	</Button>
					        	<Button
					        	onClick={() => props.deleteTip(tip.id)} 
					        	color='red'>
					        		Delete
					        	</Button>
					        </div>
					        :
					        null
						}
					</Card.Content>
				</Card>
			})}
		</div>
	)
}

export default TipList