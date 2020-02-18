import React from 'react'

function TipList(props){

	
	
	const tips = props.tips.filter(tip => tip.category === props.category)
	console.log(tips);
	return(
		<div>
			<ul>
			{tips.map(tip => {
				return <li key={tip.id}>
					Category: {tip.category}
					<br />
					{tip.tip}
					<br />
					{tip.description}
				</li>
			})}
			</ul>
		</div>
	)

}

export default TipList