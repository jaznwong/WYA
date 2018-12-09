import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../privateRoute'

import CreateRoom from './create';
import RoomPage from './room'

const Room = ({ match }) => (
    <Switch>
        <PrivateRoute path={`${match.url}/create`} component={CreateRoom} />
        {/* TODO: Refractor to variable room id */}
        <PrivateRoute path={`${match.url}/view/:roomID`} component={RoomPage} />
        <Redirect to="/error" />
    </Switch>
);

export default Room;