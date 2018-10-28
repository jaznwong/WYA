import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard'
import Navbar from './Navbar'

class App extends Component {
    render(){
        return(
            <div>
                <Navbar />,
                <div className="container">
                    <Dashboard />
                </div>
            </div>
        )
    }
}

export default App;
