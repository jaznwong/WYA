import React, {Component} from 'react'
import SearchForm from './components/dashboard/SearchForm'
import SearchedRoomsList from './components/dashboard/SearchedRoomsList'

const Headline = function({firstName, eventToday}){
    return(
        <div className="jumbotron">
            <h1 class="display-4">Hello {firstName}</h1>
            <p class="lead">You have a meetup with {eventToday.name} at {eventToday.time}</p>
            <a class="btn btn-secondary btn-lg" href="#" role="button">Get Updates</a>
        </div>
    )
}

class Dashboard extends Component{

    render(){
        return (
            <div>
                <Headline firstName={"John"} eventToday={{name: "Cross Country", time: "4:00 PM"}} />
                <SearchForm />
                <SearchedRoomsList />
            </div>
        )
    }
}

export default Dashboard