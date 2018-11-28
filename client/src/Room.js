import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSuggestInterests, postInterests, postAvailablity} from './store/actions/user'

const UserCard = function({name}){
    return (
        <div className="card text-center">
            <img className="card-img-top img-thumbnail" src="http://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-War-Machine-icon.png" alt="User Avatar"/>
            <div className="card-body">
                <h5 className="card-title text-center">{name}</h5>
            </div>
        </div>
    )
}

class RoomPage extends Component {
  constructor(props) {
  super(props);

  this.state = {
    name: "",
    description: ""
  };

//   render(){
//     return(
//       <div>
//         <div className="jumbotron">
//           <h1 className="display-4">Room Name</h1>
//        </div>
//
//        <div class="container">
//     <div class="row">
//       <div class="col">
//       <div class="container">
//    <div class="row">
//      <div class="col">
//        1 of 2
//      </div>
//      <div class="col">
//        2 of 2
//      </div>
//    </div>
//  </div>
//       </div>
//       <div class="col">
//         2 of 2
//       </div>
//     </div>
//   </div>
// </div>
//   )}


  }
   render(){

       let userlist = [
         {username: "user1"},
         {username: "User2"}
       ]

       userlist = userlist.map((user)=>{
          // console.log(user.username)
           return(
               <UserCard name={user.username}/>
           )
       })



       // console.log(userlist)

       return (
    <div>
                 <div className="jumbotron" style={{height:"25%"}}>
                   <h1 className="display-4">Room Name</h1>
                </div>
         <div className="container">
  <div className="row">
    <div className="col">
    <div className="card-deck">
       {userlist}
    </div>
    </div>
    <div className="col">
      <div className="row" style={{height:"150%"}}>
        <div className="col">
          <h1>I am here</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <div className="row">
          <div className="col">
            <button type="button" class="btn btn-success">Yes</button>
          </div>
          <div className="col">
            <button type="button" class="btn btn-danger">No</button>
          </div>
          </div>
          </div>
      </div>

    </div>
  </div>
  </div>
  </div>

       )
     }
}

export default RoomPage
