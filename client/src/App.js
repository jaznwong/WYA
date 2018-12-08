import React, { Component } from "react";
import Navbar from "./components/nav/Navbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { initiateUser } from "./store/actions/auth";
import Main from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    this.setState({
      loading: true
    });

    this.props.initiateUser().finally(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    return (
      <div>
        {!this.state.loading && (
          <div>
            <Navbar />
            <div id="main" className="container">
              <Main />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { initiateUser }
  )(App)
);
