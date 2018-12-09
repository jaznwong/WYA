import {
  createRoom as create,
  getUsersInRoom,
  getRoomStatus,
  getRoomById
} from "../../services/server/room";
import {
  CREATE_ROOM,
  UPDATE_USERS_IN_ROOM,
  SET_ROOM_STATUS,
  SET_ROOM_INFORMATION
} from "../actionTypes";

export function createRoom(name, desc) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      create(name, desc)
        .then(room => {
          console.log("Room created");
          resolve(room);
        })
        .catch(err => {
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

export function initiateRoom() {
  return dispatch => {
    return async function(id) {
      try {
        let room = await getRoomById(id);
        dispatch({
          type: SET_ROOM_INFORMATION,
          name: room.roomname,
          description: room.description,
          creatorID: room.creatorID
        });
        let users = await getUsersInRoom(id);
        dispatch({
          type: UPDATE_USERS_IN_ROOM,
          users
        });
        let status = await getRoomStatus(id);
        dispatch(setRoomStatus(status));
        console.log("called initiate room");
        return;
      } catch (error) {
        console.log(error);
        console.log("error initating room");
      }
    };
  };
}
