import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSuggestInterests} from './store/actions/user'

class Profile extends Component{
    /** Dcoumentation
    *       - Access suggested interests through this.props.suggestedInterests
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
        handleSuggestInterests: function(query){
            dispatch(handleSuggestInterests(query))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)