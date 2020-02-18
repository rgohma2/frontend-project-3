import React from 'react';
import './App.css';
import TipContainer from './TipContainer'
import LoginRegister from './LoginRegister'
class App extends React.Component {
  constructor() {

    super()

    this.state = {
      loggedIn: false,
      currentUserName: ''
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

    if (loginJson.status === 200) {
      this.setState({
        loggedIn: true,
        currentUserName: loginJson.data.name
      })
    }

  }catch(err){
    console.log(err)
  }
}

  render() {
    return(
      <div className="App">
        <h1>Tips App</h1>
        <TipContainer/>
        <LoginRegister
        register={this.register}
        login={this.login}
        />
      </div> 
    )
  }
}


export default App
