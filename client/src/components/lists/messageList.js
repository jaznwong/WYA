import React, { Component } from "react";
import { ListGroup, ListGroupItem, Input } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";

const Message = ({ username, message }) => {
  console.log("creating message comp");
  console.log(`${username} : ${message}`);
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
        // <Message username="user1" message="Hello World" />,
        // <Message username="user1" message="Hello World" />,
        // <Message username="user1" message="Hello World" />,
        // <Message username="user1" message="Hello World" />
      ]
    };
  }

  handleKeyPress = event => {
    if (event.key == "Enter") {
      console.log("enter pressed");
      this.sendMessage(this.state.message);
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

  componentDidMount() {
    this.props.socket.on("message", ({ name, message }) => {
      this.addMessage(name, message);
    });
  }

  addMessage = (name, message) => {
    // console.log(`received message ${message} from ${name}`)
    // console.log()
      // console.log(newMssage)
      this.setState({
        messageHistroy: [
          ...this.state.messageHistroy,
          <Message username={name} message={message} />
        ]
      });
  };

  sendMessage = message => {
    this.props.socket.emit("message", {
      name: this.props.name,
      message: message
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
  reduxState => ({ name: reduxState.user.userData.firstname }),
  null
)(MessageList);
