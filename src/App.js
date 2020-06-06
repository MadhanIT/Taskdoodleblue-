import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import {Provider} from 'react-redux';
import store from './store';
import './App.css'
import Landing from './components/layouts/Landing';

class App extends Component {
  
  render() { 
    
    return (

      <Provider store={store}>
        <Router exact  path="/">
          <div className="App">
            <Route exact path="/" component={Landing}/>
            <Route exact path="/home" component={Landing}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
