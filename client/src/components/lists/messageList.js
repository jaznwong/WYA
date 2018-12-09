import React, { Component } from "react";
import { ListGroup, ListGroupItem, Input } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";

const Message = ({ username, message }) => {
  return (
    <ListGroupItem className="mb-2">{`${username}: ${message}`}</ListGroupItem>
  );
};

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // entry: {username: message}
      message: "",
      messageHistroy: [
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />,
        <Message username="user1" message="Hello World" />
      ]
    };
  }

  handleKeyPress = event => {
    if (event.key == "Enter") {
      console.log("enter pressed");
      this.addMessage(this.state.message);
      this.setState({ ...this.state, message: "" });
    }
    // console.log(event.key)
  };

  handleChange = event => {
    // console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addMessage = message => {
    this.setState({
      messageHistroy: this.state.messageHistroy.push(
        <Message username={this.props.firstname} message={message} />
      )
    });
  };

  render() {
    return (
      <div>
        <PerfectScrollbar>
          <div className="position-static" style={{ height: "620px" }}>
            <ListGroup className>{this.state.messageHistroy}</ListGroup>
          </div>
        </PerfectScrollbar>
        <Input
          name="message"
          onChange={this.handleChange}
          className="my-3"
          placeholder="Type in a message and press Enter"
          value={this.state.message}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default connect(
  reduxState => ({ firstname: reduxState.user.userData.firstname }),
  null
)(MessageList);
