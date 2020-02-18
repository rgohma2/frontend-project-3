import React from 'react'

import {Form, Label, Button, Segment} from 'semantic-ui-react'

class NewTipForm extends React.Component {
	constructor() {

		super()

		this.state = {
			category: '',
			tip: '',
			description: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	render() {
	const categories = 
	[
		{key: 1, text: 'Movies', value: 'movies'},
		{key: 2, text: 'Shows', value: 'shows'},
		{key: 3, text: 'Music', value: 'music'},
		{key: 4, text: 'Books', value: 'books'}
	]
		return(
			<Segment>
				<Form>
					<Label>Category</Label>
					<Form.Select
					placeholder='Select a Category'
					fluid
					name='category'
					options={categories}
					/>
					<Label>Tip</Label>
					<Form.Input
					type='text'
					name='tip'
					value={this.state.tip}
					onChange={this.handleChange}
					/>
					<Label>Description</Label>
					<Form.Input
					type='text'
					name='description'
					value={this.state.description}
					onChange={this.handleChange}
					/>
					<Button>Create New Tip</Button>
				</Form>
			</Segment>
		)
	}
}

export default NewTipForm