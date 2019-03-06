## Lottery Dapp - React Front End

`npm start` to run app. 

## Warning!
This app presumes you have MetaMask installed and active on the Rinkeby Test Network

## Summary
1 component, initializes 5 state properties. 

As soon as component renders, it triggers the ComponentDidMount() method, then takes that data off the smart contract to display it in the component. 

onSubmit() and onClick() - retreived list of active accounts, sets waiting message, then calls a contract. 

render() - read different state properties and displayed them on the screen

Used .fromWei - converted wei to ether






