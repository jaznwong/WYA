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
        <div className="Jumbotron Jumbotron-fluid" style={{height:"150px", backgroundColor:"#ADD8E6"}}>
        <h1 className="display-4">Create a Room</h1>
        </div>

      <div className="Jumbotron Jumbotron-fluid" style={{height:"500px", backgroundColor:"#ADD8E6"}}>
      <div className="container">
      <form>
        <div className="form-group">
          <h3 style={{color:"black"}}> Room Name: </h3>
          <div style={{float:"center", width:"50%",marginLeft:"25%"}}>
          <input className="form-control" name="name" type="text" value={this.state.value} onChange={this.handleChange.bind(this)} placeholder="Your room name"></input>
          </div>
        </div>
        <div className="form-group">
        <h3 style={{color:"black"}}> Description: </h3>
        <div style={{float:"center", width:"50%",marginLeft:"25%"}}>
          <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows="3" value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
          <br></br>
            <button type="button" class="btn btn-primary btn-lg" style={{background:"black"}} onClick={this.handleClick.bind(this)}>Create Room</button>
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
