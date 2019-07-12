import React, { Component } from 'react';
import SimpleExpansionPanel from './accordion';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Oris' React Table</h1>
        </header>
       <SimpleExpansionPanel/>
      </div>
    );
  }
}

export default App;
