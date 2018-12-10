import React, { Component } from "react";
import { Row, Col, CardColumns, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";

import UserCard from "../../components/cards/userCard";
import { joinRoom } from "../../services/server/room";
import LoadingPage from "../../components/utils/loadingScreen";
import EventInfo from "../../components/cards/EventInfo";
import {
  initiateRoom,
  initiateVote,
  updateUserList,
  voteForSuggestion
} from "../../store/actions/room";
import MessageList from "../../components/lists/messageList";

const UserList = function({ userlist }) {
  let users = userlist.map((user, index) => {
    // console.log(user.username)
    return <UserCard key={`user${index}`} name={user.name} />;
  });

  return (
    <PerfectScrollbar
      option={{ suppressScrollX: true, wheelPropagation: false }}
    >
      <div className="position-static" style={{ height: "150px" }}>
        <CardColumns>{users}</CardColumns>
      </div>
    </PerfectScrollbar>
  );
};

class RoomPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
      // name: "Lorem Ipsum",
      // description:
      //   "Contrary to popular belief, Lorem Ipsum is not simply random text."
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props
      .initiateRoom(this.props.match.params.roomID)
      .then(() => {
        console.log("resolved");
        this.props.socket.emit("joinRoom", this.props.match.params.roomID);
        this.props.socket.on("startVoting", () => {
          this.props.initiateRoom(this.props.match.params.roomID);
        });
        this.props.socket.on("userJoined", () => {
          this.props.updateUserList(this.props.match.params.roomID);
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  componentWillUnmount() {
    this.props.socket.emit("leaveRoom");
  }

  initiateVote = () => {
    this.setState({ loading: true });
    this.props
      .initiateVote(this.props.match.params.roomID)
      .then(() => {
        console.log("Done");
        this.props.socket.emit("startVoting");
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  voteSuggestion = (hasAccepted) =>{
    this.props.voteForSuggestion(this.props.match.params.roomID, hasAccepted)
  }

  render() {
    if (this.state.loading) return <LoadingPage />;
    return (
      <div>
        <div className="border-bottom text-center border-secondary pb-2 my-2">
          <h1 className="display-4">{this.props.name}</h1>
          <p className="">{this.props.description}</p>
          {this.props.creatorID == this.props.self.id &&
            this.props.state != "VOTING" && (
              <Button onClick={this.initiateVote}> Initiate Vote </Button>
            )}
        </div>
        <Row>
          <Col>
            <UserList userlist={this.props.users} />
          </Col>
          <Col className="col position-static">
            {/* name, image_url, cateogry, price, location */}
            {this.props.state != "VOTING" || this.props.userVoted ? (
              <MessageList socket={this.props.socket} />
            ) : (
              <EventInfo
                vote={this.voteSuggestion}
                name={this.props.suggestion.name}
                image_url={this.props.suggestion.image_url}
                cateogry={this.props.suggestion.categories[0].title}
                price={this.props.suggestion.price}
                location={`${
                  this.props.suggestion.location.display_address[0]
                }, ${this.props.suggestion.location.display_address[1]}`}
                rating={this.props.suggestion.rating}
                url={this.props.suggestion.url}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    self: reduxState.user.userData,
    socket: reduxState.global.socket,
    ...reduxState.room
  };
}

export default connect(
  mapStateToProps,
  { initiateRoom, initiateVote, updateUserList, voteForSuggestion }
)(RoomPage);
