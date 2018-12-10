import React, { Component } from "react";
import { connect } from "react-redux";
import SearchForm from "../../components/dashboard/SearchForm";
import { Link } from "react-router-dom";
import SearchedRoomsList from "../../components/dashboard/SearchedRoomsList";

const Headline = function({ firstName, eventToday }) {
  // {
  //     backgroundImage: "URL(https://picsum.photos/200/300/?blur)",
  //     backgroundSize: 'cover',
  //     overflow: 'hidden',
  // }
  return (
    <div className="jumbotron text-center shadow-lg">
      <h1 className="display-4">Hello {firstName}</h1>
      <p className="lead">
        You have a meetup with {eventToday.name} at {eventToday.time}
      </p>
      <a className="btn btn-secondary btn-lg" href="#" role="button">
        Get Updates
      </a>
    </div>
  );
};

const WelcomeHeadline = function(props) {
  return (
    <div className="jumbotron text-center shadow">
      <h1 className="display-4">Hey!</h1>
      <p className="lead">Let us help you plan you next get-together</p>
      <Link
        className="btn btn-secondary btn-lg"
        to="/auth/signup"
        role="button"
      >
        Sign up!
      </Link>
    </div>
  );
};

class Default extends Component {
  render() {
    return (
      <div className>
        {this.props.firstname ? (
          <Headline
            firstName={this.props.firstname}
            eventToday={{ name: "Cross Country", time: "4:00 PM" }}
          />
        ) : (
          <WelcomeHeadline />
        )}
        <SearchForm />
        <SearchedRoomsList />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    firstname: reduxState.user.userData.firstname
  };
}

export default connect(
  mapStateToProps,
  null
)(Default);
