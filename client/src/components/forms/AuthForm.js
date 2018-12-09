import React, { Component } from "react";
import ReactLoading from 'react-loading';
import { signupUser, loginUser } from "../../store/actions/auth";
import { connect } from "react-redux";
import LoadingPage from "../utils/loadingScreen";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warningMessage: "",
      loader: false,
      firstname: "",
      lastname: "",
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSignup = async () => {
    try {
      let { firstname, lastname, username, password } = this.state;
      return await this.props.signupUser(
        firstname,
        lastname,
        username,
        password
      );
    } catch (error) {
      throw error;
    }
  };

  handleLogin = async () => {
    try {
      let { username, password } = this.state;
      return await this.props.loginUser(username, password);
    } catch (error) {
      throw error;
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loader: true });

    let auth = this.props.signup ? this.handleSignup : this.handleLogin;

    auth()
      .then(() => {
        this.setState({
          warningMessage: "",
          loader: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          warningMessage: "Invalid Username/Password",
          loader: false
        });
      });
  }

  render() {
    let { header, buttonText } = this.props;
    return (
      <div>
        <h2>{header}</h2>
        {this.state.warningMessage.length > 0 ? (
          <div className="alert alert-danger" role="alert">
            {this.state.warningMessage}
          </div>
        ) : (
          <div />
        )}
        <form onSubmit={this.handleSubmit.bind(this)}>
          {buttonText == "Signup" && (
            <div>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  onChange={this.handleChange}
                  name="firstname"
                  value={this.state.firstname}
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  onChange={this.handleChange}
                  name="lastname"
                  value={this.state.lastname}
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Username"
                  required
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={this.handleChange}
              name="username"
              value={this.state.username}
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          {!this.state.loader ? (
            <button type="submit" className="btn btn-secondary">
              {buttonText}
            </button>
          ) : (
            <LoadingPage />
          )}
        </form>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch){
//     return {
//         authUser: function(signup, username, password){
//             dispatch(authUser(signup, username, password))
//         }
//     }
// }

export default connect(
  null,
  { signupUser, loginUser }
)(AuthForm);
