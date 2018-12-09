import {
  createRoom as create,
  getUsersInRoom,
  getRoomStatus,
  getRoomById,
  joinRoom,
  initiateVote as startVoting,
  getSuggestionForRoom as getSuggestions
} from "../../services/server/room";
import {
  UPDATE_USERS_IN_ROOM,
  SET_ROOM_STATUS,
  SET_ROOM_INFORMATION,
  SET_ROOM_SUGGESTION
} from "../actionTypes";

export function createRoom(name, desc) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      create(name, desc)
        .then(room => {
          resolve(room);
        })
        .catch(err => {
          console.log(err)
          reject(err);
        });
    });
  };
}

function setRoomStatus(status) {
  return {
    type: SET_ROOM_STATUS,
    status
  };
}

function setRoomInfo(room){
  return {
    type: SET_ROOM_INFORMATION,
    name: room.roomname,
    description: room.description,
    creatorID: room.creatorID
  };
}

export function initiateRoom(id) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      console.log("called initiate room")
      joinRoom(id).then(()=>{
        let promises = [];
        promises.push(getRoomById(id));
        promises.push(dispatch(updateUserList(id)));
        promises.push(getRoomStatus(id))
  
        Promise.all(promises).then((values)=>{
          dispatch(setRoomInfo(values[0]));
          dispatch(setRoomStatus(values[2]));
          if(values[2] == "VOTING"){
            dispatch(getSuggestionForRoom(id)).finally(()=>{
              resolve()
            })
          }else{
            resolve()
          }
        })
        .catch(error=>{
          console.log(`error initating room \n ${error} `)
          reject()
        })
      }).catch(err=>{
        reject()
      })
    });
  };
}

export function updateUserList(roomID){
  return dispatch =>{
    return new Promise((resolve, reject)=>{
      getUsersInRoom(roomID)
        .then((users)=>{
          dispatch({
            type: UPDATE_USERS_IN_ROOM,
            users
          })
          resolve(users)
        })
        .catch(error=>{
          reject(error)
        })
    })
  }
}

export function initiateVote(id) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      startVoting(id).then(room => {
        dispatch(initiateRoom(id))
          .then(()=>{
            resolve()
          });
      }).catch(error=>{
        console.log('error initiating vote')
        reject(error)
      });
    });
  };
}

export function getSuggestionForRoom(id){
  return dispatch =>{
    return new Promise((resolve, reject)=>{
      getSuggestions(id)
        .then((suggestion)=>{
          console.log(suggestion)
          dispatch({
            type: SET_ROOM_SUGGESTION,
            suggestion
          })
          resolve(suggestion)
        }).catch((error)=>{
          reject(error)
        })
    })
  }
}