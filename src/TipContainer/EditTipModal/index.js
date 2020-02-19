import React from 'react'
import { Modal, Form, Button, Label } from 'semantic-ui-react'

class EditTipModal extends React.Component {
	constructor(props) {

		super(props)

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

	componentDidMount() {
		this.setState(this.props.tipToEdit)
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.updateTip({
			category: this.state.category,
			tip: this.state.tip,
			description: this.state.description
		})
	}





	render() {
		return(
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
				<Modal.Header>Edit Tip</Modal.Header>
					<Modal.Content>
						<Form onSubmit={this.handleSubmit}>
						<Label>Category</Label>
						<Form.Select
						placeholder='Example: Movies'
						value={this.state.category}
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
						<Button>Update Tip</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default EditTipModal