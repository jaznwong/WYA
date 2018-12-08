import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Default from './default'

const Dashboard = ({ match }) => (
    <Switch>
        <Route path={`${match.url}`} component={Default} />
        <Redirect to="/error" />
    </Switch>
);

export default Dashboard;