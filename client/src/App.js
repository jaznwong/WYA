import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard'
import AuthForm from './components/AuthForm'
import Navbar from './Navbar'
import {withRouter, Route, Switch} from 'react-router-dom'

class App extends Component {
    render(){
        return(
            <div>
                <Navbar />,
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/signup' render={props=>(
                            <AuthForm {...props} 
                                signup={true} 
                                buttonText={"Signup"}
                                header={"Join in with all the Fun!"}
                                />
                        )} />
                        <Route path='/login' render={props=>(
                            <AuthForm {...props} 
                                signup={false} 
                                buttonText={"Signin"}
                                header={"See what's going on!"}
                                />
                        )} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(App);
