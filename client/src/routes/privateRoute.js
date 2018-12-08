import React from 'react';
import {withRouter, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

function mapStateToProps(reduxState){
    return {isAuthenticated: reduxState.user.isAuthenticated}
}

export default withRouter(
    connect(mapStateToProps, null)(PrivateRoute)
);
