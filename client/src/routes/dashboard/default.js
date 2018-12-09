import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchForm from '../../components/dashboard/SearchForm'
import SearchedRoomsList from '../../components/dashboard/SearchedRoomsList'

const Headline = function({firstName, eventToday}){
    return(
        <div className="jumbotron">
            <h1 className="display-4">Hello {firstName}</h1>
            <p className="lead">You have a meetup with {eventToday.name} at {eventToday.time}</p>
            <a className="btn btn-secondary btn-lg" href="#" role="button">Get Updates</a>
        </div>
    )
}

class Default extends Component{
    render(){
        return (
            <div>
                {this.props.firstname && 
                    <Headline firstName={this.props.firstname} eventToday={{name: "Cross Country", time: "4:00 PM"}} />
                }
                <SearchForm />
                <SearchedRoomsList />
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        firstname: reduxState.user.userData.firstname
    }
}

export default connect(mapStateToProps, null)(Default)