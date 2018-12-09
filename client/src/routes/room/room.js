import React, { Component } from "react";
import { Row, Col, CardColumns } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";

import UserCard from "../../components/cards/userCard";
import { joinRoom } from "../../services/server/room";
import EventInfo from "../../components/cards/EventInfo";
import { initiateRoom } from "../../store/actions/room";
import MessageList from '../../components/lists/messageList'

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
      // name: "Lorem Ipsum",
      // description:
      //   "Contrary to popular belief, Lorem Ipsum is not simply random text."
    };
  }

  componentDidMount() {
    this.props.initiateRoom()(this.props.match.params.roomID).then(() => {
    })
  }

  render() {
    return (
      <div>
        <div className="shadow-lg text-center bg-light py-3 my-3">
          <h1 className="display-4">{this.props.name}</h1>
          <p className="">{this.props.description}</p>
        </div>
        <Row>
          <Col>
            <UserList userlist={this.props.users} />
          </Col>
          <Col className="col position-static">
            {/* name, image_url, cateogry, price, location */}
            {this.props.state == "OPEN" ? (
            <MessageList />) : 
            (<EventInfo
              name={"Tasty Hand-Pulled Noodles"}
              image_url={
                "https://s3-media3.fl.yelpcdn.com/bphoto/on5kwb77QO9cS78kxllnOA/o.jpg"
              }
              cateogry="American"
              price={4}
              location="1 Doyers St New York, NY 10013"
              description={this.props.description}
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
    ...reduxState.room
  };
}

export default connect(
  mapStateToProps,
  { initiateRoom }
)(RoomPage);
