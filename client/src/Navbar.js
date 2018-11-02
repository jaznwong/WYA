import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const NavItem = ({item}) =>{
    // TODO: Return Nav Item
    const {name, href} = item
    return(
          <li className="nav-item">
            <a className="nav-link" href={href}>{name}</a>
          </li>
        )
}

const PortfolioNav = ({isLoggedIn})=>{
    let loggedInNav = 
        <ul className="navbar-nav nav">
            <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Logout</a>
            </li>
        </ul>
    
    return isLoggedIn ? loggedInNav :
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
    render(){
        // TODO: Check if user is authenticated using state
        let isLoggedIn = false;

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
                <PortfolioNav isLoggedIn={isLoggedIn} />
                <div>
                </div>
            </div>
          </nav>
        );
    }
}

export default Navbar