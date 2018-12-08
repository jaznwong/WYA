import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import EditProfile from './edit'

const Profile = ({ match }) => (
    <Switch>
        <Route path={`${match.url}/edit`} component={EditProfile} />
        {/* TODO: Create a view tab */}
        <Redirect to="/error" />
    </Switch>
);

export default Profile;