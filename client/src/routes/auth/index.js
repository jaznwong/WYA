import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthForm from '../../components/forms/AuthForm'

const Dashboard = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/signup`} render={props=>(
            <AuthForm {...props}
                signup={true}
                buttonText={"Signup"}
                header={"Join in with all the Fun!"}
                />
        )} />
        <Route path={`${match.url}/login`} render={props=>(
            <AuthForm {...props}
                signup={false}
                buttonText={"Signin"}
                header={"See what's going on!"}
                />
        )} />
        <Redirect to="/error" />
    </Switch>
);

export default Dashboard;