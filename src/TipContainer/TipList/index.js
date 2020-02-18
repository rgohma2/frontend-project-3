import React from 'react'

function TipList(props){

	return(
		<div>
			<h2>TipList</h2>
			<ul>
				{props.tips.map(tip => {
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