import React from 'react'

function TipList(props){

	
	//** Top Tips ** based on votes (to be implemeted later)
	const tips = props.tips.filter(tip => tip.category === props.category)
	console.log(tips);
	return(
		<div>
			<ul>
			{tips.map(tip => {
				return <li key={tip.id}>
					Tip: {tip.tip}
					<br />
					{tip.description}
				</li>
			})}
			</ul>
		</div>
	)

}

export default TipList