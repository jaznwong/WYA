import React, {Component} from 'react'
import {connect} from 'react-redux'

const RenderRoom = function({id, name, createdAt, today}){
    let createdDate = new Date(createdAt)
    return(
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{name}</h5>
                <small>{`Created on ${createdDate.toDateString()}`}</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small>Donec id elit non mi porta.</small>
        </a>
    )

}

class SearchedRoomsList extends Component{
    handleClick(event){
        // TODO: Route to room's page
    }

    render(){
        let today = Date.now()
        let rooms = this.props.rooms.map((room, index)=> <RenderRoom {...room} today={today} key={"room-" + index} />)
        return(
            <div className="list-group">
                {rooms}
            </div>
        )
    }
}

function mapStateToProp(reduxState){
    return {
        rooms: reduxState.searchedRooms
    }
}

export default connect(mapStateToProp, null)(SearchedRoomsList)