import React from 'react';
import './App.css';
import TipContainer from './TipContainer'
import LoginRegister from './LoginRegister'
class App extends React.Component {
  constructor() {

    super()

    this.state = {
      loggedIn: false
    }
  }

  render() {
    return(
      <div className="App">
        <h1>Tips App</h1>
        <TipContainer/>
        <LoginRegister/>
      </div> 
    )
  }
}


export default App
