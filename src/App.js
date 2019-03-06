import React, { Component } from 'react';
import './App.css';
import web3 from './Web3'
import lottery from './Lottery'; // can interact with the contract 

class App extends Component {
  state = {
    manager: "", 
    players: [],
    balance: "",
    value: "0.00",
    message: ""
  }

  async componentDidMount(){ //called whenever app component shows up on the screen
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, players, balance});
  }
  
   onSubmit= async (e)=>{ //no need to bind the function with this syntax
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'})

    await lottery.methods.enter().send({ //will take 15-30 seconds to execute
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: "You have been entered!"})
  }

  onClick = async ()=>{
    const accounts = await web3.eth.getAccounts();
    
    this.setState({message: "Waiting on transaction success..."})

    await lottery.methods.pickWinner().send({ from: accounts[0] }); // will take 15-30 second to execute, no return value from send function

    this.setState({message: "A winner has been picked!"})
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui segment">
        <h2>Welcome to the Lottery!</h2>
        <p> This contract is managed by: {this.state.manager}</p>
        <p>There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>
        </div>
    <div className="ui segment">
      <form onSubmit={this.onSubmit}>
        <h4>Want to try your luck? Enter at least 0.01 ether.</h4>
        <label>Amount of Ether to Enter: </label>
        <div className="ui action input">
  <input type="text" onChange={(e)=>this.setState({value: e.target.value })} value={this.state.value} />

          <button className="ui green button">Enter Ether Amount</button>
          </div>
        </form>        
        </div>
        <div className="ui segment">
          <h4>Ready to pick a winner?</h4>
          <button className="ui blue button" onClick={this.onClick}>Pick a winner</button>
        <h1>{this.state.message}</h1>
      </div>
      </div>
    );
  }
}

export default App;
