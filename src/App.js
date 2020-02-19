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
      currentUserEmail: ''
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
  
  }catch(err){
    console.log(err);
  }
}

showLogin = () => {
  this.setState({
    renderLogin: true
  })
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
    console.log(loginJson);

    if (loginJson.status === 200) {
      this.setState({
        renderLogin: false,
        loggedIn: true,
        currentUserName: loginJson.data.name,
        currentUserEmail: loginJson.data.email
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
        renderLogin: false
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
          showLogin={this.showLogin}
          logout={this.logout}
          />
          :
          <div className='login-container'>
            <div>
            <LoginRegister
            register={this.register}
            login={this.login}
            />
            </div>
          </div>
        }
      </div> 
    )
  }
}


export default App
