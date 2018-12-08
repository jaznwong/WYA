import React, { Component } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

import Auth from "./auth";
import Dashboard from "./dashboard";
import Room from "./room";
import Profile from "./profile";

class Main extends Component {
  render() {
    // console.log(`${this.props.path}`)
    return (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/room" component={Room} />
        <Route path="/profile" component={Profile} />
        {/* <Route exact path='/dashboard' component={Dashboard} /> */}
        <Route path="/" component={Dashboard} />
        <Redirect to="/error" />
      </Switch>
    );
  }
}

export default withRouter(Main);
