import React, {Component} from 'react'
import {authUser} from '../store/actions/auth'
import {connect} from 'react-redux'

class AuthForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            warningMessage: "",
            loader: false
        }
    }
    
    handleSubmit(event){
        event.preventDefault()
        this.setState({loader: true})
        let {signup} = this.props
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        this.props.authUser(signup, username, password)
            .then(()=>{
                this.setState({
                    warningMessage: "",
                    loader: false
                })
                this.props.history.push('/')
            })
            .catch((err)=>{
                this.setState({
                    warningMessage: "Invalid Username/Password",
                    loader: false
                })
            })
    }
    
    render(){
        let {header, buttonText} = this.props
        return(
            <div>
                 <h2>{header}</h2>
                    {this.state.warningMessage.length > 0 ? 
                        (<div className="alert alert-danger" role="alert">
                            {this.state.warningMessage}
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
                    {!this.state.loader ? 
                        <button type="submit" className="btn btn-secondary">{buttonText}</button>
                        : <div className="loader"></div>
                    }
                  </form>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch){
//     return {
//         authUser: function(signup, username, password){
//             dispatch(authUser(signup, username, password))
//         }
//     }
// }

export default connect(null, {authUser})(AuthForm)