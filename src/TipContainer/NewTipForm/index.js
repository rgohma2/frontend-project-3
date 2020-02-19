import React from 'react'

import {Form, Label, Button, Modal} from 'semantic-ui-react'

class NewTipForm extends React.Component {
	constructor() {

		super()

		this.state = {
			category: '',
			tip: '',
			description: '',
			options: this.getOptions()
		}
	}

	getOptions = () => {
		return(
	[
		{key: 1, text: 'Movies', value: 'movies'},
		{key: 2, text: 'Shows', value: 'shows'},
		{key: 3, text: 'Music', value: 'music'},
		{key: 4, text: 'Books', value: 'books'}
	]
	)}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.addTip({
			category: this.state.category,
			tip: this.state.tip,
			description: this.state.description
		})
		this.setState({
			category: '',
			tip: '',
			description: ''
		})
		this.props.toggleNewModal()
	}



	render() {
	
		return(
			<Modal open={true} closeIcon={true} onClose={this.props.toggleNewModal}>
				<Modal.Header>Add A Tip</Modal.Header>
				<Modal.Content>
					<Form onSubmit={this.handleSubmit}>
						<Label>Category</Label>
						<Form.Select
						placeholder='Example: Movies'
						fluid
						name='category'
						options={this.state.options}
						onChange={(e, { value }) => this.setState({
							category: value
						})}	
						/>
						<Label>Tip</Label>
						<Form.Input
						type='text'
						name='tip'
						placeholder='Example: Intersteller'
						value={this.state.tip}
						onChange={this.handleChange}
						/>
						<Label>Description</Label>
						<Form.Input
						type='text'
						name='description'
						placeholder='Example: What makes this movie great is...'
						value={this.state.description}
						onChange={this.handleChange}
						/>
						<Button>Create New Tip</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default NewTipForm