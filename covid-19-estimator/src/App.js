import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Display from './interface';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};

  }

  render() {
    return (
      <div className="App">
        <Display />
      </div>
    );
  }
}

export default App;
