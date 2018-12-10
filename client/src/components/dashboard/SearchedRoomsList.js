import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const RenderRoom = function({ id, roomname, description, createdAt }) {
  let createdDate = new Date(createdAt);
  return (
    <Link
      to={`/room/view/${id}`}
      className="list-group-item list-group-item-action flex-column align-items-start text-center shadow mb-2"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{roomname}</h5>
        <small>{`Created on ${createdDate.toDateString()}`}</small>
      </div>
      <p className="mb-1">{description}</p>
      <small>Room is current Open</small>
    </Link>
  );
};

class SearchedRoomsList extends Component {
  handleClick(event) {
    // TODO: Route to room's page
  }

  render() {
    let today = Date.now();
    let rooms = this.props.rooms.map((room, index) => (
      <RenderRoom {...room} today={today} key={"room-" + index} />
    ));
    return <div className="list-group mb-2">{rooms}</div>;
  }
}

function mapStateToProp(reduxState) {
  return {
    rooms: reduxState.dashboard.displayRooms
  };
}

export default connect(
  mapStateToProp,
  null
)(SearchedRoomsList);
