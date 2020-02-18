import React from 'react'

import { Form, Button, Label } from 'semantic-ui-react'

class LoginRegister extends React.Component {
	constructor() {

		super()

		this.state = {
			name: '',
			email: '',
			password: '',
			action: 'login'
		}
	}

	switchForm = () => {
		this.setState({
			action: this.state.action === 'register' ? 'login' : 'register'
		})
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	render() {
		return(
			<Form.Field>
				<Label>Name</Label>
				<Form.Input 
				type='text'
				name='name'
				value={this.state.name}
				onChange={this.handleChange}
				/>
				<Label>Email</Label>
				<Form.Input 
				type='text'
				name='email'
				value={this.state.email}
				onChange={this.handleChange}
				/>
				<Label>Password</Label>
				<Form.Input 
				type='password'
				name='password'
				value={this.state.password}
				onChange={this.handleChange}
				/>
				<Button type='submit'>Login</Button>
			</Form.Field>
		)
	}
}

export default LoginRegister
