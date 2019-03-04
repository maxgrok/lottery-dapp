import React, { Component } from 'react';
import './App.css';
import web3 from './Web3'
import lottery from './Lottery'; // can interact with the contract 

class App extends Component {
  state = {
    manager: "", 
    players: [],
    balance: "",
    value: ""
  }

  async componentDidMount(){ //called whenever app component shows up on the screen
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, players, balance});
  }
  
  onSubmit=(e)=>{ //no need to bind the function with this syntax
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>This is our Lottery contract</h2>
        <p> This contract is managed by: {this.state.manager}</p>
        <p>There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>
        <hr></hr>
      <form onSubmit={this.onSubmit}>
        <h4>Want to try your luck?</h4>
          <div> 
              <label>Amount of Ether to Enter: </label>
              <input onChange={(e)=>this.setState({value: e.target.value })} value={this.state.value} />
          </div>
          <button>Enter</button>
        </form>        
      </div>
    );
  }
}

export default App;
