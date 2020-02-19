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
					
						{	
							props.loggedIn === true && tip.creator.email === props.currentUserEmail
							?
							
							<Card.Content>
							<div className='ui two buttons'>
					        	<Button 
					        	onClick={() => props.editTip(tip.id)} 
					        	color='basic green'>
					        		Edit
					        	</Button>
					        	<Button
					        	onClick={() => props.deleteTip(tip.id)} 
					        	color='basic red'>
					        		Delete
					        	</Button>
					        </div>
					        </Card.Content>
					        :
					        null
						}
					
				</Card>
			})}
		</div>
	)
}

export default TipList