import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSuggestInterests, postInterests, postAvailablity} from './store/actions/user'

class Profile extends Component{
    /** Dcoumentation
    *       - Access suggested interests through this.props.suggestedInterests
    *       - Post user interests to the database by running, this.props.postInterests(interests)
    *       - Post user availability to the database by running this.props.postAvailability(availabilities)
    *       - The postAvailability and PostInterests returns a promise. You should wait for those two promises
    *           to resolve before going to a new page
    *       - Update suggestedInterests by running this.props.handleSuggestInterests(userSearch)
    *           whenever the user types something in the interest search bar
    */
    
    render(){
        return(
            <div>
                <h1>Hello, Profile</h1>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        suggestedInterests: reduxState.user.profile.suggestedInterests
    }
}

function mapDispatchToProps(dispatch){
    return{
        postInterests,
        postAvailablity,
        handleSuggestInterests: function(query){
            return dispatch(handleSuggestInterests(query))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)