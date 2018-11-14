import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard'
import AuthForm from './components/AuthForm'
import Navbar from './Navbar'
import Profile from './Profile'
import Test from './Test'
import Room from './RoomForm'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class App extends Component {
    render(){
        let {isAuthenticated} = this.props
        return(
            <div>
                <Navbar />,
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route exact path='/room' component={Room} />
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
                        <Route path='/login' render={props=>(
                            <AuthForm {...props}
                                signup={false}
                                buttonText={"Signin"}
                                header={"See what's going on!"}
                                />
                        )} />
                        <Route path='/profile' render={props=>(
                            isAuthenticated ?
                                <Profile /> : <Redirect to="/login"/>
                        )} />
                        <Route path='/test' render={props=>(
                            <Test {...props} />
                        )} />
                    </Switch>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        isAuthenticated: reduxState.user.isAuthenticated
    }
}

export default withRouter(
    connect(mapStateToProps, null)(App)
);
