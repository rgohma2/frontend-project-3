import React from 'react'

import { Form, Button, Label, Segment } from 'semantic-ui-react'

class LoginRegister extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			name: '',
			email: '',
			password: '',
			action: 'login'
		}
	}

	// componentDidMount() {
	// 	console.log(this.props.register);
	// }

	switchForm = () => {
		this.setState({
			action: this.state.action === 'sign up' ? 'login' : 'sign up'
		})
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.LoginRegister()
	}

	LoginRegister = () => {
		if (this.state.action === 'sign up') {
			this.props.register(this.state)
			this.setState({
				action: 'login'
			})
		} else {
			this.props.login(this.state)
			console.log('this is getting runnnn');
		}
	}


	render() {
		return(
			<div>
			<Segment>
			{
				this.state.action === 'login'
				?
				<h2>Login</h2>
				:
				<h2>Sign Up</h2>
			}
			<Form onSubmit={this.handleSubmit}>
				{
					this.state.action === 'sign up'
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
				<Button className='capitalize' type='submit'>{this.state.action}</Button>
			</Form>
				{
					this.state.action === 'sign up'
					?
					<small>already have an account? log in <span className='link' onClick={this.switchForm}>here</span>.</small>
					: 
					<small>don't have an account yet? sign up <span className='link' onClick={this.switchForm}>here</span>.</small>
				}
			</Segment>
			<Segment>
				<Button onClick={this.props.toggleLoginRender}>Back</Button>
			</Segment>
			</div>
		)
	}
}

export default LoginRegister
