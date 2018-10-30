import React, {Component} from 'react'
import {authUser} from '../store/actions'
import {connect} from 'react-redux'

class AuthForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            warningMessage: ""
        }
    }
    
    handleSubmit(event){
        let {signup} = this.props
        event.preventDefault()
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        authUser(signup, username, password)
            .then(()=>{
                this.setState({warningMessage: "Error"})
                this.props.history.push('/')
            })
            .catch(()=>{
                this.setState({warningMessage: "Error"})
            })
    }
    
    render(){
        let {header, buttonText} = this.props
        return(
            <div>
                 <h2>{header}</h2>
                    {this.state.warningMessage.length > 0 ? 
                        (<div class="alert alert-primary" role="alert">
                            A simple primary alert—check it out!
                        </div>)
                        :
                        (<div></div>)
                    }
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-secondary">{buttonText}</button>
                  </form>
            </div>
        )
    }
}

export default AuthForm