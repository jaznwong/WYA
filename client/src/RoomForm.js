import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createRoom} from './store/actions/room'

class Room extends Component {
  constructor(props, context) {
  super(props, context);

  this.state = {
    name: "",
    description: ""
  };
}

handleChange(e){
  this.setState({
      [e.target.name]: e.target.value
  })
}

handleClick = (e) =>{
  e.preventDefault();
  let name = this.state.name;
  let description = this.state.description;
  this.props.createRoom(name, description)
  .catch(err=>{
    console.log(description)
  })
  console.log(name)

}

  render(){
    return(
      <div style = {{textAlign: "center"}}>
      <div className="Jumbotron Jumbotron-fluid" style={{backgroundColor:"#9eadd1"}}>
      <div className="container">
      <form>
        <div className="form-group">
          <h2 style={{color:"white"}}> Room Name: </h2>
          <div style={{float:"center", width:"50%",marginLeft:"25%"}}>
          <input className="form-control" name="name" type="text" value={this.state.value} onChange={this.handleChange.bind(this)} placeholder="Your room name"></input>
          </div>
        </div>
        <div className="form-group">
        <h2 style={{color:"white"}}> Description: </h2>
        <div style={{float:"center", width:"50%",marginLeft:"25%"}}>
          <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows="3" value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
          <br></br>
            <button onClick={this.handleClick.bind(this)}>Save</button>
            <br></br>
          </div>
        </div>
      </form>
      </div>
      </div>
      </div>
    )
  }
}

export default connect(null, {createRoom})(Room)
