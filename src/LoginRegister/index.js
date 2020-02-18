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
			<div>
			<h2 className='capitalize'>{this.state.action}</h2>
			<Form.Field>
			{
				this.state.action === 'register'
				?
				<div>
					<Label>Name</Label>
					<Form.Input 
					type='text'
					name='name'
					value={this.state.name}
					onChange={this.handleChange}
					/>
				</div>
				:
				null
			}
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
			</div>
		)
	}
}

export default LoginRegister
