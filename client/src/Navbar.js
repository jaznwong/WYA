import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './store/actions/auth'

const NavItem = ({item}) =>{
    // TODO: Return Nav Item
    const {name, href} = item
    return(
          <li className="nav-item">
            <a className="nav-link" href={href}>{name}</a>
          </li>
        )
}

const PortfolioNav = ({isAuthenticated, handleLogout})=>{
    let loggedInNav = 
        <ul className="navbar-nav nav">
            <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>Logout
                </a>
            </li>
        </ul>
    
    return isAuthenticated ? loggedInNav :
        <ul className="navbar-nav nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                     <Link to="/signup" className="nav-link">Signup</Link>
                </li>
        </ul>

}

class Navbar extends Component{
    handleLogout(event){
        event.preventDefault()
        this.props.logout()
        this.props.history.push('/')
    }

    render(){
        // TODO: Check if user is authenticated using state
        let {isAuthenticated} = this.props

        let navItems = [
            {name: "Active", href: "#"},
            {name: "Saved", href: "#"},
            {name: "Recent", href: "#"}
        ]

        let navList = navItems.map((item, index)=>(
            <NavItem item={item} key={"navitem-"+index}/>
        ))

        return (
          <nav id="nav" ref="table" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-header">
                    <Link id="nav-title" className="navbar-brand" to="/">WYA 👀</Link>
                </div>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        {navList}
                    </ul>
                </div>
                <PortfolioNav isAuthenticated={isAuthenticated} handleLogout={this.handleLogout.bind(this)} />
                <div>
                </div>
            </div>
          </nav>
        );
    }
}

function mapStateToProps(reduxState){
    return{
        isAuthenticated: reduxState.user.isAuthenticated
    }
}

function mapDispatchToProps(dispatch){
    return{
        logout: function(){
            dispatch(logout())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))