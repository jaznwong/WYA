import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {postInterests} from './store/actions/user'

class Test extends Component{
    constructor(props){
        super(props)
        this.state = {
            interests: ["Interest1, Interest2, Interest3"]
        }
    }

    handleClick(event){
        event.preventDefault()
        this.props.postInterests(this.state.interests)
            .then(res=>{
                // console.log(res)
            })
    }

    render(){
        return <button onClick={this.handleClick.bind(this)}></button>
    }
}

function mapStateToProps(reduxState){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return {
        postInterests: function(interests){
            return postInterests(interests)
        }
    }
}

export default withRouter(connect(mapStateToProps, {postInterests})(Test))