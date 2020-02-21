import React from 'react';
import './App.css';
import TipContainer from './TipContainer'
import LoginRegister from './LoginRegister'
class App extends React.Component {
  constructor() {

    super()

    this.state = {
      loggedIn: false,
      renderLogin: false,
      currentUserName: '',
      currentUserEmail: '',
      message: '',
      status: 'red'
    }
  }

register = async (registerInfo) => {
  console.log(registerInfo);
  const url = process.env.REACT_APP_API_URL + '/api/v1/users/register'
  try {

    const response = await fetch(url, {
      credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
    })

    const registerJson = await response.json()
    console.log(registerJson);
    console.log(registerJson.message);
 
    if (registerJson.status === 201) {
      this.setState({
        status: 'green'
      })
    } 

    this.setState({
      message: registerJson.message,
    })
  
  }catch(err){
    console.log(err);
  }
}

toggleLoginRender = () => {
  this.setState({renderLogin: this.state.renderLogin === false ? true : false})
}


login = async (loginInfo) => {
  console.log(loginInfo);
  const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'

  try{

    const response = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
          'Content-Type': 'application/json'
        }
    })
    const loginJson = await response.json()
    console.log(loginJson.message);


    if (loginJson.status === 200) {
      this.setState({
        renderLogin: false,
        loggedIn: true,
        currentUserName: loginJson.data.name,
        currentUserEmail: loginJson.data.email,
        message: loginJson.message,
        status: 'green'
      })
    } else {
      this.setState({
        message: loginJson.message
      })
    }

  }catch(err){
    console.log(err)
  }
}

logout = async () => {
  const url = process.env.REACT_APP_API_URL + '/api/v1/users/logout'
  try{
    const response = await fetch(url)
    const logoutJson = await response.json()
    console.log(logoutJson);

    if (logoutJson.status === 200) {
      this.setState({
        loggedIn: false,
        renderLogin: false,
        registered: false,
        message: logoutJson.message,
        status: 'green'
      })
    } else {
      this.setState({
        message: logoutJson.message,
        status: 'red'
      })
    }
  }catch(err){
    console.log(err)
  }
}

  render() {
    return(
      <div className="App">
        <h1>Tipped Off</h1>
        {
          this.state.renderLogin === false
          ?
          <TipContainer
          className='main'
          loggedIn={this.state.loggedIn}
          currentUserEmail={this.state.currentUserEmail}
          toggleLoginRender={this.toggleLoginRender}
          logout={this.logout}
          />
          :
          <div className='login-container'>
            <div>
            <LoginRegister
            toggleLoginRender={this.toggleLoginRender}
            register={this.register}
            login={this.login}
            message={this.state.message}
            status={this.state.status}
            />
            </div>
          </div>
        }
      </div> 
    )
  }
}


export default App
